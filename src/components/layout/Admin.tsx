import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Header, Sidebar } from 'components/common';
import Dashboard from 'features/dashboard/Dashboard';
import StudentFeature from 'features/student/Students';
import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        gridTemplateColumns: '250px 1fr',
        gridTemplateAreas: `"header header" "sidebar main"`,

        minHeight: '100vh',
    },
    header: { gridArea: 'header' },
    sidebar: {
        gridArea: 'sidebar',
        backgroundColor: theme.palette.background.paper,
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    main: {
        gridArea: 'main',
        padding: theme.spacing(2, 3),
        backgroundColor: theme.palette.background.paper,
    },
}));

export function AdminLayout() {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Box className={classes.header}>
                <Header />
            </Box>
            <Box className={classes.sidebar}>
                <Sidebar />
            </Box>
            <Box className={classes.main}>
                <Routes>
                    <Route index element={<Dashboard />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="students/*" element={<StudentFeature />} />
                    <Route path="*" element={<Navigate replace to="/" />} />
                </Routes>
            </Box>
        </Box>
    );
}
