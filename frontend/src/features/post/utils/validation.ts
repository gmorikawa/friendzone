import z from "zod";

import type { ValidationResult } from "@/shared/form/types/validation-result";
import { validateData } from "@/shared/form/utils/validator";

import type { CreateComment, CreatePost } from "@/features/post/types/create-post";
import type { UpdatePost } from "@/features/post/types/update-post";

export const postContentValidation = z.string()
    .min(1, "Content is required")
    .max(255, "Content must be at most 255 characters");
export const postCreatedByValidation = z.string().min(1, "Created By is required");

export function validatePostCreateData(data: Partial<CreatePost>): ValidationResult {
    const validationSchema = z.object({
        content: postContentValidation,
        createdBy: postCreatedByValidation,
    });

    return validateData<CreatePost>(validationSchema, data);
}

export function validatePostUpdateData(data: Partial<UpdatePost>): ValidationResult {
    const validationSchema = z.object({
        content: postContentValidation,
    });

    return validateData<UpdatePost>(validationSchema, data);
}

export function validateCommentCreateData(data: Partial<CreateComment>): ValidationResult {
    const validationSchema = z.object({
        content: z.string().min(1, "Comment content is required").max(500, "Comment must be at most 500 characters"),
    });

    return validateData<{ content: string }>(validationSchema, data);
}