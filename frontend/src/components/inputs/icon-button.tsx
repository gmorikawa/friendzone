import { IconButton as MuiButton, type IconButtonProps as MuiButtonProps } from "@mui/material";

export interface IconButtonProps extends Omit<MuiButtonProps, "onClick"> {
    onClick?: () => void;
}

export function IconButton({ onClick, children, ...props }: IconButtonProps) {
    const handleClick = (_: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <MuiButton
            onClick={handleClick}
            {...props}
        >
            {children}
        </MuiButton>
    );
}
