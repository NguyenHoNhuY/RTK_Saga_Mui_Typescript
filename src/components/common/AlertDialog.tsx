import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';

export interface AlertDialogProps {
    isOpen: boolean;
    title: string;
    content: string;
    buttonFeature: string;
    onConfirm: () => void;
    onCloseDialog: () => void;
}
export function AlertDialog({
    isOpen,
    title,
    content,
    buttonFeature,
    onConfirm,
    onCloseDialog,
}: AlertDialogProps) {
    const handleClickConfirm = () => {
        onConfirm();
    };
    const handleClose = () => {
        onCloseDialog();
    };
    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {/* ky thuat Inserting html tags in template literals in React su */}
                        {/* dung dangerouslySetInnerHTML*/}
                        <span dangerouslySetInnerHTML={{ __html: content }}></span>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" color="inherit" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleClickConfirm}
                        autoFocus
                    >
                        {buttonFeature}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
