import { useState } from 'react';
import {answerCard, createCard} from '../api/cardApi';
import {withToast} from "./error/errorWrapper.ts";

export default function CardForm({ onCardCreated }: { onCardCreated?: (card: any) => void }) {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [tag, setTag] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await withToast(createCard(question, answer, tag), {
                successMessage: "Carte created!!",
                errorMessage: "Error creating a card!"
            });
            if (result.ok && onCardCreated) {
                onCardCreated(result.data);
            }
            setQuestion('');
            setAnswer('');
            setTag('');
        } catch (error) {
            console.log(error.message)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Question" value={question} onChange={e => setQuestion(e.target.value)} />
            <input placeholder="Answer" value={answer} onChange={e => setAnswer(e.target.value)} />
            <input placeholder="Tag" value={tag} onChange={e => setTag(e.target.value)} />
            <button type="submit">Create Card</button>
        </form>
    );
}
