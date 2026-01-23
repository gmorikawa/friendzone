import type { Name } from "./name";

export interface CreateUser {
    name: Name;
    email: string;
    password: string;
}