import { Button, TextField } from '@mui/material';
import MDBox from 'components/MDBox';
import MDButton from 'components/MDButton';
import React from 'react';
import { useScanUrlMutation } from 'states/virustotal/api';


export default function Scan() {
  const [url, setUrl] = React.useState('');
  const [report, setReport] = React.useState(null);
  const [scanUrl] = useScanUrlMutation();
  const handleScan = () => {
    scanUrl(url).unwrap().then(data => {
      setReport(data);
      console.log(data);
    });
  };


  return (
    <MDBox style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      padding: '1rem',
    }}>
      <MDBox>
        <MDBox style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}>
          <TextField
            id="outlined-basic" label="Enter URL" variant="outlined"
            style={{
              width: '100%',
              height: '100%',
            }}
            defaultValue={url}
            onChange={e => setUrl(e.target.value)}
          />
          <MDButton color='secondary' variant='outlined' onClick={handleScan}>
            Scan
          </MDButton>
        </MDBox>
      </MDBox>
      <MDBox style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1rem',
        border: '1px solid #ccc',
      }}>

      </MDBox>
    </MDBox>
  );
}