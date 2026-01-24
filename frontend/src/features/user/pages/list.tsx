import { useState, useEffect, Fragment } from "react";
import { Divider } from "@mui/material";

import { useAlert } from "@/components/feedback/alert";
import { Container } from "@/components/containers/container";
import { Stack } from "@/components/containers/stack";

import type { User } from "@/features/user/types/user";
import { useSession } from "@/features/auth/hooks/session";
import { getUsers } from "@/features/user/utils/api";
import { UserItem } from "@/features/user/components/user-item";

export function UserListPage() {
    const alert = useAlert();
    const session = useSession();
    const [users, setUsers] = useState<User[]>([]);

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
                        <UserItem user={user} />
                        <Divider />
                    </Fragment>
                ))}
            </Stack>
        </Container>
    );
}