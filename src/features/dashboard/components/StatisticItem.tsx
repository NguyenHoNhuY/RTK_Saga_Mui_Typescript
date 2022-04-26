import { Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import * as React from 'react';

export interface StatisticItemProps {
    icon: React.ReactElement;
    label: string;
    value: string | number;
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',

        padding: theme.spacing(1, 2),
        border: `1px solid ${theme.palette.divider}`,
    },
}));

export function StatisticItem({ icon, label, value }: StatisticItemProps) {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Box>{icon}</Box>
            <Box>
                <Typography variant="h5" align="right">
                    {value}
                </Typography>
                <Typography variant="caption">{label}</Typography>
            </Box>
        </Paper>
    );
}
