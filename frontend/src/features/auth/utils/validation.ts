import z from "zod";

import type { ValidationResult } from "@/shared/form/types/validation-result";
import { validateData } from "@/shared/form/utils/validator";

import type { SignUpUser } from "@/features/auth/types/sign-up-user";
import type { LogInCredentials } from "@/features/auth/types/log-in-credentials";
import type { PasswordResetRequest } from "@/features/auth/types/password-reset-request";
import type { PasswordRecovery } from "@/features/auth/types/password-recovery";
import {
    userConfirmPasswordValidation,
    userEmailValidation,
    userFirstNameValidation,
    userLastNameValidation,
    userPasswordValidation
} from "@/features/user/utils/validation";

export function validateSignInData(signInUser: Partial<SignUpUser>): ValidationResult {
    const signInValidationSchema = z.object({
        firstName: userFirstNameValidation,
        lastName: userLastNameValidation,
        email: userEmailValidation,
        password: userPasswordValidation,
        confirmPassword: userConfirmPasswordValidation,
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

    return validateData<SignUpUser>(signInValidationSchema, signInUser);
}

export function validateLogInData(logInCredentials: Partial<LogInCredentials>): ValidationResult {
    const logInValidationSchema = z.object({
        email: userEmailValidation,
        password: userPasswordValidation,
    });

    return validateData<LogInCredentials>(logInValidationSchema, logInCredentials);
}

export function validatePasswordResetData(passwordResetRequest: Partial<PasswordResetRequest>): ValidationResult {
    const passwordResetValidationSchema = z.object({
        email: userEmailValidation,
    });

    return validateData<PasswordResetRequest>(passwordResetValidationSchema, passwordResetRequest);
}

export function validatePasswordRecoveryData(passwordRecovery: Partial<PasswordRecovery>): ValidationResult {
    const passwordRecoveryValidationSchema = z.object({
        password: userPasswordValidation,
        confirmPassword: userConfirmPasswordValidation,
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

    return validateData<PasswordRecovery>(passwordRecoveryValidationSchema, passwordRecovery);
}
