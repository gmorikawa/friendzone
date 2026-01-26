import { useState } from "react";

export interface TabController<Value extends string | number> {
    value: Value;

    handleChange: (newValue: Value) => void;
}

export function useTab<Value extends string | number>(
    initialValue: Value,
    onChange?: (newValue: Value) => void
): TabController<Value> {
    const [value, setValue] = useState<Value>(initialValue);

    const handleChange = (newValue: Value) => {
        setValue(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

    return {
        value,
        handleChange
    };
}
