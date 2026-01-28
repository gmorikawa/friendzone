import { Container } from "@/components/containers/container";
import { Outlet } from "react-router-dom";

export function BaseLayout() {
    return (
        <Container
            sx={{
                width: "100%",
                height: "100dvh",
            }}
        >
            <Outlet />
        </Container>
    );
}