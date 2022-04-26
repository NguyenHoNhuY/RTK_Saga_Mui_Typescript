import { Box, Button, CircularProgress, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import * as React from 'react';
import { authActions } from '../authSlice';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
    },
    box: {
        padding: theme.spacing(3),
    },
}));

export default function LoginPage() {
    const dispatch = useAppDispatch();
    const classes = useStyles();
    const isLogging = useAppSelector((state) => state.auth.logging);

    const handleLoginClick = () => {
        dispatch(
            authActions.login({
                username: '',
                password: '',
            })
        );
    };

    return (
        <div className={classes.root}>
            <Paper elevation={1} className={classes.box}>
                <Typography variant="h5" component="h1">
                    Student Management
                </Typography>
                <Box mt={4}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleLoginClick}
                    >
                        {isLogging && <CircularProgress size={20} color={'secondary'} />}
                        &nbsp; Fake Login
                    </Button>
                </Box>
            </Paper>
        </div>
    );
}
