import { createContext, useContext, useState } from "react";

import { Snackbar, Alert as MuiAlert } from "@mui/material";

type Severity = "error" | "warning" | "info" | "success";

export interface AlertController {
    showMessage: (message: string, severity?: Severity) => void;
    hideMessage: () => void;
    showSuccessMessage: (message: string) => void;
    showErrorMessage: (message: string) => void;
}

export function useAlert(): AlertController {
    const alertContext = useContext(AlertContext);

    if (!alertContext) {
        throw new Error("useAlert must be used within an AlertProvider");
    }

    return {
        showMessage: alertContext.showMessage,
        hideMessage: alertContext.hideMessage,
        showSuccessMessage: alertContext.showSuccessMessage,
        showErrorMessage: alertContext.showMessage,
    };
}

const AlertContext = createContext<AlertController | null>(null);

export interface AlertProviderProps extends React.PropsWithChildren { }

export function AlertProvider({ children }: AlertProviderProps) {
    const [severity, setSeverity] = useState<Severity>("info");
    const [message, setMessage] = useState<string | null>(null);
    const [open, setOpen] = useState(false);

    const showMessage = (msg: string, sev: Severity = "info") => {
        setSeverity(sev);
        setMessage(msg);
        setOpen(true);
    };

    const hideMessage = () => {
        setMessage(null);
        setOpen(false);
    };

    const showSuccessMessage = (msg: string) => showMessage(msg, "success");
    const showErrorMessage = (msg: string) => showMessage(msg, "error");

    return (
        <AlertContext.Provider value={{ showMessage, hideMessage, showSuccessMessage, showErrorMessage }}>
            <Alert open={open} message={message} onClose={hideMessage} severity={severity} />
            {children}
        </AlertContext.Provider>
    );
}

export interface AlertProps {
    open: boolean;
    message: string | null;
    onClose: () => void;
    severity: Severity;
}

export function Alert({ open, message, onClose, severity = "info" }: AlertProps) {
    return (
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={open}
            onClose={onClose}
            autoHideDuration={5000}
        >
            <MuiAlert
                onClose={onClose}
                severity={severity}
                sx={{ width: '100%' }}
            >
                {message}
            </MuiAlert>
        </Snackbar>
    );
}
