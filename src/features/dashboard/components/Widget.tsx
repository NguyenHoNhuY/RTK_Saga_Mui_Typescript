import { Box, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as React from 'react';

export interface WidgetProps {
    title: string;
    children: any;
}

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        border: `1px solid ${theme.palette.divider}`,
    },
}));

export function Widget({ title, children }: WidgetProps) {
    const classes = useStyles();
    console.log('children: ', children);
    return (
        <Paper className={classes.root}>
            <Typography variant="button">{title} </Typography>

            <Box mt={2}>{children}</Box>
        </Paper>
    );
}
