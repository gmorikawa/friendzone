import { useNavigate } from "@/shared/router/hooks/navigate";
import {
    FeedIcon,
    FriendsIcon,
    LogoutIcon,
    ProfileIcon,
    UsersIcon
} from "@/shared/icons";

import { Container } from "@/components/containers/container";
import { List, ListItem } from "@/components/data-display/list";

import { useSession } from "@/features/auth/hooks/session";

export function AppMenu() {
    const navigate = useNavigate();
    const session = useSession();

    const handleLogout = () => {
        session.reset();
        navigate.to("/auth/log-in");
    };

    const handleNavigate = (path?: string) => {
        if (!path) return;
        navigate.to(path);
    };

    return (
        <Container
            sx={{
                flexBasis: { xs: "150px", md: "200px", lg: "250px" },
                flexShrink: 0,
                backgroundColor: "primary.light",
                padding: 1,

                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
            }}
        >
            <List>
                <ListItem label="Users" icon={<UsersIcon />} context="/app/users" onClick={handleNavigate} />
                <ListItem label="Feed" icon={<FeedIcon />} context="/app/feed" onClick={handleNavigate} />
                <ListItem label="Friends" icon={<FriendsIcon />} context="/app/friends" onClick={handleNavigate} />
            </List>

            <Container>
                <List>
                    <ListItem label="Profile" icon={<ProfileIcon />} context="/app/profile" onClick={handleNavigate} />
                    <ListItem label="Logout" icon={<LogoutIcon />} onClick={handleLogout} />
                </List>
            </Container>
        </Container>
    );
}
