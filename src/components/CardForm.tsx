import { useState } from 'react';
import { createCard } from '../api/cardApi';

export default function CardForm() {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [tag, setTag] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createCard(question, answer, tag);
            setMessage('Card created!');
            setQuestion('');
            setAnswer('');
            setTag('');
        } catch (err) {
            setMessage('Error creating card');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Question" value={question} onChange={e => setQuestion(e.target.value)} />
            <input placeholder="Answer" value={answer} onChange={e => setAnswer(e.target.value)} />
            <input placeholder="Tag" value={tag} onChange={e => setTag(e.target.value)} />
            <button type="submit">Create Card</button>
            {message && <p>{message}</p>}
        </form>
    );
}
