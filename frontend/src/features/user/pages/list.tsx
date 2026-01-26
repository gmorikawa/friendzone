import { useState, useEffect, Fragment } from "react";
import { Divider } from "@mui/material";

import {
    AcceptIcon,
    AddFriendIcon,
    DeclineIcon,
    RemoveFriendIcon
} from "@/shared/icons";

import { useAlert } from "@/components/feedback/alert";
import { Container } from "@/components/containers/container";
import { IconButton } from "@/components/inputs/icon-button";
import { Stack } from "@/components/containers/stack";

import type { User } from "@/features/user/types/user";
import { useSession } from "@/features/auth/hooks/session";
import { getUsers } from "@/features/user/utils/api";
import { UserItem } from "@/features/user/components/user-item";
import {
    acceptFriendship,
    declineFriendship,
    removeFriendship,
    requestFriendship
} from "@/features/friend/utils/api";

interface FriendshipActionsProps {
    user: User;

    onAddFriend?: (userId: string) => void;
    onAcceptRequest?: (userId: string) => void;
    onDeclineRequest?: (userId: string) => void;
    onRemoveFriend?: (userId: string) => void;
}

function FriendshipActions({ user, onAddFriend, onAcceptRequest, onDeclineRequest, onRemoveFriend }: FriendshipActionsProps) {
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

    if (user.friendship && user.friendship?.length > 0) {
        const friendship = user.friendship[0];

        if (friendship.status === "CONNECTED") {
            return (
                <IconButton
                    color="error"
                    onClick={handleRemoveFriend}>
                    <RemoveFriendIcon />
                </IconButton>
            );
        }

        if (friendship.status === "SENT") {
            return <span>Request Sent</span>;
        }

        if (friendship.status === "REQUESTED") {
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

export function UserListPage() {
    const alert = useAlert();
    const session = useSession();
    const [users, setUsers] = useState<User[]>([]);

    const handleAddFriend = (userId: string) => {
        if (!session.loggedUser) {
            alert.showErrorMessage("You must be logged in to send friend requests.");
            return;
        }

        requestFriendship(session, session.loggedUser.id, userId)
            .then((success: boolean) => {
                if (success) {
                    alert.showSuccessMessage("Friend request sent successfully.");
                } else {
                    alert.showErrorMessage("Failed to send friend request.");
                }
            })
            .catch((_: Error) => {
                alert.showErrorMessage("An error occurred while sending friend request.");
            });
    };

    const handleAcceptRequest = (userId: string) => {
        acceptFriendship(session, session.loggedUser!.id, userId)
            .then((success: boolean) => {
                if (success) {
                    alert.showSuccessMessage("Friend request accepted successfully.");
                } else {
                    alert.showErrorMessage("Failed to accept friend request.");
                }
            })
            .catch((_: Error) => {
                alert.showErrorMessage("An error occurred while accepting friend request.");
            });
    };

    const handleDeclineRequest = (userId: string) => {
        declineFriendship(session, session.loggedUser!.id, userId)
            .then((success: boolean) => {
                if (success) {
                    alert.showSuccessMessage("Friend request declined successfully.");
                } else {
                    alert.showErrorMessage("Failed to decline friend request.");
                }
            })
            .catch((_: Error) => {
                alert.showErrorMessage("An error occurred while declining friend request.");
            });
    };

    const handleRemoveFriend = (userId: string) => {
        removeFriendship(session, session.loggedUser!.id, userId)
            .then((success: boolean) => {
                if (success) {
                    alert.showSuccessMessage("Friend removed successfully.");
                } else {
                    alert.showErrorMessage("Failed to remove friend.");
                }
            })
            .catch((_: Error) => {
                alert.showErrorMessage("An error occurred while removing friend.");
            });
    };

    useEffect(() => {
        getUsers(session)
            .then((fetchedUsers: User[]) => {
                setUsers(fetchedUsers);
            })
            .catch((_: Error) => {
                alert.showErrorMessage("Failed to load users.");
            });
    }, []);
    return (
        <Container>
            <Stack spacing={1}>
                {users.map((user: User) => (
                    <Fragment key={user.id}>
                        <UserItem
                            user={user}
                            actionSlot={(
                                <FriendshipActions
                                    user={user}
                                    onAddFriend={handleAddFriend}
                                    onAcceptRequest={handleAcceptRequest}
                                    onDeclineRequest={handleDeclineRequest}
                                    onRemoveFriend={handleRemoveFriend}
                                />
                            )}
                        />
                        <Divider />
                    </Fragment>
                ))}
            </Stack>
        </Container>
    );
}