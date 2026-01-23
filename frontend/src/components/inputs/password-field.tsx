import { TextField as MuiTextField } from "@mui/material";
import { useMemo } from "react";

export interface PasswordFieldProps {
    label?: string;
    value?: string;
    error?: string;

    onChange?: (value: string) => void;
    onBlur?: (value: string) => void;
}

export function PasswordField({ label, value, error, onChange, onBlur }: PasswordFieldProps) {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(event.target.value);
        }
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (onBlur) {
            onBlur(event.target.value);
        }
    };

    return useMemo(
        () => (
            <MuiTextField
                type="password"
                label={label}
                variant="outlined"
                value={value}

                fullWidth
                error={Boolean(error)}
                helperText={error}

                onChange={handleChange}
                onBlur={handleBlur}
            />
        ),
        [value, error]
    );
}
