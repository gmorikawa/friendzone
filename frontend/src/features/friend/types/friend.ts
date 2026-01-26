import type { User } from "@/features/user/types/user";
import type { FriendStatus } from "./enum";

export interface Friend {
    id: string;
    status: FriendStatus;
    user: string;
    partner: User | string;
    createdAt: Date;
    updatedAt: Date;
}