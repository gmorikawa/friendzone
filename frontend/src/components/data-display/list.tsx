import {
    List as MuiList,
    ListItem as MuiListItem,
    ListItemButton,
    ListItemText,
    ListItemIcon
} from "@mui/material";

import type {
    ListProps as MuiListProps,
    ListItemProps as MuiListItemProps
} from "@mui/material";

export interface ListItemProps<Context> extends Omit<MuiListItemProps, "onClick"> {
    label: string;
    icon?: React.ReactNode;

    context?: Context;
    onClick?: (context?: Context) => void;

    hideText?: boolean;
}

export function ListItem<Context>({ label, icon, context, onClick, hideText, ...props }: ListItemProps<Context>) {
    const handleClick = (_: React.MouseEvent) => {
        if (onClick) {
            onClick(context);
        }
    };

    const paddingX = hideText ? 0 : 2;

    return (
        <MuiListItem disablePadding {...props} onClick={handleClick}>
            <ListItemButton>
                <ListItemIcon sx={{ paddingX }}>{icon}</ListItemIcon>
                {!hideText && <ListItemText primary={label} />}
            </ListItemButton>
        </MuiListItem>
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
