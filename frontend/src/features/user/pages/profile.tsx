import { useState, useEffect, Fragment } from "react";

import useParams from "@/shared/router/hooks/params";

import { Container } from "@/components/containers/container";

import type { User } from "@/features/user/types/user";
import { useSession } from "@/features/auth/hooks/session";
import { getUserById } from "@/features/user/utils/api";
import { UserForm } from "@/features/user/components/user-form";

type ParamsWithId = {
    id: string;
};

export function UserProfile() {
    const { id } = useParams<ParamsWithId>();
    const session = useSession();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        getUserById(session, id)
            .then((fetchedUser: User) => {
                setUser(fetchedUser);
            })
            .catch((error) => {
                console.error("Failed to load users:", error);
            });
    }, [id]);
    return (
        <Container>
            {user ? (
                <UserForm user={user} />
            ) : (
                <Fragment>Loading user profile...</Fragment>
            )}
        </Container>
    );
}