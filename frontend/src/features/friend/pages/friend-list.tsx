import { useEffect, useState } from "react";

import { useAlert } from "@/components/feedback/alert";
import { useTab } from "@/components/navigation/tab-controller";
import { Container } from "@/components/containers/container";
import { Stack } from "@/components/containers/stack";
import { TabNavigation } from "@/components/navigation/tab-navigation";

import type { User } from "@/features/user/types/user";
import type { Friend } from "@/features/friend/types/friend";
import type { FriendStatus } from "@/features/friend/types/enum";
import { useSession } from "@/features/auth/hooks/session";
import { getFriendStatusMetadata } from "@/features/friend/utils/enum";
import { getFriendsByStatus } from "@/features/friend/utils/api";
import { UserItem } from "@/features/user/components/user-item";
import { FriendshipActions } from "@/features/friend/components/friendship-actions";
import { useFriendManagement } from "@/features/friend/hooks/friend-management";

export function FriendListPage() {
    const [friends, setFriends] = useState<Friend[]>([]);

    const alert = useAlert();
    const session = useSession();
    const friendManagement = useFriendManagement(() => {
        getFriendsByStatus(session, session.loggedUser!.id, tabs.value)
            .then((friends: Friend[]) => {
                setFriends(friends);
            })
            .catch((_: Error) => {
                alert.showErrorMessage("Failed to load friends.");
            });
    });

    const tabs = useTab<FriendStatus>(
        "CONNECTED",
        (newValue: FriendStatus) => {
            getFriendsByStatus(session, session.loggedUser!.id, newValue)
                .then((friends: Friend[]) => {
                    setFriends(friends);
                })
                .catch((_: Error) => {
                    alert.showErrorMessage("Failed to load friends.");
                });
        }
    );

    useEffect(() => {
        getFriendsByStatus(session, session.loggedUser!.id, tabs.value)
            .then((friends: Friend[]) => {
                setFriends(friends);
            });
    }, []);

    return (
        <Container>
            <TabNavigation
                value={tabs.value}
                tabs={getFriendStatusMetadata()}
                onChange={tabs.handleChange}
            />

            <Stack spacing={2} mt={2}>
                {friends.map((friend) => (
                    <UserItem
                        key={friend.id}
                        user={friend.partner as User}
                        actionSlot={
                            <FriendshipActions
                                user={friend.partner as User}
                                friend={friend}
                                onAddFriend={friendManagement.handleAddFriend}
                                onAcceptRequest={friendManagement.handleAcceptRequest}
                                onDeclineRequest={friendManagement.handleDeclineRequest}
                                onRemoveFriend={friendManagement.handleRemoveFriend}
                            />}
                        />
                ))}
            </Stack>
        </Container>
    );
}
