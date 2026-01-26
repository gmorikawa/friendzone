import type { Friend } from "@/features/friend/types/friend";
import type { Name } from "./name";

export interface User {
    id: string;
    name: Name;
    email: string;
    status: "active" | "inactive" | "banned";
    biography?: string;

    friendship?: Friend[];

    createdAt: Date;
    updatedAt: Date;
}
