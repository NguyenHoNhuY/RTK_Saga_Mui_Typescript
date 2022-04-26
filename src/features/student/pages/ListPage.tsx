import { Box, Button, LinearProgress, Pagination, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import studentApi from 'api/studentApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectCityList, selectCityMap } from 'features/city/citySlice';
import { ListParams, Student } from 'models';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StudentFilter, StudentTable } from '../components';
import {
    selectStudentFilter,
    selectStudentList,
    selectStudentLoading,
    selectStudentPagination,
    studentActions,
} from '../studentSlice';

const useStyle = makeStyles((theme) => ({
    root: {
        position: 'relative',
        paddingTop: theme.spacing(1),
    },
    title: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',

        marginBottom: theme.spacing(4),
    },
    loading: {
        position: 'absolute !important' as any,
        top: theme.spacing(-1),
        width: '100%',
    },
}));

export function ListPage() {
    const classes = useStyle();
    const dispatch = useAppDispatch();
    const studentList = useAppSelector(selectStudentList);
    const pagination = useAppSelector(selectStudentPagination);
    const filter = useAppSelector(selectStudentFilter);
    const loading = useAppSelector(selectStudentLoading);
    const cityMap = useAppSelector(selectCityMap);
    const cityList = useAppSelector(selectCityList);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(studentActions.fetchStudentList(filter));
    }, [dispatch, filter]);

    const handleChange = (e: any, page: number) => {
        const newFilter: ListParams = {
            ...filter,
            _page: page,
        };
        dispatch(studentActions.setFilter(newFilter));
    };

    const handleSearchChange = (newFilter: ListParams) => {
        dispatch(studentActions.setFilterSearch(newFilter));
    };

    const handleCityChange = (newFilter: ListParams) => {
        dispatch(studentActions.setFilter(newFilter));
    };

    const handleRemoveStudent = async (student: Student) => {
        console.log('handle remove student :', student.id);
        try {
            await studentApi.remove(student?.id || '');
            dispatch(studentActions.fetchStudentList(filter));
        } catch (error) {
            //todo toast error
            console.log('Failed to fetch student : ', error);
        }
    };

    const handleEditStudent = async (student: Student) => {
        navigate(`${student.id}`);
    };

    return (
        <Box className={classes.root}>
            {loading && <LinearProgress className={classes.loading} />}

            <Box className={classes.title}>
                <Typography variant="h4">Students</Typography>
                <Link to="add" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary">
                        Add New Student
                    </Button>
                </Link>
            </Box>

            {/* search filter */}
            <Box mb={3}>
                <StudentFilter
                    cityList={cityList}
                    filter={filter}
                    onSearchChange={handleSearchChange}
                    onChange={handleCityChange}
                />
            </Box>

            {/* student table */}
            <StudentTable
                studentList={studentList}
                cityMap={cityMap}
                onEdit={handleEditStudent}
                onRemove={handleRemoveStudent}
            />

            {/* pagination */}
            <Box my={2} display="flex" justifyContent="center">
                <Pagination
                    color="primary"
                    count={Math.ceil(pagination?._totalRows / pagination?._limit)}
                    page={pagination?._page}
                    onChange={handleChange}
                />
            </Box>
        </Box>
    );
}
