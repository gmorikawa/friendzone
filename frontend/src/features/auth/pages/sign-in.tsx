import { Logo } from "@/shared/logo";
import { useNavigate } from "@/shared/router/hooks/navigate";

import { Button } from "@/components/inputs/button";
import { Container } from "@/components/containers/container";
import { Form } from "@/components/inputs/form";
import { PasswordField } from "@/components/inputs/password-field";
import { Stack } from "@/components/containers/stack";
import { TextField } from "@/components/inputs/text-field";
import { Title } from "@/components/typography/title";
import { useForm } from "@/components/inputs/form-controller";

import type { SignInUser } from "@/features/auth/types/sign-in-user";
import { validateSignInData } from "@/features/auth/utils/validation";
import { createUser } from "@/features/auth/utils/api";

export function SignInPage() {
    const navigate = useNavigate();

    const form = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validate: validateSignInData,
        onSubmit: (data: SignInUser) => {
            createUser(data)
                .then(() => {
                    navigate.to("/auth/login");
                })
                .catch((error: Error) => {
                    console.error("Error creating user:", error);
                });
        },
    });

    return (
        <Container>
            <Logo />

            <Title
                level={5}
                textAlign="center"
                sx={{
                    marginBottom: 4,
                }}
            >
                Sign In
            </Title>

            <Form controller={form}>
                <Stack spacing={2}>
                    <TextField
                        label="First Name"
                        value={form.entity.firstName}
                        onChange={(newValue: string) => form.handleChange("firstName", newValue)}
                        onBlur={(newValue: string) => form.handleBlur("firstName", newValue)}
                        error={form.getError("firstName")}
                    />

                    <TextField
                        label="Last Name"
                        value={form.entity.lastName}
                        onChange={(newValue: string) => form.handleChange("lastName", newValue)}
                        onBlur={(newValue: string) => form.handleBlur("lastName", newValue)}
                        error={form.getError("lastName")}
                    />

                    <TextField
                        label="Email Address"
                        value={form.entity.email}
                        onChange={(newValue: string) => form.handleChange("email", newValue)}
                        onBlur={(newValue: string) => form.handleBlur("email", newValue)}
                        error={form.getError("email")}
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

                    <Button variant="outlined" type="submit">
                        Confirm
                    </Button>
                </Stack>
            </Form>
        </Container>
    );
}
