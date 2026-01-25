import { useEffect } from "react";

import { useNavigate } from "@/shared/router/hooks/navigate";
import { useParams } from "@/shared/router/hooks/params";

import { useAlert } from "@/components/feedback/alert";
import { useForm } from "@/components/inputs/form-controller";
import { Container } from "@/components/containers/container";
import { Title } from "@/components/typography/title";

import type { Post } from "@/features/post/types/post";
import type { UpdatePost } from "@/features/post/types/update-post";
import { useSession } from "@/features/auth/hooks/session";
import { validatePostUpdateData } from "@/features/post/utils/validation";
import { getPostById, updatePost } from "@/features/post/utils/api";
import { PostForm } from "@/features/post/components/post-form";

type ParamsWithId = {
    id: string;
};

export function PostUpdatePage() {
    const { id } = useParams<ParamsWithId>();
    const alert = useAlert();
    const session = useSession();
    const navigate = useNavigate();

    const form = useForm({
        defaultValues: {
            content: "",
        },
        validate: validatePostUpdateData,
        onSubmit: async (data: UpdatePost) => {
            updatePost(session, id, data)
                .then((_: Post) => {
                    alert.showSuccessMessage("Post updated successfully.");
                    navigate.to("/app/feed");
                })
                .catch((_: Error) => {
                    alert.showErrorMessage("Failed to update post. Please try again.");
                });
        }
    });

    useEffect(() => {
        getPostById(session, id)
            .then((fetchedPost: Post) => {
                form.updateEntity({
                    content: fetchedPost.content,
                });
            })
            .catch((_: Error) => {
                alert.showErrorMessage("Failed to load post data.");
            });
    }, []);
    return (
        <Container>
            <Title level={3}>Update Post</Title>

            <PostForm form={form} />
        </Container>
    );
}
