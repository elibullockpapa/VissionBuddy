import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const AppBarComponent: React.FC = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">
                    Help Me See
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default AppBarComponent;
