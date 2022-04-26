import { ChevronLeft } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import studentApi from 'api/studentApi';
import { Student } from 'models';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { StudentForm } from '../components';

const useStyles = makeStyles((theme) => ({
    root: {},
    blockForm: {
        display: 'flex',
        justifyContent: 'center',
    },
}));

export function AddEditPage() {
    const { studentId } = useParams();
    const [student, setStudent] = useState<Student>();
    const isEdit = Boolean(studentId);
    const classes = useStyles();

    const initialValues: Student = {
        name: '',
        age: '',
        mark: '',
        gender: 'male',
        city: '',
        ...student,
    } as Student;

    useEffect(() => {
        if (!studentId) return;

        //* IIFE : khoi tao mot funtion va thuc thi ngay lap tuc
        (async () => {
            try {
                const response: Student = await studentApi.getById(studentId);
                setStudent(response);
            } catch (error) {
                console.log('Failed to call student api :', error);
            }
        })();
    }, [studentId]);

    const handleStudentFormSubmit = (formValues: Student) => {
        // todo handle form submit
    };
    console.log('value ', initialValues);

    return (
        <Box>
            <Link
                to="/admin/students"
                style={{
                    textDecoration: 'none',
                }}
            >
                <Typography
                    variant="subtitle1"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <ChevronLeft /> Back to student list
                </Typography>
            </Link>
            <Typography variant="h4">
                {studentId ? 'Edit page' : 'Add student page'}
            </Typography>
            {/* {(Boolean(student) || !isEdit) && ( */}
            <Box mt={3} className={classes.blockForm}>
                <StudentForm
                    initialValues={initialValues}
                    onSubmit={handleStudentFormSubmit}
                />
            </Box>
            {/* )} */}
        </Box>
    );
}
