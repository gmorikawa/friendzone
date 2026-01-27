
import { Outlet } from "react-router-dom";

import { Container } from "@/components/containers/container";
import { Logo } from "@/shared/logo";
import { AppMenu, FooterAppMenu } from "./app-menu";
import { Stack } from "@/components/containers/stack";

export function AppLayout() {
    return (
        <Container
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    height: "100%",
                    width: "100%",
                }}
            >
                <AppMenu />

                <Stack sx={{ flexGrow: 1 }}>
                    <Logo />
                    <Container
                        sx={{
                            flexGrow: 1,
                            padding: 2,
                            overflowX: "auto",
                        }}
                    >
                        <Outlet />
                    </Container>

                    <Container sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <FooterAppMenu />
                    </Container>
                </Stack>
            </Container>
        </Container>
    );
}