import z from "zod";

import type { ValidationResult } from "@/shared/form/types/validation-result";
import { validator } from "@/shared/form/utils/validator";

import type { SignInUser } from "@/features/auth/types/sign-in-user";

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

export function validateSignInData(signInUser: Partial<SignInUser>): ValidationResult {
    return validator<SignInUser>(signInValidationSchema, signInUser);
}
