import Webcam from "react-webcam";
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';

type CameraProps = {
    onCapture: (imageSrc: string) => void;
    externallyPaused?: boolean;
    onResume?: () => void;
};


const Camera: React.FC<CameraProps> = ({ onCapture, externallyPaused, onResume }) => {
    const webcamRef = React.useRef<Webcam>(null);
    const [isPaused, setIsPaused] = useState(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);

    useEffect(() => {
        if (externallyPaused) {
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
            } else {
                console.error("Failed to capture image");
            }
        } else {
            setIsPaused(false);
            setCapturedImage(null);
            if (onResume) {
                onResume();
            }
        }
    };

    return (
        <div>
            {isPaused && capturedImage ? (
                <img src={capturedImage} alt="Captured" />
            ) : (
                <Webcam screenshotFormat="image/jpeg" ref={webcamRef} />
            )}
            <Button onClick={handleCapture} variant="contained">
                {isPaused ? 'Resume' : 'Pause'}
            </Button>
        </div>
    );
}

export default Camera;
