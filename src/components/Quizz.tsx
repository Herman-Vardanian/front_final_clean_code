import { useEffect, useState } from 'react';
import { getQuizzCards, answerCard } from '../api/cardApi';
import CardAnswer from './CardAnswer';

export default function Quizz() {
    const [cards, setCards] = useState<any[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchCards() {
            try {
                const data = await getQuizzCards();
                setCards(data);
            } catch {
                setError('Failed to load quizz');
            }
        }
        fetchCards();
    }, []);

    if (error) return <p>{error}</p>;
    if (cards.length === 0) return <p>No quizz today</p>;

    return (
        <div>
            {cards.map(card => (
                <CardAnswer key={card.id} card={card} />
            ))}
        </div>
    );
}
