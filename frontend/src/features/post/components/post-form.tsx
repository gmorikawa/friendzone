import type { FormController } from "@/components/inputs/form-controller";
import { Button } from "@/components/inputs/button";
import { Container } from "@/components/containers/container";
import { Form } from "@/components/inputs/form";
import { Paragraph } from "@/components/typography/paragraph";
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
                <Container>
                    <Paragraph>
                        Keep your posts short, with maximum of 255 characters.
                    </Paragraph>
                    <Paragraph>
                        Also, remember to be respectful and follow community guidelines when creating posts.
                    </Paragraph>
                </Container>

                <TextareaField
                    label="Content"
                    value={form.entity.content}
                    onChange={(newValue: string) => form.handleChange("content", newValue)}
                    onBlur={(newValue: string) => form.handleBlur("content", newValue)}
                    error={form.getError("content")}
                    minRows={4}
                />

                <Container sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button variant="contained" type="submit">
                        Save
                    </Button>
                </Container>
            </Stack>
        </Form>
    );
}