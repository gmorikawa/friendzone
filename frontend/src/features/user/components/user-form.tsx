
import { useAlert } from "@/components/feedback/alert";
import { useForm } from "@/components/inputs/form-controller";
import { Button } from "@/components/inputs/button";
import { Container } from "@/components/containers/container";
import { Form } from "@/components/inputs/form";
import { PasswordField } from "@/components/inputs/password-field";
import { Stack } from "@/components/containers/stack";
import { TextareaField } from "@/components/inputs/textarea-field";
import { TextField } from "@/components/inputs/text-field";
import { Title } from "@/components/typography/title";

import type { User } from "@/features/user/types/user";
import type { UpdateUser } from "@/features/user/types/update-user";
import { useSession } from "@/features/auth/hooks/session";
import { validateUserUpdateData } from "@/features/user/utils/validation";
import { updateUser } from "@/features/user/utils/api";
import { Paragraph } from "@/components/typography/paragraph";
import type { HttpError } from "@/shared/http/utils/error-handling";

export interface UserFormProps {
    user: User;

    blockEmail?: boolean;
}

export function UserForm({ user, blockEmail }: UserFormProps) {
    const alert = useAlert();
    const session = useSession();

    const form = useForm<UpdateUser>({
        defaultValues: {
            name: {
                first: user?.name.first || "",
                last: user?.name.last || "",
            },
            email: user?.email || "",
            password: "",
            confirmPassword: "",
            biography: user?.biography || "",

            currentPassword: "",
        },
        validate: validateUserUpdateData,
        onSubmit: (validatedData: UpdateUser) => {
            if (!user) {
                return null;
            }

            updateUser(session, user.id, validatedData)
                .then((user: User) => {
                    alert.showSuccessMessage("User profile updated successfully.");
                    session.update(session.token, {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                    });
                })
                .catch((error: HttpError) => {
                    alert.showErrorMessage(error.message);
                });
        },
    });

    return (
        <Container>
            <Form controller={form}>
                <Stack spacing={4}>
                    <Stack spacing={2}>
                        <Title level={6} fontWeight="bold">
                            Basic Information
                        </Title>

                        <Paragraph>
                            To change your password, please enter a new password and confirm it below.
                        </Paragraph>

                        <TextField
                            label="First Name"
                            value={form.entity.name?.first}
                            onChange={(newValue: string) => form.handleChange("name.first", newValue)}
                            onBlur={(newValue: string) => form.handleBlur("name.first", newValue)}
                            error={form.getError("name.first")}
                        />

                        <TextField
                            label="Last Name"
                            value={form.entity.name?.last}
                            onChange={(newValue: string) => form.handleChange("name.last", newValue)}
                            onBlur={(newValue: string) => form.handleBlur("name.last", newValue)}
                            error={form.getError("name.last")}
                        />

                        <TextField
                            label="Email Address"
                            value={form.entity.email}
                            onChange={(newValue: string) => form.handleChange("email", newValue)}
                            onBlur={(newValue: string) => form.handleBlur("email", newValue)}
                            error={form.getError("email")}
                            disabled={blockEmail}
                        />

                        <TextareaField
                            label="Biography"
                            value={form.entity.biography}
                            onChange={(newValue: string) => form.handleChange("biography", newValue)}
                            onBlur={(newValue: string) => form.handleBlur("biography", newValue)}
                            error={form.getError("biography")}
                            minRows={4}
                        />
                    </Stack>

                    <Stack spacing={2}>
                        <Title level={6} fontWeight="bold">
                            Security Settings
                        </Title>

                        <Paragraph>
                            To change your password, please enter a new password and confirm it below.
                        </Paragraph>

                        <PasswordField
                            label="Password"
                            value={form.entity.password}
                            onChange={(newValue: string) => form.handleChange("password", newValue)}
                            onBlur={(newValue: string) => form.handleBlur("password", newValue)}
                            error={form.getError("password")}
                        />

                        <PasswordField
                            label="Confirm Password"
                            value={form.entity.confirmPassword}
                            onChange={(newValue: string) => form.handleChange("confirmPassword", newValue)}
                            onBlur={(newValue: string) => form.handleBlur("confirmPassword", newValue)}
                            error={form.getError("confirmPassword")}
                        />
                    </Stack>

                    <Stack spacing={2}>
                        <Title level={6} fontWeight="bold">
                            Confirm Current Password
                        </Title>

                        <Paragraph>
                            Confirm your current password to apply changes.
                        </Paragraph>

                        <PasswordField
                            label="Current Password"
                            value={form.entity.currentPassword}
                            onChange={(newValue: string) => form.handleChange("currentPassword", newValue)}
                            onBlur={(newValue: string) => form.handleBlur("currentPassword", newValue)}
                            error={form.getError("currentPassword")}
                        />
                    </Stack>

                    <Container sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button variant="contained" type="submit">
                            Update Profile
                        </Button>
                    </Container>
                </Stack>
            </Form>
        </Container>
    );
}
