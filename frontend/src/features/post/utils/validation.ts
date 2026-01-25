import z from "zod";

import type { ValidationResult } from "@/shared/form/types/validation-result";
import { validateData } from "@/shared/form/utils/validator";

import type { CreatePost } from "@/features/post/types/create-post";
import type { UpdatePost } from "@/features/post/types/update-post";

export const postContentValidation = z.string().min(1, "Content is required");
export const postCreatedByValidation = z.string().min(1, "Created By is required");

export function validatePostCreateData(createPost: Partial<CreatePost>): ValidationResult {
    const postCreateValidationSchema = z.object({
        content: postContentValidation,
        createdBy: postCreatedByValidation,
    });

    return validateData<CreatePost>(postCreateValidationSchema, createPost);
}

export function validatePostUpdateData(updatePost: Partial<UpdatePost>): ValidationResult {
    const postUpdateValidationSchema = z.object({
        content: postContentValidation,
    });

    return validateData<UpdatePost>(postUpdateValidationSchema, updatePost);
}
