import axios, { type AxiosResponse } from "axios";
import { Environment } from "@/config/environment";

import type { Session } from "@/features/auth/types/session";
import type { User } from "@/features/user/types/user";
import type { UpdateUser } from "../types/update-user";

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

export async function getUserById(session: Session, id: string): Promise<User> {
    const url = `${Environment.API_URL}/users/${id}`;

    return axios.get<User>(
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
            console.error(`Error fetching user with ID ${id}:`, error);
            throw error;
        });
}

export async function updateUser(session: Session, id: string, data: UpdateUser): Promise<User> {
    const url = `${Environment.API_URL}/users/${id}`;

    return axios.put<User>(
        url,
        data,
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
            console.error(`Error updating user with ID ${id}:`, error);
            throw error;
        });
}
