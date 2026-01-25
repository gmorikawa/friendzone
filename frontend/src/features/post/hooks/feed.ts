import { useEffect, useState } from "react";

import { useAlert } from "@/components/feedback/alert";

import type { Post } from "@/features/post/types/post";
import { useSession } from "@/features/auth/hooks/session";
import { getPosts } from "@/features/post/utils/api";

export interface FeedController {
    posts: Post[];

    refresh: () => void;

    updatePost: (updatedPost: Post) => void;
}

export function useFeed(): FeedController {
    const [posts, setPosts] = useState<Post[]>([]);
    const alert = useAlert();
    const session = useSession();

    const updatePost = (updatedPost: Post) => {
        setPosts((previousPosts: Post[]) =>
            previousPosts.map((post: Post) =>
                (post.id === updatedPost.id)
                    ? updatedPost
                    : post
            )
        );
    };

    const refresh = () => {
        getPosts(session)
            .then(((posts: Post[]) => {
                setPosts(posts);
            }))
            .catch((error: Error) => {
                alert.showErrorMessage("Failed to load posts: " + error.message);
            });
    };

    useEffect(() => {
        refresh();
    }, []);
    return {
        posts,

        refresh,

        updatePost,
    };
}