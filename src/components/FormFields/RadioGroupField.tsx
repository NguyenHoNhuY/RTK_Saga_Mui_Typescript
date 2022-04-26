import { FormHelperText } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import React from 'react';
import { Control, useController } from 'react-hook-form';

export interface RadioOption {
    label?: string;
    value: string | number;
}

export interface RadioGroupFieldProps {
    name: string;
    control: Control<any>;
    label?: string;
    disabled?: boolean;
    options: RadioOption[];
}

export function RadioGroupField({
    name,
    control,
    label,
    disabled,
    options,
}: RadioGroupFieldProps) {
    const {
        field: { value, onBlur, onChange },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
    });
    return (
        <FormControl margin="normal" disabled={disabled} error={invalid}>
            <FormLabel id="demo-row-radio-buttons-group-label">{label}</FormLabel>

            <RadioGroup row name={name} value={value} onChange={onChange} onBlur={onBlur}>
                {options.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        label={option?.label || ''}
                        control={<Radio />}
                    />
                ))}
            </RadioGroup>

            <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
    );
}
