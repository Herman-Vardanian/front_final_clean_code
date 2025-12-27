import { useState } from 'react';
import { answerCard } from '../api/cardApi';

export default function CardAnswer({ card }: { card: any }) {
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleSubmit = async () => {
        const result = await answerCard(card.id, userAnswer);
        if (result?.correctAnswer) {
            setFeedback(`Incorrect. Correct answer: ${result.correctAnswer}`);
        } else {
            setFeedback('Correct!');
        }
    };

    return (
        <div style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
            <p>{card.question}</p>
            <input value={userAnswer} onChange={e => setUserAnswer(e.target.value)} />
            <button onClick={handleSubmit}>Submit</button>
            {feedback && <p>{feedback}</p>}
        </div>
    );
}
