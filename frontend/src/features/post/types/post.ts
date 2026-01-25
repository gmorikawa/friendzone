import type { User } from "@/features/user/types/user";

export interface Comment {
    content: string;
    createdBy: User;
    createdAt: Date;
}

export interface Post {
    id: string;
    content: string;
    createdBy: User;

    comments?: Comment[];

    createdAt: Date;
    updatedAt: Date;
}
