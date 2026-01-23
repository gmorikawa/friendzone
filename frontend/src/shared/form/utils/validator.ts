import z from "zod";

import type { ValidationResult } from "@/shared/form/types/validation-result";

export function validateData<Data>(schema: z.ZodSchema<Data>, data: Partial<Data>): ValidationResult {
    const result = schema.safeParse(data);

    if (result.success) {
        return { isValid: true, errors: null };
    } else {
        return {
            isValid: false,
            errors: result.error.issues.map((issue) => {
                return {
                    field: issue.path.join("."),
                    message: issue.message,
                };
            }),
        }
    }
}