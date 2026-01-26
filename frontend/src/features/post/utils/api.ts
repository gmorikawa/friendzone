import axios, { type AxiosResponse } from "axios";

import { Environment } from "@/config/environment";

import { handleHttpError } from "@/shared/http/utils/error-handling";
import { authorizationHeader } from "@/shared/http/utils/headers";

import type { Session } from "@/features/auth/types/session";
import type { CreateComment, CreatePost } from "@/features/post/types/create-post";
import type { Post } from "@/features/post/types/post";
import type { UpdatePost } from "@/features/post/types/update-post";

export async function getPosts(
    session: Session
): Promise<Post[]> {
    const url = `${Environment.API_URL}/posts`;
    const headers = authorizationHeader(session);

    return axios.get<Post[]>(url, { headers })
        .then((response: AxiosResponse) => response.data)
        .catch(handleHttpError);
}

export async function getPostById(
    session: Session,
    id: string
): Promise<Post> {
    const url = `${Environment.API_URL}/posts/${id}`;
    const headers = authorizationHeader(session);

    return axios.get<Post>(url, { headers })
        .then((response: AxiosResponse) => response.data)
        .catch(handleHttpError);
}

export async function createPost(
    session: Session,
    data: CreatePost
): Promise<Post> {
    const url = `${Environment.API_URL}/posts`;
    const headers = authorizationHeader(session);

    return axios.post<Post>(url, data, { headers })
        .then((response: AxiosResponse) => response.data)
        .catch(handleHttpError);
}

export async function updatePost(
    session: Session,
    id: string,
    data: UpdatePost
): Promise<Post> {
    const url = `${Environment.API_URL}/posts/${id}`;
    const headers = authorizationHeader(session);

    return axios.put<Post>(url, data, { headers })
        .then((response: AxiosResponse) => response.data)
        .catch(handleHttpError);
}

export async function deletePost(
    session: Session,
    id: string
): Promise<void> {
    const url = `${Environment.API_URL}/posts/${id}`;
    const headers = authorizationHeader(session);

    return axios.delete(url, { headers })
        .then((response: AxiosResponse) => response.data)
        .catch(handleHttpError);
}

export async function addCommentToPost(
    session: Session,
    id: string,
    data: CreateComment
): Promise<Post> {
    const url = `${Environment.API_URL}/posts/${id}/comments`;
    const headers = authorizationHeader(session);

    return axios.patch<Post>(url, data, { headers })
        .then((response: AxiosResponse) => response.data)
        .catch(handleHttpError);
}
