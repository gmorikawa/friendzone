import { Container } from "@/components/containers/container";
import { OutlinedCard } from "@/components/containers/outlined-card";
import { Paragraph } from "@/components/typography/paragraph";
import { UserItem } from "@/features/user/components/user-item";

import type { Post } from "@/features/post/types/post";

export interface PostCardProps {
    post: Post;
}

export function PostCard({ post }: PostCardProps) {
    return (
        <OutlinedCard sx={{ padding: 2 }}>
            <UserItem user={post.createdBy} />
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