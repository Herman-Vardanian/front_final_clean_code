import CardForm from './components/CardForm';
import Quizz from './components/Quizz';

export default function App() {
    return (
        <div>
            <h1>Clean code App</h1>
            <h2>Create Card</h2>
            <CardForm />
            <h2>Quizz</h2>
            <Quizz />
        </div>
    );
}
