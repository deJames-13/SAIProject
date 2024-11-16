import { Icon } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import MDButton from 'components/MDButton';


import * as React from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ScanModal({
    topElement,
    contentElement,
    actionElement,
    btnProps
}) {
    const descriptionElementRef = React.useRef(null);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <React.Fragment>
            <MDButton onClick={handleClickOpen} {...btnProps}><Icon>visibility</Icon></MDButton>

            <Dialog
                open={open}
                onClose={handleClose}
                scroll="paper"
                TransitionComponent={Transition}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                maxWidth="md"
                maxHeight="md"
                fullWidth={true}
            >
                <DialogTitle id="scroll-dialog-title">
                    {topElement}
                </DialogTitle>


                <DialogContent dividers={true}

                >
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        {contentElement}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {actionElement}
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}