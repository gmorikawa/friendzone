import { Logo } from "@/shared/logo";
import { useNavigate } from "@/shared/router/hooks/navigate";

import { Button } from "@/components/inputs/button";
import { Container } from "@/components/containers/container";
import { Form } from "@/components/inputs/form";
import { PasswordField } from "@/components/inputs/password-field";
import { RoutingLink } from "@/components/navigation/routing-link";
import { Stack } from "@/components/containers/stack";
import { TextField } from "@/components/inputs/text-field";
import { Title } from "@/components/typography/title";
import { useForm } from "@/components/inputs/form-controller";
import { useAlert } from "@/components/feedback/alert";

import type { LogInCredentials } from "@/features/auth/types/log-in-credentials";
import type { Session } from "@/features/auth/types/session";
import { validateLogInData } from "@/features/auth/utils/validation";
import { logIn } from "@/features/auth/utils/api";
import { useSession } from "@/features/auth/hooks/session";

export function LogInPage() {
    const alert = useAlert();
    const navigate = useNavigate();
    const session = useSession();

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        validate: validateLogInData,
        onSubmit: (data: LogInCredentials) => {
            logIn(data)
                .then(({ token, loggedUser }: Session) => {
                    if (!loggedUser) {
                        throw new Error("Logged user data is missing");
                    }

                    if (!token) {
                        throw new Error("Token data is missing");
                    }

                    session.update(token, loggedUser);
                    navigate.to("/app/users");
                })
                .catch((error: Error) => {
                    alert.showErrorMessage(error.message);
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
                Log In
            </Title>

            <Form controller={form}>
                <Stack spacing={2}>
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

                    <Container sx={{ display: "flex", justifyContent: "center" }}>
                        <Button variant="contained" type="submit">
                            Sign In
                        </Button>
                    </Container>

                    <Stack spacing={1}>
                        <Container sx={{ display: "flex", justifyContent: "flex-end" }}>
                            <RoutingLink src="/auth/sign-up">
                                Do not have an account? Sign Up
                            </RoutingLink>
                        </Container>

                        <Container sx={{ display: "flex", justifyContent: "flex-end" }}>
                            <RoutingLink src="/auth/password-reset">
                                Forgot your password? Reset Password
                            </RoutingLink>
                        </Container>
                    </Stack>
                </Stack>
            </Form>
        </Container>
    );
}
