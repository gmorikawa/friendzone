import { User } from "../user/user.schema";

export interface Comment {
    content: string;
    createdBy: User | string;
    createdAt: Date;
}
