import type {ApiResult} from "./apiResult.ts";

async function safeJson(res: Response) {
    try {
        return await res.json();
    } catch {
        return null;
    }
}

export async function apiFetch<T>(
    input: RequestInfo,
    init?: RequestInit
): Promise<ApiResult<T>> {
    try {
        const res = await fetch(input, init);
        const body = await safeJson(res);

        if (!res.ok) {
            const message =
                body?.message ||
                body?.error ||
                body?.details ||
                `Request failed (${res.status})`;

            return {
                ok: false,
                status: res.status,
                message: typeof message === "string" ? message : "Request failed",
                details: body,
            };
        }

        return { ok: true, data: body as T };
    } catch (e) {
        return {
            ok: false,
            status: 0,
            message: e instanceof Error ? e.message : "Network error",
        };
    }
}
