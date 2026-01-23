import { Container, type ContainerProps } from "@mui/material";

export interface HeaderProps extends ContainerProps { }

export function Header({ children, ...props }: HeaderProps) {
    return (
        <Container component="header" {...props}>
            {children}
        </Container>
    );
}
