import type {ApiResult} from "../../api/helper/apiResult.ts";

import toast from "react-hot-toast";

export function withToast<T>(
    promise: Promise<ApiResult<T>>,
    options?: {
        successMessage?: string;
        errorMessage?: (msg: string) => string;
    }
): Promise<ApiResult<T>> {
    return promise.then(result => {
        if (!result.ok) {
            toast.error(
                options?.errorMessage
                    ? options.errorMessage(result.message)
                    : result.message
            );
        } else if (options?.successMessage) {
            toast.success(options.successMessage);
        }
        return result;
    });
}
