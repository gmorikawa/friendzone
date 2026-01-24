import { Logo } from "@/shared/logo";
import { useNavigate } from "@/shared/router/hooks/navigate";

import { Button } from "@/components/inputs/button";
import { Container } from "@/components/containers/container";
import { Stack } from "@/components/containers/stack";
import { Title } from "@/components/typography/title";

import { Paragraph } from "@/components/typography/paragraph";

export function PasswordRecoveryConfirmationPage() {
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
                Password Reset Success
            </Title>

            <Stack spacing={2}>
                <Paragraph size="small">
                    Your password has been successfully reset. You can now log in with your new password.
                </Paragraph>

                <Button variant="contained" type="button" onClick={handleReturnToLogin}>
                    Return to Log In
                </Button>
            </Stack>
        </Container>
    );
}
