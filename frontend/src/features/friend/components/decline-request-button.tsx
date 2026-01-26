import { Button } from "@/components/inputs/button";
import { DeclineIcon } from "@/shared/icons";

export interface DeclineRequestButtonProps {
    onClick: () => void;
}

export function DeclineRequestButton({ onClick }: DeclineRequestButtonProps) {
    return (
        <Button
            color="error"
            onClick={onClick}
            startIcon={<DeclineIcon />}
            size="small"
        >
            Decline
        </Button>
    );
}
