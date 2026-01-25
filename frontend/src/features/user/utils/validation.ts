import z from "zod";

import type { ValidationResult } from "@/shared/form/types/validation-result";
import { validateData } from "@/shared/form/utils/validator";

import type { UpdateUser } from "@/features/user/types/update-user";

export const userFirstNameValidation = z.string().min(1, "First name is required");
export const userLastNameValidation = z.string().min(1, "Last name is required");
export const userNameValidation = z.object({
    first: userFirstNameValidation,
    last: userLastNameValidation,
});
export const userEmailValidation = z.email("Invalid email address");
export const userPasswordValidation = z.string().min(6, "Password must be at least 6 characters");
export const userConfirmPasswordValidation = z.string().min(6, "Confirm password must be at least 6 characters");
export const userCurrentPasswordValidation = z.string().min(6, "Current password is required");
export const userBiographyValidation = z.string().max(255, "Bio must be at most 255 characters").optional();

export function validateUserUpdateData(data: Partial<UpdateUser>): ValidationResult {
    const validationSchema = z.object({
        name: userNameValidation,
        email: userEmailValidation,
        password: userPasswordValidation.optional().or(z.literal("")),
        confirmPassword: userConfirmPasswordValidation.optional().or(z.literal("")),
        biography: userBiographyValidation,
        currentPassword: userCurrentPasswordValidation,
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

    return validateData<UpdateUser>(validationSchema, data);
}
