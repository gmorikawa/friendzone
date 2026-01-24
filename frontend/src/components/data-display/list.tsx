import {
    List as MuiList,
    ListItemButton,
    ListItemText,
    ListItemIcon
} from "@mui/material";

import type {
    ListProps as MuiListProps,
    ListItemButtonProps
} from "@mui/material";

export interface ListItemProps<Context> extends Omit<ListItemButtonProps, "onClick"> {
    label: string;
    icon?: React.ReactNode;

    context?: Context;
    onClick?: (context?: Context) => void;
}

export function ListItem<Context>({ label, icon, context, onClick, ...props }: ListItemProps<Context>) {
    const handleClick = (_: React.MouseEvent) => {
        if (onClick) {
            onClick(context);
        }
    };

    return (
        <ListItemButton {...props} onClick={handleClick}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={label} />
        </ListItemButton>
    );
}

export interface ListProps extends MuiListProps { }

export function List({ children, ...props }: ListProps) {
    return (
        <MuiList {...props}>
            {children}
        </MuiList>
    );
}
