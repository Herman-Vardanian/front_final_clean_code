export type ApiOk<T> = { ok: true; data: T };
export type ApiErr = { ok: false; status: number; message: string; details?: unknown };
export type ApiResult<T> = ApiOk<T> | ApiErr;
