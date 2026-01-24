import { Name } from "../interfaces/name.interface";

export interface UpdateUserDTO {
    name: Name;
    email: string;
    password?: string;
    confirmPassword?: string;
    biography?: string;

    currentPassword: string;
}
