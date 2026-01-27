import { Logo } from "@/shared/logo";
import { useNavigate } from "@/shared/router/hooks/navigate";

import { Button } from "@/components/inputs/button";
import { Container } from "@/components/containers/container";
import { Stack } from "@/components/containers/stack";
import { Title } from "@/components/typography/title";

import { Paragraph } from "@/components/typography/paragraph";

export function SignUpConfirmationPage() {
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
                Sign-up request received
            </Title>

            <Stack spacing={2}>
                <Paragraph size="small">
                    Thank you for signing up! Please check your email to confirm your address and activate your account.
                </Paragraph>

                <Button variant="contained" type="button" onClick={handleReturnToLogin}>
                    Return to Log In
                </Button>
            </Stack>
        </Container>
    );
}
