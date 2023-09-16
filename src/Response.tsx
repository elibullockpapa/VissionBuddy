const Response: React.FC<{ responses: string[] }> = ({ responses }) => {
    return (
        <div>
            <h2>Response:</h2>
            {responses.map((item, index) => <p key={index}>{item}</p>)}
        </div>
    );
}

export default Response;
