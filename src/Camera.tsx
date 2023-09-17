import Webcam from "react-webcam";
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Card from "@mui/material/Card";
import { Box, CardContent } from "@mui/material";
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';


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
        <Card variant="outlined" sx={styles.card}>
            <CardContent sx={styles.content}>
                <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                    {isPaused && capturedImage ? (
                        <img src={capturedImage} alt="Captured" style={styles.webcam} />
                    ) : (
                        <Webcam screenshotFormat="image/jpeg" ref={webcamRef} style={styles.webcam} />
                    )}
                </Box>
            </CardContent>
            <Box display="flex" justifyContent="center" p={2}>
                <Button
                    onClick={handleCapture}
                    variant="contained"
                    startIcon={isPaused ? <PlayArrowIcon /> : <StopIcon />}
                    sx={isPaused ? styles.resumeButton : styles.pauseButton}
                >
                    {isPaused ? 'Resume' : 'Pause'}
                </Button>
            </Box>
        </Card>
    );
}

const styles = {
    card: {
        maxWidth: '900px',
        margin: '10px'
    },
    content: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    webcam: {
        width: '100%',
        borderRadius: '8px',
        border: '2px solid #333',
    },
    pauseButton: {
        backgroundColor: '#f44336',
        width: '100%',
        padding: '10px',
        color: 'white',
        '&:hover': {
            backgroundColor: '#d32f2f'
        }
    },
    resumeButton: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#4caf50',
        color: 'white',
        '&:hover': {
            backgroundColor: '#388e3c'
        }
    }
};

export default Camera;
