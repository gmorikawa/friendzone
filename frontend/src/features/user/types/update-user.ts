import type { Name } from "./name";

export interface UpdateUser {
    name: Name;
    email: string;
    password?: string;
    confirmPassword?: string;
    biography?: string;

    currentPassword: string;
}
