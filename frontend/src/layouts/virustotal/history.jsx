import { Icon } from '@mui/material';
import MDBox from 'components/MDBox';
import MDButton from 'components/MDButton';

import useHistoryActions from 'hooks/history/useHistoryActions';
import { useState } from 'react';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const HistoryCard = ({ history }) => {
  return (
    <div className="flex justify-between border-b border-slate-700/40 py-2 my-2">
      <div className='flex flex-col gap-2'>
        <h1 className='font-bold text-lg'>{history?.title}</h1>
        <p>{history?.message}</p>
        <span className="font-sm italic">
          Date: {history?.timestamp.split('T')[0]} at {history?.timestamp.split('T')[1].split('.')[0]}
        </span>
      </div>
      <div>
        <MDButton color="info" size="small" variant="outlined" href={history?.permalink} className="mr-2">
          <Icon className=''>
            visibility
          </Icon>
        </MDButton>
        <MDButton color="primary" size="small" variant="outlined" href={history?.permalink} className="mr-2">
          <Icon className=''>
            history
          </Icon>
        </MDButton>
        <MDButton color="primary" size="small" variant="outlined" href={history?.permalink}>
          <Icon className=''>
            delete
          </Icon>
        </MDButton>
      </div>
    </div>
  )
}


export default function History() {
  const [results, setResults] = useState([]);
  const { data, fetchHistories } = useHistoryActions();
  const loc = useLocation();
  const pathname = loc.pathname;

  useEffect(() => {
    fetchHistories();
  }, []);


  useEffect(() => {
    setResults(data.results);
  }, [data]);


  return (
    <MDBox className="flex flex-col-reverse gap-2" >
      {results?.map((history, index) => {
        return <HistoryCard key={index} history={history} />
      })}
    </MDBox>
  )
}
