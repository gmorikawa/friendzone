import { useTheme } from "@mui/material";

import { Container, type ContainerProps } from "@/components/containers/container";

export interface StackProps extends ContainerProps {
    spacing?: number;
}

export function Stack({ spacing, children, sx, ...props }: StackProps) {
    const theme = useTheme()

    return (
        <Container
            sx={{
                ...sx,
                display: "flex",
                flexDirection: "column",
                gap: theme.spacing(spacing ?? 0),
            }}
            {...props}
        >
            {children}
        </Container>
    );
}
