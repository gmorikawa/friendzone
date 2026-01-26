import type { HttpError } from "@/shared/http/utils/error-handling";
import { useNavigate } from "@/shared/router/hooks/navigate";

import { useAlert } from "@/components/feedback/alert";
import { Container } from "@/components/containers/container";
import { Stack } from "@/components/containers/stack";

import type { Post } from "@/features/post/types/post";
import { useSession } from "@/features/auth/hooks/session";
import { useFeed } from "@/features/post/hooks/feed";
import { PostCard } from "@/features/post/components/post-card";
import { deletePost } from "@/features/post/utils/api";

export function FeedPage() {
    const alert = useAlert();
    const session = useSession();
    const navigate = useNavigate();

    const feedController = useFeed();

    const handleUpdate = (post: Post) => {
        navigate.to(`/app/posts/${post.id}`);
    };

    const handleDelete = (post: Post) => {
        deletePost(session, post.id)
            .then(() => {
                feedController.refresh();
            })
            .catch((error: HttpError) => {
                alert.showErrorMessage(error.message);
            });
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
