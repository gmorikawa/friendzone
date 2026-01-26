import {
    AcceptIcon,
    AddFriendIcon,
    DeclineIcon,
    RemoveFriendIcon
} from "@/shared/icons";

import { Container } from "@/components/containers/container";
import { IconButton } from "@/components/inputs/icon-button";

import type { User } from "@/features/user/types/user";
import type { Friend } from "../types/friend";

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
                <IconButton
                    color="error"
                    onClick={handleRemoveFriend}>
                    <RemoveFriendIcon />
                </IconButton>
            );
        }

        if (friend.status === "SENT") {
            return <span>Request Sent</span>;
        }

        if (friend.status === "REQUESTED") {
            return (
                <Container sx={{ display: "flex", gap: 1 }}>
                    <IconButton
                        color="success"
                        onClick={handleAcceptRequest}>
                        <AcceptIcon />
                    </IconButton>

                    <IconButton
                        color="error"
                        onClick={handleDeclineRequest}>
                        <DeclineIcon />
                    </IconButton>
                </Container>
            );
        }
    } else {
        return (
            <IconButton
                color="primary"
                onClick={handleAddFriend}>
                <AddFriendIcon />
            </IconButton>
        );
    }
}
