import { Icon } from '@mui/material';
import MDBox from 'components/MDBox';
import MDButton from 'components/MDButton';

import useHistoryActions from 'hooks/history/useHistoryActions';
import { useState } from 'react';

import useNotification from 'hooks/notifications/useNotification';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import HistoryModalContent from './history-modal-content';
import ScanModal from './scan-modal';

const HistoryCard = ({ history, onDelete }) => {
  const deleteHistory = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this history!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(history.id);
      }
    });
  };

  return (
    <div className="flex justify-between border-b border-slate-700/40 py-2 my-2">
      <div className='flex flex-col gap-2'>
        <h1 className='font-bold text-lg'>{history?.title}</h1>
        <p>{history?.message}</p>
        <span className="font-sm italic">
          Date: {history?.timestamp.split('T')[0]} at {history?.timestamp.split('T')[1].split('.')[0]}
        </span>
      </div>
      <div className='flex flex-col'>
        <ScanModal
          topElement={<>
            <h1 className='text-xl font-bold'>
              {history?.title}
            </h1>
            <p className='text-sm font-normal'>
              {history?.message}
            </p>
            <span className="text-xs font-light italic">
              Date: {history?.timestamp.split('T')[0]} at {history?.timestamp.split('T')[1].split('.')[0]}
            </span>
          </>
          }
          contentElement={<HistoryModalContent history={history} />}
          btnProps={{
            className: 'mr-2 btn btn-ghost btn-sm btn-outline rounded-none'
          }}
        />
        <MDButton className='mr-2 btn btn-ghost btn-sm btn-outline rounded-none' href={history?.permalink}>
          <Icon className=''>
            history
          </Icon>
        </MDButton>
        <MDButton className='mr-2 btn btn-error btn-sm btn-outline rounded-none text-red-400 btn-outline' onClick={deleteHistory} >
          <Icon className=''>
            delete
          </Icon>
        </MDButton>
      </div>
    </div>
  )
}


export default function History() {
  const noti = useNotification();
  const [results, setResults] = useState([]);
  const {
    data,
    fetchHistories,
    deleteHistoryById,
  } = useHistoryActions();
  const loc = useLocation();
  const pathname = loc.pathname;

  useEffect(() => {
    fetchHistories();
  }, []);


  useEffect(() => {
    setResults(data.results);
  }, [data]);


  const handleDelete = async (id) => {
    await deleteHistoryById(id).then(() => {
      setResults(results.filter((history) => history.id !== id));
      noti.success('Success', 'History deleted successfully');
    }).catch((err) => {
      noti.error('Error', err.message);
    });
  };

  return (
    <MDBox className="flex flex-col-reverse gap-2" >
      {results?.map((history, index) => {
        return <HistoryCard key={index} history={history} onDelete={handleDelete} />
      })}
      {noti.renderNotifications}
    </MDBox>
  )
}
