import { useState, useEffect, Fragment } from "react";

import type { HttpError } from "@/shared/http/utils/error-handling";

import { useAlert } from "@/components/feedback/alert";
import { Container } from "@/components/containers/container";

import type { User } from "@/features/user/types/user";
import { useSession } from "@/features/auth/hooks/session";
import { getUserById } from "@/features/user/utils/api";
import { UserForm } from "@/features/user/components/user-form";

export function UserSettings() {
    const alert = useAlert();
    const session = useSession();

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        getUserById(session, session.loggedUser!.id)
            .then((fetchedUser: User) => {
                setUser(fetchedUser);
            })
            .catch((error: HttpError) => {
                alert.showErrorMessage(error.message);
            });
    }, []);
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