import { Link as RouterLink } from "react-router-dom";
import { Link, type LinkProps } from "@mui/material";

export interface RoutingLinkProps extends LinkProps {
    src: string;
}

export function RoutingLink({ src, children, ...props }: RoutingLinkProps) {
    return (
        <Link {...props} component={RouterLink} to={src}>
            {children}
        </Link>
    );
}
