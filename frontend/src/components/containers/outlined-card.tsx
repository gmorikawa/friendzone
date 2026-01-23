import { Card, type CardProps } from "@mui/material";

export interface OutlinedCardProps extends Omit<CardProps, "variant"> {
}

export function OutlinedCard({ children, ...props }: OutlinedCardProps) {
    return (
        <Card {...props} variant="outlined">
            {children}
        </Card>
    );
}
