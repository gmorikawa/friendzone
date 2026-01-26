import axios, { type AxiosResponse } from "axios";
import { Environment } from "@/config/environment";

import { handleHttpError } from "@/shared/http/utils/error-handling";
import { authorizationHeader } from "@/shared/http/utils/headers";

import type { Session } from "@/features/auth/types/session";
import type { User } from "@/features/user/types/user";
import type { UpdateUser } from "@/features/user/types/update-user";

export async function getUsers(session: Session): Promise<User[]> {
    const url = `${Environment.API_URL}/users`;
    const headers = authorizationHeader(session);

    return axios.get<User[]>(url, { headers })
        .then((response: AxiosResponse) => response.data)
        .catch(handleHttpError);
}

export async function getUserById(session: Session, id: string): Promise<User> {
    const url = `${Environment.API_URL}/users/${id}`;
    const headers = authorizationHeader(session);

    return axios.get<User>(url, { headers })
        .then((response: AxiosResponse) => response.data)
        .catch(handleHttpError);
}

export async function updateUser(session: Session, id: string, data: UpdateUser): Promise<User> {
    const url = `${Environment.API_URL}/users/${id}`;
    const headers = authorizationHeader(session);

    return axios.put<User>(url, data, { headers })
        .then((response: AxiosResponse) => response.data)
        .catch(handleHttpError);
}
