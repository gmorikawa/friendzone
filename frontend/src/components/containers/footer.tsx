import { Container, type ContainerProps } from "@mui/material";

export interface FooterProps extends ContainerProps { }

export function Footer({ children, ...props }: FooterProps) {
    return (
        <Container component="footer" {...props}>
            {children}
        </Container>
    );
}
