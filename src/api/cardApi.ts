const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function createCard(question: string, answer: string, tag?: string) {
    const res = await fetch(`${BASE_URL}/cards`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, answer, tag })
    });
    if (!res.ok) throw new Error('Failed to create card');
    return res.json();
}

export async function getQuizCards(date?: string) {
    const url = date ? `${BASE_URL}/cards/quizz?date=${date}` : `${BASE_URL}/cards/quizz`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch quiz cards');
    return res.json();
}

export async function answerCard(cardId: string, userAnswer: string, force = false) {
    const res = await fetch(`${BASE_URL}/cards/${cardId}/answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userAnswer, force })
    });
    if (!res.ok) return res.json();
    return null;
}
