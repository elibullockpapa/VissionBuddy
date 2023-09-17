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
        <Card sx={styles.cameraCard}>
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
    alignItems: 'stretch', // This will ensure children stretch to fill the height
    gap: '16px',
    flexDirection: 'row', // By default, set to horizontal direction (desktop layout)
    padding: '10px',
    height: 'calc(100vh - 120px)', // Set to full height minus the AppBar height
    '@media (max-width: 900px)': { // Apply media query for mobile devices
      flexDirection: 'column',
    }
  },
  cameraCard: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    padding: '10px',
    height: '100%', // This will make sure the cards take full height of their parent
    overflow: 'auto' // In case the content inside gets too much
  },
  card: {
    flex: 1, // Make both children equally share the available space
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    padding: '10px',
    height: '100%', // This will make sure the cards take full height of their parent
    overflow: 'auto' // In case the content inside gets too much
  },
};



export default App;

