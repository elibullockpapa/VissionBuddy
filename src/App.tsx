import React, { useState } from 'react';
import AppBarComponent from './AppBar';
import Camera from './Camera';
import Card from '@mui/material/Card';
import { Box } from '@mui/material';
import DictateQuestionSpeakAnswer from './DictateQuestionSpeakAnswer';

const App: React.FC = () => {
  const [image, setImage] = useState<string>("");
  const [cameraPaused, setCameraPaused] = useState(false);

  const handleCameraResume = () => {
    setCameraPaused(false);
  };

  return (
    <div className="App">
      <AppBarComponent />
      <Box sx={styles.boxRoot}>
        <Card sx={styles.card}>
          <Camera
            onCapture={(imageSrc: string) => setImage(imageSrc.split(",")[1])}
            externallyPaused={cameraPaused}
            onResume={handleCameraResume}
          />
        </Card>
        <Card sx={styles.card}>
          <DictateQuestionSpeakAnswer imageSrc={image} />
        </Card>
      </Box>
    </div>
  );
}

const styles = {
  boxRoot: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexDirection: 'column',
    padding: '10px'
  },
  card: {
    width: '100%',
    display: 'flex',
    maxWidth: '800px',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    padding: '10px'
  },
};

export default App;

