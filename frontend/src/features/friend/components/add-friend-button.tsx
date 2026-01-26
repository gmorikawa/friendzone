import { Button } from "@/components/inputs/button";
import { AddFriendIcon } from "@/shared/icons";

export interface AddFriendButtonProps {
    onClick: () => void;
}

export function AddFriendButton({ onClick }: AddFriendButtonProps) {
    return (
        <Button
            color="primary"
            onClick={onClick}
            startIcon={<AddFriendIcon />}
            size="small"
        >
            Add as Friend
        </Button>
    );
}
