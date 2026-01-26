import type { Session } from "@/features/auth/types/session";

export function authorizationHeader(session: Session): Record<string, string> {
    return {
        "Authorization": `Bearer ${session.token}`,
    };
}
