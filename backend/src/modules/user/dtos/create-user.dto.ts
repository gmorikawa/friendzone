import { Name } from "../interfaces/name.interface";

export interface CreateUserDTO {
    name: Name;
    email: string;
    password: string;
}
