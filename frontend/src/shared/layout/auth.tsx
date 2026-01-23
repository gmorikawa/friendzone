
import { Container } from "@/components/containers/container";
import { OutlinedCard } from "@/components/containers/outlined-card";
import { Outlet } from "react-router-dom";

export function AuthLayout() {
    return (
        <Container
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <OutlinedCard
                sx={{
                    width: "100%",
                    maxWidth: 400,
                    padding: 3
                }}
            >
                <Outlet />
            </OutlinedCard>
        </Container>
    );
}