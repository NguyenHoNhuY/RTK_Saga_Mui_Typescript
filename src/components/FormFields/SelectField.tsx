import { FormHelperText, MenuItem, Select } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import React from 'react';
import { Control, useController } from 'react-hook-form';

export interface SelectOption {
    label?: string;
    value: string | number;
}

export interface SelectFieldProps {
    name: string;
    control: Control<any>;
    label?: string;
    disabled?: boolean;
    options: SelectOption[];
}

export function SelectField({
    name,
    control,
    label,
    disabled,
    options,
}: SelectFieldProps) {
    const {
        field: { value, onBlur, onChange },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
    });
    return (
        <FormControl fullWidth margin="normal" disabled={disabled} error={invalid}>
            <InputLabel id="searchById">{label}</InputLabel>
            <Select
                labelId="searchById"
                label="Sort"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>

            <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
    );
}
