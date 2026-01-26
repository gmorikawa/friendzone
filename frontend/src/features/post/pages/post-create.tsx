import type { HttpError } from "@/shared/http/utils/error-handling";
import { useNavigate } from "@/shared/router/hooks/navigate";

import { useAlert } from "@/components/feedback/alert";
import { useForm } from "@/components/inputs/form-controller";
import { Container } from "@/components/containers/container";
import { Title } from "@/components/typography/title";

import type { Post } from "@/features/post/types/post";
import type { CreatePost } from "@/features/post/types/create-post";
import { useSession } from "@/features/auth/hooks/session";
import { validatePostCreateData } from "@/features/post/utils/validation";
import { createPost } from "@/features/post/utils/api";
import { PostForm } from "@/features/post/components/post-form";
import { Stack } from "@/components/containers/stack";

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
                .catch((error: HttpError) => {
                    alert.showErrorMessage(error.message);
                });
        }
    });
    return (
        <Container>
            <Stack spacing={2}>
                <Title level={3}>Create Post</Title>

                <PostForm form={form} />
            </Stack>
        </Container>
    );
}
