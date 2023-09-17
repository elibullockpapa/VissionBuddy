import React from 'react';
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

type ResponseProps = {
    responses: string[];
    isLoading?: boolean;
};

const Response: React.FC<ResponseProps> = ({ responses, isLoading }) => {
    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Response:
            </Typography>
            {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                    <CircularProgress />
                </Box>
            ) : (
                responses.map((item: string, index: number) => (
                    <Typography key={index} paragraph>
                        {item}
                    </Typography>
                ))
            )}
        </Box>
    );
}

export default Response;