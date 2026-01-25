import { User } from "../user/user.schema";

export interface CreatePostDTO {
    content: string;
    createdBy: string;
}

export interface UpdatePostDTO {
    content: string;
}