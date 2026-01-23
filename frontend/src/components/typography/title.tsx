import { Typography, type TypographyProps } from "@mui/material";

export interface TitleProps extends Omit<TypographyProps, "variant"> {
    level: 1 | 2 | 3 | 4 | 5 | 6;
}

export function Title({ children, level, ...props }: TitleProps) {

    return (
        <Typography {...props} variant={`h${level}`}>
            {children}
        </Typography>
    );
}
