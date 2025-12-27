import { useEffect, useState } from 'react';
import { getQuizzCards } from '../api/cardApi';
import CardAnswer from '../components/CardAnswer';

export default function CardPage() {
    const [cards, setCards] = useState<any[]>([]);
    const [error, setError] = useState('');

    const loadCards = async () => {
        try {
            const data = await getQuizzCards();
            setCards(data);
        } catch {
            setError('Failed to load quizz');
        }
    };

    useEffect(() => {
        loadCards();
    }, []);

    if (error) return <p>{error}</p>;
    if (cards.length === 0) return <p>No quizz today</p>;

    return (
        <div>
            <h2>Today’s Quizz</h2>
            {cards.map(card => (
                <CardAnswer
                    key={card.id}
                    card={card}
                    onAnswered={loadCards}
                />
            ))}
        </div>
    );
}
