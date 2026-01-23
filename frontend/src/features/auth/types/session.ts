import type { LoggedUser } from "@/features/user/types/logged-user";
import type { Token } from "@/features/auth/types/token";

export interface Session {
    loggedUser: LoggedUser | null;
    token: Token
};