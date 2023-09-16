import React, { useState } from 'react';
import axios from 'axios';
import { MY_TOKEN } from './API_Key';

const App: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState<string[] | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result?.toString().split(",")[1] || null);  // base64, removing the "data..." prefix
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
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
        sampleCount: 2  // or whatever number you want
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

  return (
    <div className="App">
      <h1>VQA Demo</h1>
      <input type="file" onChange={handleImageChange} />
      <input
        type="text"
        placeholder="Ask a question about the image"
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      <div>
        <h2>Response:</h2>
        {response && response.map((item, index) => <p key={index}>{item}</p>)}
      </div>
    </div>
  );
}

export default App;
