import { Logo } from "@/shared/logo";
import { useNavigate } from "@/shared/router/hooks/navigate";

import { useForm } from "@/components/inputs/form-controller";
import { useAlert } from "@/components/feedback/alert";
import { Button } from "@/components/inputs/button";
import { Container } from "@/components/containers/container";
import { Form } from "@/components/inputs/form";
import { RoutingLink } from "@/components/navigation/routing-link";
import { Stack } from "@/components/containers/stack";
import { TextField } from "@/components/inputs/text-field";
import { Title } from "@/components/typography/title";

import type { PasswordResetRequest } from "@/features/auth/types/password-reset-request";
import { validatePasswordResetData } from "@/features/auth/utils/validation";
import { requestPasswordReset } from "@/features/auth/utils/api";
import { Paragraph } from "@/components/typography/paragraph";

export function PasswordResetPage() {
    const alert = useAlert();
    const navigate = useNavigate();

    const form = useForm<PasswordResetRequest>({
        defaultValues: {
            email: "",
        },
        validate: validatePasswordResetData,
        onSubmit: (data: PasswordResetRequest) => {
            requestPasswordReset(data)
                .then(() => {
                    navigate.to("/auth/password-reset/confirmation");
                })
                .catch((_: Error) => {
                    alert.showErrorMessage("Failed to send password reset request. Please try again later.");
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
                Request Password Reset
            </Title>

            <Form controller={form}>
                <Stack spacing={2}>
                    <Paragraph size="small">
                        Enter your email address below and we will send you instructions to reset your password.
                    </Paragraph>

                    <TextField
                        label="Email Address"
                        value={form.entity.email}
                        onChange={(newValue: string) => form.handleChange("email", newValue)}
                        onBlur={(newValue: string) => form.handleBlur("email", newValue)}
                        error={form.getError("email")}
                    />

                    <Button variant="contained" type="submit">
                        Send Request
                    </Button>

                    <Container sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <RoutingLink src="/auth/log-in">
                            Remembered your password? Log In
                        </RoutingLink>
                    </Container>
                </Stack>
            </Form>
        </Container>
    );
}
