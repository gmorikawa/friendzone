import { useEffect, useState } from "react";

import { Logo } from "@/shared/logo";
import { useQuery } from "@/shared/router/hooks/query";
import { useNavigate } from "@/shared/router/hooks/navigate";

import { useAlert } from "@/components/feedback/alert";
import { Button } from "@/components/inputs/button";
import { Container } from "@/components/containers/container";
import { Paragraph } from "@/components/typography/paragraph";
import { Stack } from "@/components/containers/stack";
import { Title } from "@/components/typography/title";

import { confirmEmail } from "@/features/auth/utils/api";

type QueryWithToken = { token: string; }
type ConfirmationEmailStatus = "pending" | "confirmed" | "failed";

export function ConfirmEmailPage() {
    const alert = useAlert();
    const navigate = useNavigate();
    const { token } = useQuery<QueryWithToken>();
    const [status, setStatus] = useState<ConfirmationEmailStatus>("pending");

    const handleReturnToLogin = () => {
        navigate.to("/auth/log-in");
    };

    useEffect(() => {
        if (token) {
            confirmEmail(token)
                .then((result: boolean) => {
                    if (result) {
                        setStatus("confirmed");
                    }
                })
                .catch((_: Error) => {
                    setStatus("failed");
                    alert.showErrorMessage("Email confirmation failed. The token may be invalid or expired.");
                });
        }
    }, []);
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
                Confirm Email
            </Title>

            <Stack spacing={2}>
                <Paragraph size="small">
                    {status === "pending" && "Confirming your email, please wait..."}
                    {status === "confirmed" && "Your email has been successfully confirmed. You can now log in to your account."}
                    {status === "failed" && "Email confirmation failed. The token may be invalid or expired."}
                </Paragraph>

                <Button variant="contained" type="button" onClick={handleReturnToLogin}>
                    Return to Log In
                </Button>
            </Stack>
        </Container>
    );
}
