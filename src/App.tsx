import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreateCardPage from './pages/CreateCardPage.tsx';
import CardPage from './pages/CardPage.tsx';
import {Toaster} from "react-hot-toast";

export default function App() {
    return (
        <>
            <Router>
                <nav>
                    <Link to="/">Home</Link> | <Link to="/create-card">Create Card</Link> | <Link to="/cards">Quizz</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/create-card" element={<CreateCardPage />} />
                    <Route path="/cards" element={<CardPage />} />
                </Routes>
            </Router>
            <Toaster position="top-right" />
        </>
    );
}
