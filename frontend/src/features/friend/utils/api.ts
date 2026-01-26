import axios, { type AxiosResponse } from "axios";

import { Environment } from "@/config/environment";

import { handleHttpError } from "@/shared/http/utils/error-handling";
import { authorizationHeader } from "@/shared/http/utils/headers";

import type { Session } from "@/features/auth/types/session";
import type { Friend } from "@/features/friend/types/friend";
import type { FriendStatus } from "@/features/friend/types/enum";

export async function getFriendsByStatus(
    session: Session,
    userId: string,
    status: FriendStatus
): Promise<Friend[]> {
    const url = `${Environment.API_URL}/users/${userId}/friends/status/${status}`;
    const headers = authorizationHeader(session);

    return axios.get<any[]>(url, { headers })
        .then((response: AxiosResponse) => response.data)
        .catch(handleHttpError);
}

export async function requestFriendship(
    session: Session,
    userId: string,
    partnerId: string
): Promise<boolean> {
    const url = `${Environment.API_URL}/users/${userId}/friends/${partnerId}`;
    const headers = authorizationHeader(session);

    return axios.post<boolean>(url, {}, { headers })
        .then((response: AxiosResponse) => response.data)
        .catch(handleHttpError);
}

export async function acceptFriendship(
    session: Session,
    userId: string,
    partnerId: string
): Promise<boolean> {
    const url = `${Environment.API_URL}/users/${userId}/friends/${partnerId}/accept`;
    const headers = authorizationHeader(session);

    return axios.patch<boolean>(url, {}, { headers })
        .then((response: AxiosResponse) => response.data)
        .catch(handleHttpError);
}

export async function declineFriendship(
    session: Session,
    userId: string,
    partnerId: string
): Promise<boolean> {
    const url = `${Environment.API_URL}/users/${userId}/friends/${partnerId}/decline`;
    const headers = authorizationHeader(session);

    return axios.patch<boolean>(url, {}, { headers })
        .then((response: AxiosResponse) => response.data)
        .catch(handleHttpError);
}

export async function removeFriendship(
    session: Session,
    userId: string,
    partnerId: string
): Promise<boolean> {
    const url = `${Environment.API_URL}/users/${userId}/friends/${partnerId}`;
    const headers = authorizationHeader(session);

    return axios.delete<boolean>(url, { headers })
        .then((response: AxiosResponse) => response.data)
        .catch(handleHttpError);
}
