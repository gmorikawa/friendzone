import { Name } from "./interfaces/name.interface";

export interface CreateUserDTO {
    name: Name;
    email: string;
    password: string;
}

export interface UpdateUserDTO {
    name: Name;
    email: string;
    password?: string;
    confirmPassword?: string;
    biography?: string;

    currentPassword: string;
}
