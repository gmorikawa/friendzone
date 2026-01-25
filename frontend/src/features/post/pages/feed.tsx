import { useNavigate } from "@/shared/router/hooks/navigate";

import { Container } from "@/components/containers/container";
import { Stack } from "@/components/containers/stack";

import type { Post } from "@/features/post/types/post";
import { useSession } from "@/features/auth/hooks/session";
import { useFeed } from "@/features/post/hooks/feed";
import { PostCard } from "@/features/post/components/post-card";

export function FeedPage() {
    
    const session = useSession();
    const navigate = useNavigate();

    const feedController = useFeed();

    const handleUpdate = (post: Post) => {
        navigate.to(`/app/posts/${post.id}`);
    };

    const handleDelete = (post: Post) => {
        
    };

    const canEdit = (post: Post): boolean => {
        return session?.loggedUser?.id === post.createdBy.id;
    };

    
    return (
        <Container>
            <Stack spacing={2}>
                {feedController.posts.map((post) => (
                    <PostCard
                        key={post.id}
                        feedController={feedController}
                        post={post}
                        onUpdate={canEdit(post) ? handleUpdate : undefined}
                        onDelete={canEdit(post) ? handleDelete : undefined}
                    />
                ))}
            </Stack>
        </Container>
    );
}
