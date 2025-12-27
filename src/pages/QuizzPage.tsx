import { useEffect, useState } from "react";
import { getQuizzCards } from "../api/cardApi";
import CardAnswer from "../components/CardAnswer";
import { withToast } from "../components/error/errorWrapper";

export default function QuizzPage() {
    const [cards, setCards] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setLoading(true);

            const result = await withToast(getQuizzCards(), {
                errorMessage: "Failed to load quizz!",
            });

            if (result.ok) setCards(result.data);
            setLoading(false);
        })();
    }, []);

    const handleAnswered = (cardId: string) => {
        setCards((prev) => prev.filter((c) => c.id !== cardId));
    };

    return (
        <div>
            <h2>Today’s Quizz</h2>

            {loading && <p>Loading…</p>}

            {!loading && cards.length === 0 && <p>No quizz today</p>}

            {cards.map((card) => (
                <CardAnswer
                    key={card.id}
                    card={card}
                    onAnswered={handleAnswered}
                />
            ))}
        </div>
    );
}
