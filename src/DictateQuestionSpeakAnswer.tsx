import React, { useState } from 'react';
import axios from 'axios';
import { MY_TOKEN } from './API_Key';
import { Button } from '@mui/material';

type DictateProps = {
    imageSrc: string;
};

const DictateQuestionSpeakAnswer: React.FC<DictateProps> = ({ imageSrc }) => {
    const [isDictating, setIsDictating] = useState(false);

    const speak = (message: string) => {
        const utterance = new SpeechSynthesisUtterance(message);
        speechSynthesis.speak(utterance);
    };

    const startDictation = () => {
        if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
            const recognition = new ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)();
            recognition.lang = 'en-US';

            recognition.onstart = () => {
                setIsDictating(true);
            };

            recognition.onresult = (event: any) => {
                const results: SpeechRecognitionResultList = event.results;
                const last = results.length - 1;
                const text = results[last][0].transcript;
                handleQuestion(text); // Pass the text directly to handleQuestion
            };


            recognition.onend = () => {
                setIsDictating(false);
            };

            recognition.start();
        } else {
            console.error('Speech recognition is not supported in this browser.');
        }
    };

    const handlePressAndHold = () => {
        if (!isDictating) {
            startDictation();
        } else {
            setIsDictating(false); // stop dictation if already running
        }
    };

    const handleQuestion = async (currentPrompt: string) => {
        console.log(currentPrompt); // Use the passed-in prompt instead of state
        const data = {
            instances: [
                {
                    prompt: currentPrompt,
                    image: {
                        bytesBase64Encoded: imageSrc
                    }
                }
            ],
            parameters: {
                sampleCount: 1
            }
        };

        try {
            const result = await axios.post(
                'https://us-central1-aiplatform.googleapis.com/v1/projects/imagetodescription/locations/us-central1/publishers/google/models/imagetext:predict',
                data,
                {
                    headers: {
                        "Authorization": `Bearer ${MY_TOKEN}`,
                        "Content-Type": "application/json; charset=utf-8"
                    }
                }
            );
            speak(result.data.predictions.join(', '));
        } catch (error) {
            speak("There was an error getting the answer");
            console.error("There was an error with the request", error);
        }
    };

    return (
        <Button
            variant="outlined"
            sx={styles.button}
            onMouseDown={handlePressAndHold}
            onMouseUp={handlePressAndHold}
            onTouchStart={handlePressAndHold}
            onTouchEnd={handlePressAndHold}
        >
            Press and hold to ask
        </Button>
    );
};

const styles = {
    button: {
        width: '100%',
        padding: '10px',
        height: '100px'
    }
};


export default DictateQuestionSpeakAnswer;
