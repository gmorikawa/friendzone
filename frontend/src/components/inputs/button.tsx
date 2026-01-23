import { Button as MuiButton, type ButtonProps as MuiButtonProps } from "@mui/material";

export interface ButtonProps extends Omit<MuiButtonProps, "onClick"> {
    onClick?: () => void;
}

export function Button({ onClick, children, ...props }: ButtonProps) {

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
