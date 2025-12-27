import CardAnswer from './CardAnswer';

export default function CardList({ cards }: { cards: any[] }) {
    if (!cards.length) return <p>No cards available</p>;

    return (
        <div>
            {cards.map(card => (
                <CardAnswer key={card.id} card={card} />
            ))}
        </div>
    );
}
