import { useState } from 'react';
import CardForm from '../components/CardForm';
import CardList from '../components/CardList';

export default function CreateCardPage() {
    const [cards, setCards] = useState<any[]>([]);

    const handleCardCreated = (card: any) => {
        setCards(prev => [card, ...prev]);
    };

    return (
        <div>
            <h2>Create a Card</h2>
            <CardForm onCardCreated={handleCardCreated} />
            <h3>Recently created cards</h3>
            <CardList cards={cards} />
        </div>
    );
}
