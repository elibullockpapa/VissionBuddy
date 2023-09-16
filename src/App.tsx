import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MY_TOKEN } from './API_Key';
import AppBarComponent from './AppBar';
import Camera from './Camera';
import QuestionInput from './QuestionInput';
import Response from './Response';


const App: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState<string[] | null>(null);
  const [cameraPaused, setCameraPaused] = useState(false);

  const handleQuestion = async () => {
    setCameraPaused(true);
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
      console.error("There was an error with the request", error);
    }
  };

  const handleDescription = async () => {
    setCameraPaused(true);
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
      console.error("There was an error with the request", error);
    }
  };

  const handleCameraResume = () => {
    setCameraPaused(false);
  };

  return (
    <div className="App">
      <AppBarComponent />
      <Camera
        onCapture={(imageSrc: string) => setImage(imageSrc.split(",")[1])}
        externallyPaused={cameraPaused}
        onResume={handleCameraResume}
      />
      <QuestionInput onTextChange={(q: string) => setPrompt(q)} />
      <button onClick={handleDescription}>Describe Scene</button>
      <button onClick={handleQuestion}>Answer Question</button>
      {response && <Response responses={response} />}
    </div>
  );
}

export default App;
