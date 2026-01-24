import { useEffect, useState } from "react";

import { Logo } from "@/shared/logo";
import { useQuery } from "@/shared/router/hooks/query";

import { Container } from "@/components/containers/container";
import { Paragraph } from "@/components/typography/paragraph";
import { Title } from "@/components/typography/title";

import { confirmEmail } from "@/features/auth/utils/api";

type QueryWithToken = { token: string; }
type ConfirmationEmailStatus = "pending" | "confirmed" | "failed";

export function ConfirmEmailPage() {
    const { token } = useQuery<QueryWithToken>();
    const [status, setStatus] = useState<ConfirmationEmailStatus>("pending");

    useEffect(() => {
        if (token) {
            console.log("Confirming email with token:", token);

            confirmEmail(token)
                .then((result: boolean) => {
                    if (result) {
                        setStatus("confirmed");
                    }
                })
                .catch((_: Error) => {
                    setStatus("failed");
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

            <Paragraph>
                {status === "pending" && "Confirming your email, please wait..."}
                {status === "confirmed" && "Your email has been successfully confirmed. You can now log in to your account."}
                {status === "failed" && "Email confirmation failed. The token may be invalid or expired."}
            </Paragraph>
        </Container>
    );
}
