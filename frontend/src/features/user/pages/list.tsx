import { useState, useEffect, Fragment } from "react";
import { Divider } from "@mui/material";

import type { HttpError } from "@/shared/http/utils/error-handling";
import { useNavigate } from "@/shared/router/hooks/navigate";

import { useAlert } from "@/components/feedback/alert";
import { Container } from "@/components/containers/container"
import { Stack } from "@/components/containers/stack";

import type { User } from "@/features/user/types/user";
import { useSession } from "@/features/auth/hooks/session";
import { getUsers } from "@/features/user/utils/api";
import { UserItem } from "@/features/user/components/user-item";
import { FriendshipActions } from "@/features/friend/components/friendship-actions";
import { useFriendManagement } from "@/features/friend/hooks/friend-management";
import type { Friend } from "@/features/friend/types/friend";
import { Paragraph } from "@/components/typography/paragraph";

export function UserListPage() {
    const navigate = useNavigate();
    const alert = useAlert();
    const session = useSession();

    if (!session.loggedUser) {
        navigate.to("/auth/login");
        return null;
    }

    const loggedUser = session.loggedUser;

    const [users, setUsers] = useState<User[]>([]);

    const refresh = () => {
        getUsers(session)
            .then((fetchedUsers: User[]) => {
                setUsers(fetchedUsers);
            })
            .catch((error: HttpError) => {
                alert.showErrorMessage(error.message);
            });
    };

    const friendManagement = useFriendManagement(() => refresh());

    useEffect(() => {
        refresh();
    }, []);
    return (
        <Container>
            <Stack spacing={1}>
                {users.map((user: User) => (
                    <Fragment key={user.id}>
                        <UserItem
                            user={user}
                            actionSlot={
                                user.id !== loggedUser.id
                                    ? (
                                        <FriendshipActions
                                            user={user}
                                            friend={(user.friendship as unknown as Friend[])?.[0]}
                                            onAddFriend={friendManagement.handleAddFriend}
                                            onAcceptRequest={friendManagement.handleAcceptRequest}
                                            onDeclineRequest={friendManagement.handleDeclineRequest}
                                            onRemoveFriend={friendManagement.handleRemoveFriend}
                                        />
                                    )
                                    : null
                            }
                            contentSlot={
                                <Container>
                                    <Paragraph sx={{ whiteSpace: "pre-wrap" }}>
                                        {user.biography || ""}
                                    </Paragraph>
                                </Container>
                            }
                        />
                        <Divider />
                    </Fragment>
                ))}
            </Stack>
        </Container>
    );
}