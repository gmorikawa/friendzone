import axios from "axios";
import { Environment } from "@/config/environment";

import type { SignInUser } from "@/features/auth/types/sign-in-user";
import type { CreateUser } from "@/features/user/types/create-user";

export function createUser(signInData: SignInUser) {
    const body: { user: CreateUser } = {
        user: {
            name: {
                first: signInData.firstName,
                last: signInData.lastName
            },
            email: signInData.email,
            password: signInData.password
        }
    };

    return axios.post(`${Environment.API_URL}/auth/sign-up`, body);
}
