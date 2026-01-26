import type { AxiosError } from "axios";

type ErrorResponse = {
    status: number;
    message: string;
}

export function handleHttpError(error: AxiosError<ErrorResponse>) {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    throw new HttpError(status ?? 500, message);
}

export class HttpError extends Error {
    public readonly status: number;

    constructor(status: number, message: string) {
        super(message);

        this.status = status;
        this.name = "HttpError";
    }
}
