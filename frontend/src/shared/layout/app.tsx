
import { Outlet } from "react-router-dom";

import { Container } from "@/components/containers/container";
import { OutlinedCard } from "@/components/containers/outlined-card";
import { Logo } from "@/shared/logo";
import { AppMenu } from "./app-menu";

export function AppLayout() {
    return (
        <Container
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: { xs: 0, md: 4, lg: 8 },
            }}
        >
            <Logo />

            <OutlinedCard
                sx={{
                    height: "100%",
                    width: "100%",
                }}
            >
                <Container
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        height: "100%"
                    }}
                >
                    <AppMenu />

                    <Container
                        sx={{
                            flexGrow: 1,
                            padding: 2,
                            overflowX: "auto",
                        }}
                    >
                        <Outlet />
                    </Container>
                </Container>
            </OutlinedCard>
        </Container>
    );
}