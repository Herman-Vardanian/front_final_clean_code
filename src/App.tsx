import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreateCardPage from './pages/CreateCardPage.tsx';
import QuizzPage from './pages/QuizzPage.tsx';
import {Toaster} from "react-hot-toast";
import CardsPage from "./pages/CardPage.tsx";

export default function App() {
    return (
        <>
            <Router>
                <nav>
                    <Link to="/">Home</Link> | <Link to="/create-card">Create Card</Link> | <Link to="/quizz">Quizz</Link> | <Link to="/cards">Cards</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/create-card" element={<CreateCardPage />} />
                    <Route path="/quizz" element={<QuizzPage />} />
                    <Route path="/cards" element={<CardsPage />} />
                </Routes>
            </Router>
            <Toaster position="top-right" />
        </>
    );
}
