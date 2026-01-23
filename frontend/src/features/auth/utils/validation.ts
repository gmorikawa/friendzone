import z from "zod";

import type { ValidationResult } from "@/shared/form/types/validation-result";
import { validateData } from "@/shared/form/utils/validator";

import type { SignUpUser } from "@/features/auth/types/sign-up-user";
import type { LogInCredentials } from "@/features/auth/types/log-in-credentials";

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

const logInValidationSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export function validateSignInData(signInUser: Partial<SignUpUser>): ValidationResult {
    return validateData<SignUpUser>(signInValidationSchema, signInUser);
}

export function validateLogInData(logInCredentials: Partial<LogInCredentials>): ValidationResult {
    return validateData<LogInCredentials>(logInValidationSchema, logInCredentials);
}
