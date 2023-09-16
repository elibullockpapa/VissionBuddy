import CircularProgress from "@mui/material/CircularProgress";

type ResponseProps = {
    responses: string[];
    isLoading?: boolean;
};

const Response: React.FC<ResponseProps> = ({ responses, isLoading }) => {

    const renderLoadingIndicator = () => (
        <div style={loadingIndicatorStyle}>
            <CircularProgress />
        </div>
    );

    const renderResponses = () => responses.map((item: string, index: number) => (
        <p key={index}>{item}</p>
    ));

    return (
        <div>
            <h2>Response:</h2>
            {isLoading ? renderLoadingIndicator() : renderResponses()}
        </div>
    );
}

const loadingIndicatorStyle = {
    display: 'flex',
    justifyContent: 'center',
    padding: '20px'
};

export default Response;
