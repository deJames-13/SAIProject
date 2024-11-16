import MDBox from 'components/MDBox';

import useHistoryActions from 'hooks/history/useHistoryActions';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function History() {
  const { data, fetchHistories } = useHistoryActions();
  const loc = useLocation();
  const pathname = loc.pathname;

  useEffect(() => {
    fetchHistories();
  }, []);


  useEffect(() => {
    console.log(data);
  }, [data]);


  return (
    <MDBox display="flex" >

    </MDBox>
  )
}
