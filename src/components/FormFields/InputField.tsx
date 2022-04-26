import { TextField } from '@mui/material';
import React, { InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    control: Control<any>;
    label?: string;
}

export function InputField({ name, control, label, ...inputProps }: InputFieldProps) {
    const {
        field: { value, onBlur, onChange, ref },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
    });
    return (
        <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            label={label}
            inputRef={ref}
            inputProps={inputProps}
            error={invalid}
            helperText={error?.message}
        />
    );
}
