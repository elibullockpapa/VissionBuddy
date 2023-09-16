import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';

const QuestionInput: React.FC<{ onTextChange: (question: string) => void }> = ({ onTextChange }) => {
    const [question, setQuestion] = useState<string>("");

    useEffect(() => {
        onTextChange(question);
    }, [question, onTextChange]);

    return (
        <div>
            <TextField
                label="Question"
                value={question}
                onChange={e => setQuestion(e.target.value)}
            />
        </div>
    );
}

export default QuestionInput;