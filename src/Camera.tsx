import Webcam from "react-webcam";
import React, { useEffect, useState } from 'react';
import Card from "@mui/material/Card";
import { Box, CardContent } from "@mui/material";

type CameraProps = {
    onCapture: (imageSrc: string) => void;
    externallyPaused?: boolean;
    onResume?: () => void;
};

const Camera: React.FC<CameraProps> = ({ onCapture, externallyPaused, onResume }) => {
    const webcamRef = React.useRef<Webcam>(null);
    const [isPaused, setIsPaused] = useState(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [pressStartTime, setPressStartTime] = useState<number | null>(null);
    const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');

    useEffect(() => {
        if (externallyPaused && !isPaused) {
            handleCapture();
        }
    }, [externallyPaused]);

    const handleCapture = () => {
        if (!isPaused) {
            const imageSrc = webcamRef.current?.getScreenshot();
            if (imageSrc) {
                onCapture(imageSrc);
                setCapturedImage(imageSrc);
                setIsPaused(true);
                speak("camera paused");
            } else {
                console.error("Failed to capture image");
            }
        } else {
            setIsPaused(false);
            setCapturedImage(null);
            if (onResume) {
                onResume();
            }
            speak("camera active");
        }
    };

    const handleMouseDown = () => {
        setPressStartTime(Date.now()); // Set the start time on mouse down
    };

    const handleMouseUp = async () => {
        const pressDuration = Date.now() - (pressStartTime || 0);
        if (pressDuration < 500) {
            handleCapture();
        } else {
            await switchCamera();
        }
        setPressStartTime(null);
    };

    const switchCamera = async () => {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoInputDevices = devices.filter(device => device.kind === "videoinput");

        // If only one video input device is available, then there's no back camera.
        if (videoInputDevices.length <= 1) {
            speak("No back camera available");
            return;
        }

        setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
        const message = facingMode === 'user' ? "camera back" : "camera front";
        speak(message);
    };

    const speak = (message: string) => {
        const utterance = new SpeechSynthesisUtterance(message);
        speechSynthesis.speak(utterance);
    };

    return (
        <Card variant="outlined" sx={styles.card}>
            <CardContent sx={styles.content}>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    height="100%"
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onTouchStart={handleMouseDown} // For mobile touch
                    onTouchEnd={handleMouseUp}     // For mobile touch
                >
                    {isPaused && capturedImage ? (
                        <img src={capturedImage} alt="Captured" style={styles.webcam} />
                    ) : (
                        <Webcam screenshotFormat="image/jpeg" ref={webcamRef} style={styles.webcam} />
                    )}
                </Box>
            </CardContent>
        </Card>
    );
}

const styles = {
    card: {
        maxWidth: '900px',
        margin: '10px',
        cursor: 'pointer' // to indicate clickable area
    },
    content: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    webcam: {
        //width: '100%',
        borderRadius: '8px',
        border: '2px solid #333',
    }
};

export default Camera;
