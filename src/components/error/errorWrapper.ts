import type {ApiResult} from "../../api/helper/apiResultType.ts";

import toast from "react-hot-toast";

export function withToast<T>(
    promise: Promise<ApiResult<T>>,
    options?: {
        successMessage?: string;
        errorMessage?: string | ((msg: string) => string);
    }
): Promise<ApiResult<T>> {
    return promise.then(result => {
        if (!result.ok) {
            const message =
                typeof options?.errorMessage === "function"
                    ? options.errorMessage(result.message)
                    : options?.errorMessage ?? result.message;

            toast.error(message);
        } else if (options?.successMessage) {
            toast.success(options.successMessage);
        }
        return result;
    });
}
