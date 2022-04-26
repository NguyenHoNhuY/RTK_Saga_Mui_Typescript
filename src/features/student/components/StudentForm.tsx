import { Box, Button } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { InputField, RadioGroupField, SelectField } from 'components/FormFields';
import { selectCityOption } from 'features/city/citySlice';
import { Student } from 'models';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export interface StudentFormProps {
    initialValues?: Student;
    onSubmit?: (formValues: Student) => void;
}

// todo khoi tao schema validate
const schema = yup.object({
    name: yup.string().required('please enter name'),
    age: yup
        .number()
        .positive()
        .integer()
        .required('please enter age')
        .typeError('please enter a valid number'),
    gender: yup
        .string()
        .oneOf(['male', 'female'], 'please select either male or female')
        .required('please select male or female '),
    mark: yup
        .number()
        .required('please enter mark')
        .typeError('please enter a valid number'),
    city: yup.string().required('please select city '),
});

export function StudentForm({ initialValues, onSubmit }: StudentFormProps) {
    const { control, handleSubmit } = useForm<Student>({
        defaultValues: initialValues,
        resolver: yupResolver(schema),
    });
    const cityOptions = useAppSelector(selectCityOption);

    const handleFormSubmit = (formValues: Student) => {
        console.log('form values:', formValues);
    };

    return (
        <Box maxWidth={400}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <InputField label="Full Name" name="name" control={control} />
                <InputField label="Age" name="age" control={control} />
                <RadioGroupField
                    label="Gender"
                    name="gender"
                    control={control}
                    options={[
                        { label: 'Male', value: 'male' },
                        { label: 'Female', value: 'female' },
                    ]}
                />
                <InputField label="Mark" name="mark" control={control} />
                <SelectField
                    label="City"
                    name="city"
                    control={control}
                    options={cityOptions}
                />
                <Box style={{ display: 'flex', justifyContent: 'center' }} mt={3}>
                    <Button type="submit" variant="contained" color="primary">
                        Save
                    </Button>
                </Box>
            </form>
        </Box>
    );
}
