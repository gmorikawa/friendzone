import type { FriendStatus } from "./enum";

export interface Friend {
    id: string;
    status: FriendStatus;
    user: string;
    partner: string;
    createdAt: Date;
    updatedAt: Date;
}