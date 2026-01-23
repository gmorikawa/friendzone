import { Box, type BoxProps } from "@mui/material";

export interface ContainerProps extends BoxProps { }

export function Container({ children, ...props }: ContainerProps) {
    return (
        <Box {...props}>
            {children}
        </Box>
    );
}
