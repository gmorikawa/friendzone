import { Typography, type TypographyProps } from "@mui/material";

export interface ParagraphProps extends Omit<TypographyProps, "variant"> {
    size?: "small" | "medium" | "large";
}

export function Paragraph({ children, size = "medium", ...props }: ParagraphProps) {
    const generateVariant = () => {
        switch (size) {
            case "small":
                return "caption";
            case "large":
                return "body1";
            case "medium":
            default:
                return "body2";
        }
    };

    return (
        <Typography {...props} variant={generateVariant()}>
            {children}
        </Typography>
    );
}
