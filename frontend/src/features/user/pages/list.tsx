import { useState, useEffect, Fragment } from "react";

import { Container } from "@/components/containers/container";
import { Stack } from "@/components/containers/stack";

import type { User } from "@/features/user/types/user";
import { useSession } from "@/features/auth/hooks/session";
import { getUsers } from "@/features/user/utils/api";
import { UserItem } from "@/features/user/components/user-item";
import { Divider } from "@mui/material";

export function UserListPage() {
    const session = useSession();
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        getUsers(session)
            .then((fetchedUsers) => {
                setUsers(fetchedUsers);
            })
            .catch((error) => {
                console.error("Failed to load users:", error);
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