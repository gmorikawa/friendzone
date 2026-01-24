import axios, { type AxiosResponse } from "axios";
import { Environment } from "@/config/environment";

import type { SignUpUser } from "@/features/auth/types/sign-up-user";
import type { CreateUser } from "@/features/user/types/create-user";
import type { LogInCredentials } from "@/features/auth/types/log-in-credentials";
import type { Session } from "@/features/auth/types/session";

export async function signUp(signUpData: SignUpUser) {
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

    return axios.post(`${Environment.API_URL}/auth/sign-up`, body);
}

export async function logIn(logInData: LogInCredentials): Promise<Session> {
    const body = logInData;

    return axios.post(`${Environment.API_URL}/auth/log-in`, body)
        .then((response: AxiosResponse) => {
            return response.data;
        });
}

export async function confirmEmail(token: string): Promise<boolean> {
    return axios.patch(`${Environment.API_URL}/auth/confirm-email`, { token })
        .then((response: AxiosResponse) => {
            return response.data;
        });
}
