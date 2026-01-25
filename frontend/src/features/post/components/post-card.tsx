import { DeleteIcon, UpdateIcon } from "@/shared/icons";

import { Container } from "@/components/containers/container";
import { IconButton } from "@/components/inputs/icon-button";
import { OutlinedCard } from "@/components/containers/outlined-card";
import { Paragraph } from "@/components/typography/paragraph";

import type { Post } from "@/features/post/types/post";
import { UserItem } from "@/features/user/components/user-item";

export interface PostCardProps {
    post: Post;

    onUpdate?: (post: Post) => void;
    onDelete?: (post: Post) => void;
}

export function PostCard({ post, onUpdate, onDelete }: PostCardProps) {

    const handleUpdate = () => {
        if (onUpdate) {
            onUpdate(post);
        }
    };

    const handleDelete = () => {
        if (onDelete) {
            onDelete(post);
        }
    };

    return (
        <OutlinedCard sx={{ padding: 2 }}>
            <Container sx={{ display: "flex", justifyContent: "space-between" }}>
                <UserItem user={post.createdBy} />

                <Container sx={{ display: "flex", gap: 1 }}>
                    {onUpdate && (
                        <IconButton onClick={handleUpdate} color="primary">
                            <UpdateIcon />
                        </IconButton>
                    )}

                    {onDelete && (
                        <IconButton onClick={handleDelete} color="error">
                            <DeleteIcon />
                        </IconButton>
                    )}
                </Container>
            </Container>
            <Paragraph sx={{ textAlign: "right" }}>
                Posted on {new Date(post.createdAt).toLocaleString()}
            </Paragraph>

            <Container sx={{ marginY: 2 }}>
                <Paragraph size="medium">
                    {post.content}
                </Paragraph>
            </Container>
        </OutlinedCard>
    );
}
