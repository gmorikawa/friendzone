import axios, { type AxiosResponse } from "axios";
import { Environment } from "@/config/environment";

import type { Session } from "@/features/auth/types/session";
import type { CreatePost } from "@/features/post/types/create-post";
import type { Post } from "@/features/post/types/post";

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
