import axios, { type AxiosResponse } from "axios";

import { Environment } from "@/config/environment";

import { handleHttpError } from "@/shared/http/utils/error-handling";

import type { Session } from "@/features/auth/types/session";
import type { SignUpUser } from "@/features/auth/types/sign-up-user";
import type { LogInCredentials } from "@/features/auth/types/log-in-credentials";
import type { PasswordResetRequest } from "@/features/auth/types/password-reset-request";
import type { PasswordRecovery } from "@/features/auth/types/password-recovery";
import type { CreateUser } from "@/features/user/types/create-user";

export async function signUp(
    signUpData: SignUpUser
): Promise<boolean> {
    const url = `${Environment.API_URL}/auth/sign-up`;
    const body: { user: CreateUser } = {
        user: {
            name: {
                first: signUpData.firstName,
                last: signUpData.lastName
            },
            email: signUpData.email,
            password: signUpData.password
        }
    };

    return axios.post<boolean>(url, body)
        .then((response: AxiosResponse) => response.data)
        .catch(handleHttpError);
}

export async function logIn(
    data: LogInCredentials
): Promise<Session> {
    const url = `${Environment.API_URL}/auth/log-in`;

    return axios.post<Session>(url, data)
        .then((response: AxiosResponse) => response.data)
        .catch(handleHttpError);
}

export async function confirmEmail(
    token: string
): Promise<boolean> {
    const url = `${Environment.API_URL}/auth/confirm-email`;

    return axios.patch<boolean>(url, { token })
        .then((response: AxiosResponse) => response.data)
        .catch(handleHttpError);
}

export async function requestPasswordReset(
    data: PasswordResetRequest
): Promise<boolean> {
    const url = `${Environment.API_URL}/auth/password-reset`;

    return axios.post<boolean>(url, data)
        .then((response: AxiosResponse) => response.data)
        .catch(handleHttpError);
}

export async function resetPassword(
    token: string,
    passwordRecovery: PasswordRecovery
): Promise<boolean> {
    const url = `${Environment.API_URL}/auth/password-reset`;
    const data = {
        token,
        password: passwordRecovery.password
    };

    return axios.patch<boolean>(url, data)
        .then((response: AxiosResponse) => response.data)
        .catch(handleHttpError);
}
