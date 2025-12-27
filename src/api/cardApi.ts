import {httpSender} from "./helper/httpSender.ts";
import {withToast} from "../components/error/errorWrapper.ts";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function createCard(question: string, answer: string, tag?: string) {
    return httpSender<any>(`${API_URL}/cards`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, answer, tag }),
    });
}

export async function getQuizzCards() {
    return httpSender<any>(`${API_URL}/cards/quizz`, {
        method: "GET"
    });
}

export function answerCard(cardId: string, isValid: boolean) {
    return httpSender<void>(`${API_URL}/cards/${cardId}/answer`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isValid }),
    });
}

export async function getCardsByTag(tag = '') {
    return httpSender<void>(`${API_URL}/cards/tag?tag=${tag}`, {
        method: "POST"
    });
}