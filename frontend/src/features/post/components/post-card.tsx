import { Divider } from "@mui/material";

import { DeleteIcon, UpdateIcon } from "@/shared/icons";

import { useForm } from "@/components/inputs/form-controller";
import { Button } from "@/components/inputs/button";
import { Container } from "@/components/containers/container";
import { Form } from "@/components/inputs/form";
import { IconButton } from "@/components/inputs/icon-button";
import { OutlinedCard } from "@/components/containers/outlined-card";
import { Paragraph } from "@/components/typography/paragraph";
import { Stack } from "@/components/containers/stack";
import { TextareaField } from "@/components/inputs/textarea-field";

import type { Comment, Post } from "@/features/post/types/post";
import type { CreateComment } from "@/features/post/types/create-post";
import { UserItem } from "@/features/user/components/user-item";
import { validateCommentCreateData } from "@/features/post/utils/validation";
import { useSession } from "@/features/auth/hooks/session";
import { addCommentToPost } from "@/features/post/utils/api";
import type { FeedController } from "../hooks/feed";

interface MainContainerProps {
    children: React.ReactNode;
}

function MainContainer({ children }: MainContainerProps) {
    return (
        <OutlinedCard sx={{ padding: 2 }}>
            {children}
        </OutlinedCard>
    );
}

interface PostHeaderProps {
    post: Post;
    onUpdate?: (post: Post) => void;
    onDelete?: (post: Post) => void;
}

function PostHeader({ post, onUpdate, onDelete }: PostHeaderProps) {
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
    );
}

interface PostBodyProps {
    post: Post;
}

function PostBody({ post }: PostBodyProps) {
    return (
        <Stack spacing={1}>
            <Paragraph sx={{ textAlign: "right" }} size="small" color="textSecondary">
                Posted on {new Date(post.createdAt).toLocaleString()}
            </Paragraph>

            <Container>
                <Paragraph size="medium" sx={{ whiteSpace: "pre-wrap" }}>
                    {post.content}
                </Paragraph>
            </Container>
        </Stack>
    );
}

interface CommentSectionProps {
    feedController: FeedController;
    post: Post;
}

function CommentSection({ feedController, post }: CommentSectionProps) {
    const session = useSession();

    const form = useForm<CreateComment>({
        defaultValues: {
            content: "",
        },
        validate: validateCommentCreateData,
        onSubmit: (data: CreateComment) => {
            addCommentToPost(session, post.id, data)
                .then((updatedPost: Post) => {
                    feedController.updatePost(updatedPost);
                    form.updateEntity({ content: "" });
                })
                .catch((error: any) => {
                    console.error("Failed to add comment:", error);
                });
        }
    });

    return (
        <Stack spacing={1}>
            <Form controller={form}>
                <Stack spacing={1}>
                    <TextareaField
                        label="Add a comment..."
                        value={form.entity.content}
                        onChange={(newValue) => form.handleChange("content", newValue)}
                        onBlur={(newValue) => form.handleBlur("content", newValue)}
                        minRows={1}
                    />

                    <Button type="submit" variant="contained" sx={{ alignSelf: "flex-end" }}>
                        Comment
                    </Button>
                </Stack>
            </Form>

            {post.comments?.map((comment: Comment, index: number) => (
                <Container key={index}>
                    <UserItem
                        user={comment.createdBy}
                        hideEmail
                        contentSlot={(
                            <Paragraph size="small" sx={{ whiteSpace: "pre-wrap" }}>
                                {comment.content}
                            </Paragraph>
                        )}
                    />
                </Container>
            ))}
        </Stack>
    );
}

export interface PostCardProps {
    feedController: FeedController;

    post: Post;

    onUpdate?: (post: Post) => void;
    onDelete?: (post: Post) => void;
}

export function PostCard({ feedController, post, onUpdate, onDelete }: PostCardProps) {

    return (
        <MainContainer>
            <PostHeader post={post} onUpdate={onUpdate} onDelete={onDelete} />
            <PostBody post={post} />

            <Divider sx={{ marginX: -2, marginY: 2 }} />

            <CommentSection post={post} feedController={feedController} />
        </MainContainer>
    );
}
