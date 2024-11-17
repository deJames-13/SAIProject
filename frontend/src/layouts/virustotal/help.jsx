import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, IconButton, Modal, Typography } from '@mui/material';
import MDBox from 'components/MDBox';
import MDButton from 'components/MDButton';
import React, { useState } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

export default function HelpModal({ initialOpen = false }) {
    const [open, setOpen] = useState(initialOpen);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <MDButton color="info" onClick={handleOpen} className="w-full">
                Help
            </MDButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="help-modal-title"
                aria-describedby="help-modal-description"
            >
                <Box sx={style}>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography id="help-modal-title" variant="h6" component="h2">
                        Help
                    </Typography>
                    <Typography id="help-modal-description" sx={{ mt: 2 }}>
                        Welcome to the VirusTotal Integrated Dashboard! Here you can:
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        <strong>Scan URLs:</strong> Enter a URL in the input field and click "Scan" to analyze it.
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        <strong>Scan Files:</strong> Upload a file or enter its hash to analyze it.
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        <strong>Save Reports:</strong> Save the analysis reports for future reference.
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        <strong>View History:</strong> Access your scan history to review past reports.
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Use the navigation tabs to switch between URL and file scanning. Your scan results will be displayed below the input fields.
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}