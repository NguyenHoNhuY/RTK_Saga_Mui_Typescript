import { Box, Button, Paper } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';
import { AlertDialog } from 'components/common';
import { City, Student } from 'models';
import React, { useState } from 'react';
import { getMarkColor } from 'utils';

export interface StudentTableProps {
    studentList: Student[];
    cityMap: {
        [key: string]: City;
    };
    onEdit?: (Student) => void;
    onRemove?: (Student) => void;
}

const useStyle = makeStyles((theme) => ({
    root: {},
    edit: {
        marginRight: `${theme.spacing(2)} !important`,
    },
    capitalizeString: {
        textTransform: 'capitalize',
    },
}));

export function StudentTable({
    studentList,
    onEdit,
    onRemove,
    cityMap,
}: StudentTableProps) {
    const classes = useStyle();
    const [isOpen, setIsOpen] = useState(false);
    const [studentSelected, setStudentSelected] = useState<Student>();

    const handleRemoveClick = (student: Student) => {
        setIsOpen(true);
        setStudentSelected(student);
    };

    const handleConfirmRemove = () => {
        onRemove?.(studentSelected);
        setIsOpen(false);
    };

    const handleCloseDialog = () => setIsOpen(false);

    return (
        <>
            {/*   table of student */}
            <TableContainer component={Paper}>
                <Table className={classes.root} size="small" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Mark</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {studentList.map((student) => (
                            <TableRow
                                key={student.id}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                }}
                            >
                                <TableCell>{student.id}</TableCell>
                                <TableCell>{student.name}</TableCell>
                                <TableCell className={classes.capitalizeString}>
                                    {student.gender}
                                </TableCell>
                                <TableCell>
                                    <Box
                                        color={getMarkColor(student.mark)}
                                        fontWeight="bold"
                                    >
                                        {student.mark}
                                    </Box>
                                </TableCell>
                                <TableCell>{cityMap[student.city]?.name}</TableCell>
                                <TableCell align="center">
                                    <Button
                                        size="small"
                                        variant="contained"
                                        color="primary"
                                        className={classes.edit}
                                        onClick={() => onEdit?.(student)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() =>
                                            handleRemoveClick(student as Student)
                                        }
                                    >
                                        Remove
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* alert dialog confirm remove student */}
            <AlertDialog
                isOpen={isOpen}
                title="Remove Student ?"
                content={`Are you sure remove student named<b> " ${studentSelected?.name.toUpperCase()} " </b>?`}
                buttonFeature="Remove"
                onConfirm={handleConfirmRemove}
                onCloseDialog={handleCloseDialog}
            />
        </>
    );
}
