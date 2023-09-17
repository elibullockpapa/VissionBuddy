import React, { useState } from 'react';
import axios from 'axios';
import { MY_TOKEN } from './API_Key';
import AppBarComponent from './AppBar';
import Camera from './Camera';
import QuestionInput from './QuestionInput';
import Response from './Response';
import Card from '@mui/material/Card';
import { Box, Button } from '@mui/material';

const App: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState<string[]>([""]);
  const [cameraPaused, setCameraPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleQuestion = async () => {
    setCameraPaused(true);
    setIsLoading(true);
    const data = {
      instances: [
        {
          prompt: prompt,
          image: {
            bytesBase64Encoded: image
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
            "Authorization": `Bearer ` + MY_TOKEN,  // NOTE: this token expires every hour or so
            "Content-Type": "application/json; charset=utf-8"
          }
        }
      );
      setResponse(result.data.predictions);
    } catch (error) {
      setResponse(["an error occurred"]);
      console.error("There was an error with the request", error);
    }
    finally {
      setIsLoading(false); // Reset loading state when request ends
    }

  };

  const handleDescription = async () => {
    setCameraPaused(true);
    setIsLoading(true);
    const data = {
      instances: [
        {
          image: {
            bytesBase64Encoded: image
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
            "Authorization": `Bearer ` + MY_TOKEN,  // NOTE: this token expires every hour or so
            "Content-Type": "application/json; charset=utf-8"
          }
        }
      );
      setResponse(result.data.predictions);
    } catch (error) {
      setResponse(["an error occurred"]);
      console.error("There was an error with the request", error);
    }
    finally {
      setIsLoading(false); // Reset loading state when request ends
    }

  };

  const handleCameraResume = () => {
    setCameraPaused(false);
  };

  return (
    <div className="App">
      <AppBarComponent />
      <Box sx={styles.boxRoot}>
        <Camera
          onCapture={(imageSrc: string) => setImage(imageSrc.split(",")[1])}
          externallyPaused={cameraPaused}
          onResume={handleCameraResume}
        />
        <Card sx={styles.controlCardRoot}>
          <Box sx={styles.questionSection}>
            <QuestionInput onTextChange={(q: string) => setPrompt(q)} />
            <Button onClick={handleQuestion}>Answer Question</Button>
          </Box>
          <Button
            onClick={handleDescription}
            sx={styles.descriptionButton}
            variant="contained"
          >
            Describe Scene
          </Button>
          <Box sx={styles.responseSection}>
            <Response responses={response} isLoading={isLoading} />
          </Box>
        </Card>
      </Box>
    </div>
  );
}

const styles = {
  boxRoot: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  controlCardRoot: {
    width: '95%',
    display: 'flex',
    maxWidth: '800px',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    padding: '10px'
  },
  questionSection: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  descriptionButton: {
    width: '100%',
    backgroundColor: 'blue',
    color: 'white',
    padding: '10px',
  },
  responseSection: {
    width: '100%',
    marginTop: '10px',
    border: '1px solid #e0e0e0',
    borderRadius: '5px',
  },
};

export default App;

