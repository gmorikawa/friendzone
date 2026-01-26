import type { FriendStatus } from "../types/enum";

export interface FriendStatusMetadata {
    value: FriendStatus;
    label: string;
}

export function getFriendStatusMetadata(): FriendStatusMetadata[] {
    return [
        { value: "CONNECTED", label: "Connected" },
        { value: "SENT", label: "Sent" },
        { value: "REQUESTED", label: "Requested" },
    ];
}
