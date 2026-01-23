import type { ValidationResult } from "@/shared/form/types/validation-result";
import { useEffect, useState } from "react";

export interface FormController<T> {
    entity: Partial<T>;
    isValid: boolean;

    errors: Record<string, string> | null;
    touched: Record<string, boolean>;
    getError: (key: string) => string;

    updateEntity: (entity: Partial<T>) => void;
    makeAllTouched: () => void;

    handleChange: (field: string, value: any) => void;
    handleBlur: (field: string, value: any) => void;
    handleSubmit: () => void;
}

export interface FormConfiguration<T extends Object> {
    defaultValues: Partial<T>;
    validate: (entity: Partial<T>) => ValidationResult;
    onSubmit: (validatedData: T) => void;
}

export function useForm<T extends Object>(config: FormConfiguration<T>) {
    const [entity, setEntity] = useState<Partial<T>>(config.defaultValues);
    const [errors, setErrors] = useState<Record<string, any> | null>(null);
    const [touched, setTouched] = useState<Record<string, boolean>>(
        substituteValue(flattenObject<Partial<T>>(config.defaultValues), false)
    );
    const isValid = !Boolean(errors);

    const getError = (key: string) => {
        return (touched[key] && errors && errors[key]) || "";
    };

    const addTouched = (key: string) => {
        setTouched((previousTouched: Record<string, boolean>) => ({
            ...previousTouched,
            [key]: true,
        }));
    };

    const updateEntity = (newEntity: Partial<T>) => {
        setEntity(newEntity);
    };

    const makeAllTouched = () => {
        setTouched(substituteValue(flattenObject<Partial<T>>(entity), true));
    };

    const handleChange = (field: string, value: any) => {
        setEntity((previousEntity: Partial<T>) => ({
            ...previousEntity,
            [field]: value,
        }));
    };

    const handleBlur = (field: string, value: any) => {
        addTouched(field);
        setEntity((previousEntity: Partial<T>) => ({
            ...previousEntity,
            [field]: value,
        }));
    };

    const handleSubmit = () => {
        makeAllTouched();

        if (!isValid) {
            return;
        }

        config.onSubmit(entity as T);
    };

    useEffect(() => {
        const validationResult = config.validate(entity);

        if (validationResult.isValid) {
            setErrors(null);
        } else {
            const newErrors: Record<string, string> = {};
            for (const { field, message } of validationResult.errors) {
                newErrors[field] = message;
            }

            setErrors(newErrors);
        }
    }, [entity]);
    return {
        entity,
        isValid,

        errors,
        touched,
        getError,

        updateEntity,
        makeAllTouched,

        handleChange,
        handleBlur,
        handleSubmit
    };
}

function flattenObject<T>(obj: T, parentKey = "") {
    const result: Record<string, any> = {};

    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const propName = parentKey ? `${parentKey}.${key}` : key;
            const value = obj[key];

            if (typeof value === "object" && value !== null && !Array.isArray(value)) {
                Object.assign(result, flattenObject(value, propName));
            } else if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    const arrayPropName = `${propName}.${index}`;
                    if (typeof item === "object" && item !== null) {
                        Object.assign(result, flattenObject(item, arrayPropName));
                    } else {
                        result[arrayPropName] = item;
                    }
                });
            } else {
                result[propName] = value;
            }
        }
    }
    return result;
};

function substituteValue<T>(obj: Record<string, T>, newValue: T): Record<string, T> {
    const result: Record<string, T> = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            result[key] = newValue;
        }
    }
    return result;
}