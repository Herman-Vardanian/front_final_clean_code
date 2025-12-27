import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div>
            <h1>Welcome to Clean Code App</h1>
            <p>
                <Link to="/create-card">Create a Card</Link>
            </p>
            <p>
                <Link to="/cards">Take Today's Quizz</Link>
            </p>
        </div>
    );
}
