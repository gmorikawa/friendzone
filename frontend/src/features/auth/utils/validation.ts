import z from "zod";

import type { ValidationResult } from "@/shared/form/types/validation-result";
import { validateData } from "@/shared/form/utils/validator";

import type { SignUpUser } from "@/features/auth/types/sign-up-user";
import type { LogInCredentials } from "@/features/auth/types/log-in-credentials";
import type { PasswordResetRequest } from "@/features/auth/types/password-reset-request";
import type { PasswordRecovery } from "@/features/auth/types/password-recovery";

export function validateSignInData(signInUser: Partial<SignUpUser>): ValidationResult {
    const signInValidationSchema = z.object({
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        email: z.email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

    return validateData<SignUpUser>(signInValidationSchema, signInUser);
}

export function validateLogInData(logInCredentials: Partial<LogInCredentials>): ValidationResult {
    const logInValidationSchema = z.object({
        email: z.email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters"),
    });

    return validateData<LogInCredentials>(logInValidationSchema, logInCredentials);
}

export function validatePasswordResetData(passwordResetRequest: Partial<PasswordResetRequest>): ValidationResult {
    const passwordResetValidationSchema = z.object({
        email: z.email("Invalid email address"),
    });

    return validateData<PasswordResetRequest>(passwordResetValidationSchema, passwordResetRequest);
}

export function validatePasswordRecoveryData(passwordRecovery: Partial<PasswordRecovery>): ValidationResult {
    const passwordRecoveryValidationSchema = z.object({
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

    return validateData<PasswordRecovery>(passwordRecoveryValidationSchema, passwordRecovery);
}
