import { Typography, type TypographyProps } from "@mui/material";

export interface ParagraphProps extends Omit<TypographyProps, "variant"> {
    align?: "left" | "center" | "right" | "justify";
}

export function Paragraph({ children, align, ...props }: ParagraphProps) {
    return (
        <Typography {...props} variant="body1">
            {children}
        </Typography>
    );
}
