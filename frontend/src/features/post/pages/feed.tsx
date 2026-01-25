import { useEffect, useState } from "react";

import { useNavigate } from "@/shared/router/hooks/navigate";

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
    const navigate = useNavigate();
    const [posts, setPosts] = useState<Post[]>([]);

    const handleUpdate = (post: Post) => {
        navigate.to(`/app/posts/${post.id}`);
    };

    const handleDelete = (post: Post) => {
        
    };

    const canEdit = (post: Post): boolean => {
        return session?.loggedUser?.id === post.createdBy.id;
    };

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
                    <PostCard
                        key={post.id}
                        post={post}
                        onUpdate={canEdit(post) ? handleUpdate : undefined}
                        onDelete={canEdit(post) ? handleDelete : undefined}
                    />
                ))}
            </Stack>
        </Container>
    );
}
