import { Container } from "@/components/containers/container";
import { Avatar } from "@/components/data-display/avatar";
import { Paragraph } from "@/components/typography/paragraph";

import type { User } from "@/features/user/types/user";
import { buildFullName } from "../utils/name";

export interface UserItemProps {
    user: User;

    hideEmail?: boolean;
}

export function UserItem({ user, hideEmail }: UserItemProps) {
    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
            }}
        >
            <Container sx={{ flexBasis: "auto" }}>
                <Avatar initials={user.name.first.charAt(0) + user.name.last.charAt(0)} />
            </Container>

            <Container>
                <Paragraph size="large">
                    {buildFullName(user)}
                </Paragraph>

                {!hideEmail && (
                    <Paragraph size="small">
                        {user.email}
                    </Paragraph>
                )}
            </Container>
        </Container>
    );
}