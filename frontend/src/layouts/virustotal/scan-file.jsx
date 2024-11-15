import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import MDBox from 'components/MDBox';
import MDButton from 'components/MDButton';
import useVirusTotal from 'hooks/virustotal/useVirusTotal';
import * as React from 'react';
import Swal from 'sweetalert2';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function ScanFile({ onScan = () => { } }) {
  const [hash, setHash] = React.useState('');
  const {
    renderNotifications,
    handleFileScan,
    handleHashScan,
  } = useVirusTotal();


  const handleScan = () => {
    handleHashScan(hash);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 32 * 1024 * 1024) {
      Swal.fire({
        icon: 'error',
        title: 'File size too large',
        text: 'Please upload a file less than 32MB in size',
      })
    }

    handleFileScan(file).then((data) => {
      onScan(data);
    });




  };


  return (
    <div className=''>

      <MDBox>
        <MDBox style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}>
          <TextField
            id="outlined-basic" label="Enter File Hash" variant="outlined"
            style={{
              height: '100%',
            }}
            value={hash}
            onChange={e => setHash(e.target.value)}
            className='flex-1'
          />
          <MDButton color='secondary' variant='outlined' onClick={handleScan}>
            Scan Hash
          </MDButton>
          <MDBox>
            <Button
              className="text-white"
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput
                type="file"
                onChange={handleFileUpload}
              />
            </Button>
          </MDBox>
        </MDBox>
        <p className='italic ml-4'>
          By submitting data above, you agree to our Terms of Service and Privacy Notice, and consent to sharing your submission with the security community.
        </p>
      </MDBox>
      {renderNotifications}

    </div>
  );
}