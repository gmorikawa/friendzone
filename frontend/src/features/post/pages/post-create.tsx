import { useNavigate } from "@/shared/router/hooks/navigate";

import { useAlert } from "@/components/feedback/alert";
import { useForm } from "@/components/inputs/form-controller";
import { Button } from "@/components/inputs/button";
import { Container } from "@/components/containers/container";
import { Form } from "@/components/inputs/form";
import { Stack } from "@/components/containers/stack";
import { TextareaField } from "@/components/inputs/textarea-field";
import { Title } from "@/components/typography/title";

import type { Post } from "@/features/post/types/post";
import type { CreatePost } from "@/features/post/types/create-post";
import { useSession } from "@/features/auth/hooks/session";
import { validatePostCreateData } from "@/features/post/utils/validation";
import { createPost } from "@/features/post/utils/api";

export function PostCreatePage() {
    const alert = useAlert();
    const session = useSession();
    const navigate = useNavigate();

    const form = useForm({
        defaultValues: {
            content: "",
            createdBy: session?.loggedUser?.id || ""
        },
        validate: validatePostCreateData,
        onSubmit: async (data: CreatePost) => {
            createPost(session, data)
                .then((_: Post) => {
                    alert.showSuccessMessage("Post created successfully.");
                    navigate.to("/app/feed");
                })
                .catch((_: Error) => {
                    alert.showErrorMessage("Failed to create post. Please try again.");
                });
        }
    });

    return (
        <Container>
            <Title level={3}>Create Post</Title>

            <Form controller={form}>
                <Stack spacing={2}>
                    <TextareaField
                        label="Content"
                        value={form.entity.content}
                        onChange={(newValue: string) => form.handleChange("content", newValue)}
                        onBlur={(newValue: string) => form.handleBlur("content", newValue)}
                        error={form.getError("content")}
                        minRows={4}
                    />

                    <Button variant="contained" type="submit">
                        Post
                    </Button>
                </Stack>
            </Form>
        </Container>
    );
}
