import { useNavigate } from "@/shared/router/hooks/navigate";
import {
    FeedIcon,
    FriendsIcon,
    LogoutIcon,
    SettingsIcon,
    UsersIcon,
    WritePostIcon
} from "@/shared/icons";

import { Container } from "@/components/containers/container";
import { List, ListItem } from "@/components/data-display/list";

import { useSession } from "@/features/auth/hooks/session";
import { IconButton } from "@/components/inputs/icon-button";

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
                height: "100%",
                flexBasis: "auto",
                backgroundColor: "primary.light",

                display: { xs: "none", sm: "flex" },
                flexDirection: "column",
                justifyContent: "space-between",

            }}
        >
            <List>
                <ListItem label="Users" icon={<UsersIcon />} context="/app/users" onClick={handleNavigate} />
                <ListItem label="Feed" icon={<FeedIcon />} context="/app/feed" onClick={handleNavigate} />
                <ListItem label="Create Post" icon={<WritePostIcon />} context="/app/posts" onClick={handleNavigate} />
                <ListItem label="Friends" icon={<FriendsIcon />} context="/app/friends" onClick={handleNavigate} />
            </List>

            <Container>
                <List>
                    <ListItem label="Settings" icon={<SettingsIcon />} context="/app/settings" onClick={handleNavigate} />
                    <ListItem label="Logout" icon={<LogoutIcon />} onClick={handleLogout} />
                </List>
            </Container>
        </Container>
    );
}

export function FooterAppMenu() {
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
        <List
            sx={{
                width: "100%",
                flexBasis: "auto",
                backgroundColor: "primary.light",

                display: { xs: "flex", sm: "none" },
                flexDirection: "row",
                justifyContent: "space-around",
            }}
        >
            <IconButton onClick={() => handleNavigate("/app/users")}><UsersIcon/></IconButton>
            <IconButton onClick={() => handleNavigate("/app/feed")}><FeedIcon /></IconButton>
            <IconButton onClick={() => handleNavigate("/app/posts")}><WritePostIcon /></IconButton>
            <IconButton onClick={() => handleNavigate("/app/friends")}><FriendsIcon /></IconButton>
            <IconButton onClick={() => handleNavigate("/app/settings")}><SettingsIcon /></IconButton>
            <IconButton onClick={handleLogout}><LogoutIcon /></IconButton>
        </List>
    );
}
