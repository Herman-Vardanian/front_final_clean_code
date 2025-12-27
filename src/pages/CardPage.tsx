import {useEffect, useState} from 'react';
import {answerCard, getQuizzCards} from '../api/cardApi';
import CardAnswer from '../components/CardAnswer';
import {withToast} from "../components/error/errorWrapper.ts";

export default function CardPage() {
    const [cards, setCards] = useState<any[]>([]);

    const loadCards = async () => {
        try {
            const result = await withToast(getQuizzCards(), {
                errorMessage: "Failed to load quizz!",
            });
            if (result.ok) {
                setCards(result.data);
                if (result.data.length == 0) {
                    return <p>No quizz today</p>
                }

            }
        } catch (e) {
            console.log(e.message)
        }
    };

    useEffect(() => {
        loadCards();
    }, []);

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
