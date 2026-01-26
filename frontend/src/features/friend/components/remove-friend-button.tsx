import { Button } from "@/components/inputs/button";
import { RemoveFriendIcon } from "@/shared/icons";

export interface RemoveFriendButtonProps {
    onClick: () => void;
}

export function RemoveFriendButton({ onClick }: RemoveFriendButtonProps) {
    return (
        <Button
            color="error"
            onClick={onClick}
            startIcon={<RemoveFriendIcon />}
            size="small"
        >
            Remove Friend
        </Button>
    );
}
