import { TextField } from '@mui/material';

import MDBox from 'components/MDBox';
import MDButton from 'components/MDButton';
import AnalysesTable from './scan-table';

import useVirusTotal from 'hooks/virustotal/useVirusTotal';

import React from 'react';
import ScanFile from './scan-file';


export default function Scan({ type = "url" }) {
  const {
    url,
    setUrl,
    handleUrlScan,
    data,
    setData,
    renderNotifications
  } = useVirusTotal({ type });



  const inputUrlComponent = () => {
    return (
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
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
          <MDButton color='secondary' variant='outlined' onClick={handleUrlScan}>
            Scan
          </MDButton>
        </MDBox>
        <p className='italic ml-4'>
          By submitting data above, you agree to our Terms of Service and Privacy Notice, and consent to sharing your submission with the security community.
        </p>
      </MDBox>
    )
  }

  React.useEffect(() => {
    // console.log(data)
  }, [data])

  return (
    <>
      {type === "url" && inputUrlComponent()}
      {type === "file" && <ScanFile onScan={setData} />}

      <div className="divider"></div>

      <MDBox style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1rem',
      }}>
        <AnalysesTable analyses={data} />
        {renderNotifications}
      </MDBox>
    </>

  );
}