import { useEffect, useState } from "react";

import { useAlert } from "@/components/feedback/alert";
import { Container } from "@/components/containers/container";
import { Stack } from "@/components/containers/stack";

import type { Post } from "@/features/post/types/post";
import { useSession } from "@/features/auth/hooks/session";
import { getPosts } from "@/features/post/utils/api";
import { PostCard } from "@/features/post/components/post-card";

export function FeedPage() {
    const alert = useAlert();
    const session = useSession();
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        getPosts(session)
            .then(((posts: Post[]) => {
                setPosts(posts);
            }))
            .catch((error: Error) => {
                alert.showErrorMessage("Failed to load posts: " + error.message);
            });
    }, []);
    return (
        <Container>
            <Stack spacing={2}>
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </Stack>
        </Container>
    );
}
