import type { Name } from "./name";

export interface User {
    id: string;
    name: Name;
    email: string;
    status: "active" | "inactive" | "banned";

    createdAt: Date;
    updatedAt: Date;
}
