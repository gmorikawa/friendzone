import { Logo } from "@/shared/logo";
import { useNavigate } from "@/shared/router/hooks/navigate";

import { Button } from "@/components/inputs/button";
import { Container } from "@/components/containers/container";
import { Stack } from "@/components/containers/stack";
import { Title } from "@/components/typography/title";

import { Paragraph } from "@/components/typography/paragraph";

export function PasswordResetConfirmationPage() {
    const navigate = useNavigate();

    const handleReturnToLogin = () => {
        navigate.to("/auth/log-in");
    };

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
                Password Reset Requested
            </Title>

            <Stack spacing={2}>
                <Paragraph size="small">
                    Your request was received. If an account with the provided email exists, you will receive a email with instructions to reset your password.
                </Paragraph>

                <Button variant="contained" type="button" onClick={handleReturnToLogin}>
                    Return to Log In
                </Button>
            </Stack>
        </Container>
    );
}
