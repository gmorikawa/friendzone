import type { FormErrors } from "./error";

interface ValidResult {
    isValid: true;
    errors: null;
}

interface ErrorResult {
    isValid: false;
    errors: FormErrors;
}

export type ValidationResult = ValidResult | ErrorResult;
