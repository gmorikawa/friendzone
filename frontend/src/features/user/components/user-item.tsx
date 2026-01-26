import { Container } from "@/components/containers/container";
import { Avatar } from "@/components/data-display/avatar";
import { Paragraph } from "@/components/typography/paragraph";

import type { User } from "@/features/user/types/user";
import { buildFullName } from "../utils/name";

export interface UserItemProps {
    user: User;

    hideEmail?: boolean;
    contentSlot?: React.ReactNode;

    actionSlot?: React.ReactNode;
}

export function UserItem({ user, hideEmail, contentSlot, actionSlot }: UserItemProps) {
    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
            }}
        >
            <Container sx={{ flexBasis: "auto" }}>
                <Avatar initials={user.name.first.charAt(0) + user.name.last.charAt(0)} />
            </Container>

            <Container>
                <Paragraph size="medium" fontWeight="bold">
                    {buildFullName(user)}
                </Paragraph>

                {!hideEmail && (
                    <Paragraph size="small">
                        {user.email}
                    </Paragraph>
                )}

                {contentSlot && (
                    <Container sx={{ marginTop: 1 }}>
                        {contentSlot}
                    </Container>
                )}
            </Container>

            <Container sx={{ marginLeft: "auto" }}>
                {actionSlot}
            </Container>
        </Container>
    );
}