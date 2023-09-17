import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const AppBarComponent: React.FC = () => {
    return (
        <AppBar position="static">
            <Toolbar style={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h6">
                    VisionBuddy.ai
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default AppBarComponent;
