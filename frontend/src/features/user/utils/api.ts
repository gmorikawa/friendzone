import axios, { type AxiosResponse } from "axios";
import { Environment } from "@/config/environment";

import type { Session } from "@/features/auth/types/session";
import type { User } from "@/features/user/types/user";

export async function getUsers(session: Session): Promise<User[]> {
    const url = `${Environment.API_URL}/users`;

    return axios.get<User[]>(
        url,
        {
            headers: {
                Authorization: `Bearer ${session.token}`,
            },
        }
    )
        .then((response: AxiosResponse) => {
            return response.data;
        })
        .catch((error) => {
            console.error("Error fetching users:", error);
            throw error;
        });
}