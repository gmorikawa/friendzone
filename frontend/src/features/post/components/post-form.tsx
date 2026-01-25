import type { FormController } from "@/components/inputs/form-controller";
import { Button } from "@/components/inputs/button";
import { Form } from "@/components/inputs/form";
import { Stack } from "@/components/containers/stack";
import { TextareaField } from "@/components/inputs/textarea-field";

import type { UpdatePost } from "../types/update-post";

export interface PostFormProps {
    form: FormController<UpdatePost>;
}

export function PostForm({ form }: PostFormProps) {
    return (
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
                    Save
                </Button>
            </Stack>
        </Form>
    );
}