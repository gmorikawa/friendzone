import { Button } from "@/components/inputs/button";
import { AcceptIcon } from "@/shared/icons";

export interface AcceptRequestButtonProps {
    onClick: () => void;
}

export function AcceptRequestButton({ onClick }: AcceptRequestButtonProps) {
    return (
        <Button
            color="success"
            onClick={onClick}
            startIcon={<AcceptIcon />}
            size="small"
        >
            Accept
        </Button>
    );
}
