import { Container } from "@/components/containers/container";

import type { User } from "@/features/user/types/user";
import type { Friend } from "../types/friend";
import { AddFriendButton } from "./add-friend-button";
import { AcceptRequestButton } from "./accept-request-button";
import { DeclineRequestButton } from "./decline-request-button";
import { RemoveFriendButton } from "./remove-friend-button";

export interface FriendshipActionsProps {
    user: User;
    friend: Friend | null;

    onAddFriend?: (userId: string) => void;
    onAcceptRequest?: (userId: string) => void;
    onDeclineRequest?: (userId: string) => void;
    onRemoveFriend?: (userId: string) => void;
}

export function FriendshipActions({ user, friend, onAddFriend, onAcceptRequest, onDeclineRequest, onRemoveFriend }: FriendshipActionsProps) {
    const handleAddFriend = () => {
        if (onAddFriend) {
            onAddFriend(user.id);
        }
    };

    const handleAcceptRequest = () => {
        if (onAcceptRequest) {
            onAcceptRequest(user.id);
        }
    };

    const handleDeclineRequest = () => {
        if (onDeclineRequest) {
            onDeclineRequest(user.id);
        }
    };

    const handleRemoveFriend = () => {
        if (onRemoveFriend) {
            onRemoveFriend(user.id);
        }
    };

    if (friend) {
        if (friend.status === "CONNECTED") {
            return (
                <RemoveFriendButton onClick={handleRemoveFriend} />
            );
        }

        if (friend.status === "SENT") {
            return <span>Request Sent</span>;
        }

        if (friend.status === "REQUESTED") {
            return (
                <Container sx={{ display: "flex", gap: 1 }}>
                    <AcceptRequestButton onClick={handleAcceptRequest} />
                    <DeclineRequestButton onClick={handleDeclineRequest} />
                </Container>
            );
        }
    } else {
        return (
            <AddFriendButton onClick={handleAddFriend} />
        );
    }
}
