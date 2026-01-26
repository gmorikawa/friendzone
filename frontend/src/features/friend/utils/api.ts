import axios, { type AxiosResponse } from "axios";

import { Environment } from "@/config/environment";
import type { Session } from "@/features/auth/types/session";
import type { Friend } from "../types/friend";
import type { FriendStatus } from "../types/enum";

export async function getFriendsByStatus(
    session: Session,
    userId: string,
    status: FriendStatus
): Promise<Friend[]> {
    const url = `${Environment.API_URL}/users/${userId}/friends/status/${status}`;

    return axios.get<any[]>(
        url,
        {
            headers: {
                Authorization: `Bearer ${session.token}`,
            },
        }
    )
        .then((response: AxiosResponse) => {
            return response.data;
        });
}

export async function requestFriendship(
    session: Session,
    userId: string,
    partnerId: string
): Promise<boolean> {
    const url = `${Environment.API_URL}/users/${userId}/friends/${partnerId}`;

    return axios.post<boolean>(
        url,
        {},
        {
            headers: {
                Authorization: `Bearer ${session.token}`,
            },
        }
    )
        .then((response: AxiosResponse) => {
            return response.data;
        });
}

export async function acceptFriendship(
    session: Session,
    userId: string,
    partnerId: string
): Promise<boolean> {
    const url = `${Environment.API_URL}/users/${userId}/friends/${partnerId}/accept`;

    return axios.patch<boolean>(
        url,
        {},
        {
            headers: {
                Authorization: `Bearer ${session.token}`,
            },
        }
    )
        .then((response: AxiosResponse) => {
            return response.data;
        });
}

export async function declineFriendship(
    session: Session,
    userId: string,
    partnerId: string
): Promise<boolean> {
    const url = `${Environment.API_URL}/users/${userId}/friends/${partnerId}/decline`;

    return axios.patch<boolean>(
        url,
        {},
        {
            headers: {
                Authorization: `Bearer ${session.token}`,
            },
        }
    )
        .then((response: AxiosResponse) => {
            return response.data;
        });
}

export async function removeFriendship(
    session: Session,
    userId: string,
    partnerId: string
): Promise<boolean> {
    const url = `${Environment.API_URL}/users/${userId}/friends/${partnerId}`;

    return axios.delete<boolean>(
        url,
        {
            headers: {
                Authorization: `Bearer ${session.token}`,
            },
        }
    )
        .then((response: AxiosResponse) => {
            return response.data;
        });
}
