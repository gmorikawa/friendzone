import { useState, useEffect, Fragment } from "react";

import { useParams } from "@/shared/router/hooks/params";

import { useAlert } from "@/components/feedback/alert";
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
    const alert = useAlert();
    const session = useSession();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        getUserById(session, id)
            .then((fetchedUser: User) => {
                setUser(fetchedUser);
            })
            .catch((_: Error) => {
                alert.showErrorMessage("Failed to load user profile.");
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