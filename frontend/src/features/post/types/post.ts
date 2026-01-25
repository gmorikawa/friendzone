import type { User } from "@/features/user/types/user";

export interface Post {
    id: string;
    content: string;
    createdBy: User;

    createdAt: Date;
    updatedAt: Date;
}
