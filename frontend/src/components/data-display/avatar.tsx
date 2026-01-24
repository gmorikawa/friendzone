import { Avatar as MuiAvatar } from "@mui/material";

export interface AvatarProps {
    initials: string;
}

export function Avatar({ initials }: AvatarProps) {
    return (
        <MuiAvatar>
            {initials}
        </MuiAvatar>
    );
}
