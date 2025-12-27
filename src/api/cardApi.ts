const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function createCard(question: string, answer: string, tag?: string) {
    const res = await fetch(`${API_URL}/cards`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, answer, tag }),
    });
    if (!res.ok) throw new Error('Failed to create card');
    return res.json();
}

export async function getQuizzCards() {
    const res = await fetch(`${API_URL}/cards/quizz`);
    if (!res.ok) throw new Error('Failed to get quizz cards');
    return res.json();
}

export async function answerCard(cardId: string, userAnswer: string, force = false) {
    const res = await fetch(`${API_URL}/cards/${cardId}/answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userAnswer, force }),
    });
    if (!res.ok) {
        if (res.status === 200) return res.json();
        throw new Error('Failed to answer card');
    }
    return res.json();
}

export async function getCardsByTag(tag = '') {
    const res = await fetch(`${API_URL}/cards/tag?tag=${tag}`);
    if (!res.ok) throw new Error('Failed to get cards');
    return res.json();
}