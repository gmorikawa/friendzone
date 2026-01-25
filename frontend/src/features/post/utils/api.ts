import axios, { type AxiosResponse } from "axios";
import { Environment } from "@/config/environment";

import type { Session } from "@/features/auth/types/session";
import type { CreatePost } from "@/features/post/types/create-post";
import type { Post } from "@/features/post/types/post";
import type { UpdatePost } from "../types/update-post";

export async function getPosts(
    session: Session
) {
    const url = `${Environment.API_URL}/posts`;

    return axios.get<Post[]>(
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

export async function getPostById(
    session: Session,
    id: string
): Promise<Post> {
    const url = `${Environment.API_URL}/posts/${id}`;

    return axios.get<Post>(
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

export async function createPost(
    session: Session,
    data: CreatePost
): Promise<Post> {
    const url = `${Environment.API_URL}/posts`;

    return axios.post<Post>(
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
        });
}

export async function updatePost(
    session: Session,
    id: string,
    data: UpdatePost
): Promise<Post> {
    const url = `${Environment.API_URL}/posts/${id}`;

    return axios.put<Post>(
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
        });
}
