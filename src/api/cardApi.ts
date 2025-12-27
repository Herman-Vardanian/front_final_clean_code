import {apiFetch} from "./helper/apiFetch.ts";
import {withToast} from "../components/error/errorWrapper.ts";

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

export function answerCard(cardId: string, isValid: boolean) {
    return apiFetch<void>(`${API_URL}/cards/${cardId}/answer`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isValid }),
    });
}

export async function getCardsByTag(tag = '') {
    const res = await fetch(`${API_URL}/cards/tag?tag=${tag}`);
    if (!res.ok) throw new Error('Failed to get cards');
    return res.json();
}