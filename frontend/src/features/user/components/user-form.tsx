
import { useAlert } from "@/components/feedback/alert";
import { useForm } from "@/components/inputs/form-controller";
import { Button } from "@/components/inputs/button";
import { Container } from "@/components/containers/container";
import { Form } from "@/components/inputs/form";
import { PasswordField } from "@/components/inputs/password-field";
import { Stack } from "@/components/containers/stack";
import { TextField } from "@/components/inputs/text-field";

import type { User } from "@/features/user/types/user";
import type { UpdateUser } from "@/features/user/types/update-user";
import { useSession } from "@/features/auth/hooks/session";
import { validateUserUpdateData } from "@/features/user/utils/validation";
import { updateUser } from "@/features/user/utils/api";

export interface UserFormProps {
    user: User;
}

export function UserForm({ user }: UserFormProps) {
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
                .catch((_: Error) => {
                    alert.showErrorMessage("Failed to update user profile.");
                });
        },
    });

    return (
        <Container>
            <Form controller={form}>
                <Stack spacing={2}>
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
                    />

                    <TextField
                        label="Biography"
                        value={form.entity.biography}
                        onChange={(newValue: string) => form.handleChange("biography", newValue)}
                        onBlur={(newValue: string) => form.handleBlur("biography", newValue)}
                        error={form.getError("biography")}
                    />

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

                    <PasswordField
                        label="Current Password"
                        value={form.entity.currentPassword}
                        onChange={(newValue: string) => form.handleChange("currentPassword", newValue)}
                        onBlur={(newValue: string) => form.handleBlur("currentPassword", newValue)}
                        error={form.getError("currentPassword")}
                    />

                    <Button variant="contained" type="submit">
                        Update Profile
                    </Button>
                </Stack>
            </Form>
        </Container>
    );
}
