import { useMemo } from "react";

import { TextField as MuiTextField } from "@mui/material";

export interface TextareaFieldProps {
    label?: string;
    value?: string;
    error?: string;

    rows?: number;
    minRows?: number;
    maxRows?: number;

    onChange?: (value: string) => void;
    onBlur?: (value: string) => void;
}

export function TextareaField({
    label,
    value,
    error,
    rows,
    minRows,
    maxRows,
    onChange,
    onBlur
}: TextareaFieldProps) {

    const handleChange =
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (onChange) {
                onChange(event.target.value);
            }
        };

    const handleBlur =
        (event: React.FocusEvent<HTMLInputElement>) => {
            if (onBlur) {
                onBlur(event.target.value);
            }
        };

    return useMemo(
        () => (
            <MuiTextField
                label={label}
                variant="outlined"
                value={value}

                rows={rows}
                minRows={minRows}
                maxRows={maxRows}

                multiline
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
