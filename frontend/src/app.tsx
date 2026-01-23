import { RouteProvider } from "@/config/routes";
import { UserSessionProvider } from "@/features/auth/components/user-session-provider";

export function App() {
    return (
        <UserSessionProvider>
            <RouteProvider />
        </UserSessionProvider>
    );
}
