import type { Name } from "./name";

export interface User {
    id: string;
    name: Name;
    email: string;
    status: "active" | "inactive" | "banned";
    biography?: string;

    createdAt: Date;
    updatedAt: Date;
}
