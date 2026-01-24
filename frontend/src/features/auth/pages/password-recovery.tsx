import { Logo } from "@/shared/logo";
import { useNavigate } from "@/shared/router/hooks/navigate";
import { useQuery } from "@/shared/router/hooks/query";

import { Button } from "@/components/inputs/button";
import { Container } from "@/components/containers/container";
import { Form } from "@/components/inputs/form";
import { PasswordField } from "@/components/inputs/password-field";
import { RoutingLink } from "@/components/navigation/routing-link";
import { Stack } from "@/components/containers/stack";
import { Title } from "@/components/typography/title";
import { useForm } from "@/components/inputs/form-controller";

import type { PasswordRecovery } from "@/features/auth/types/password-recovery";
import { validatePasswordRecoveryData } from "@/features/auth/utils/validation";
import { resetPassword } from "@/features/auth/utils/api";

type QueryWithToken = { token: string; }

export function PasswordRecoveryPage() {
    const { token } = useQuery<QueryWithToken>();
    const navigate = useNavigate();

    const form = useForm<PasswordRecovery>({
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
        validate: validatePasswordRecoveryData,
        onSubmit: (data: PasswordRecovery) => {
            resetPassword(token, data)
                .then(() => {
                    navigate.to("/auth/password-recovery/confirmation");
                })
                .catch((error: Error) => {
                    console.error("Error resetting password:", error);
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
                Recover Password
            </Title>

            <Form controller={form}>
                <Stack spacing={2}>
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

                    <Button variant="contained" type="submit">
                        Reset Password
                    </Button>

                    <Container sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <RoutingLink src="/auth/log-in">
                            Already have an account? Log In
                        </RoutingLink>
                    </Container>
                </Stack>
            </Form>
        </Container>
    );
}
