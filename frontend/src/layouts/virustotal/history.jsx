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

const HistoryCard = ({ history, onDelete, onRestore }) => {
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

  const restoreHistory = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will restore this history!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, restore it!',
    }).then((result) => {
      if (result.isConfirmed) {
        onRestore(history.id);
      }
    });
  };


  return (
    <div className="flex justify-between border-b border-slate-700/40 py-2 my-2">
      <div className='flex flex-col gap-2'>
        <h1 className='font-bold text-lg'>{history?.title}</h1>
        <p>{history?.message}</p>
        <span className="text-sm italic">
          Date: {history?.timestamp.split('T')[0]} at {history?.timestamp.split('T')[1].split('.')[0]}
        </span>
        <br />
        {
          history?.is_deleted &&
          <span className="text-sm font-bold text-red-400 italic">
            Deleted At: {history?.deleted_at.split('T')[0]} at {history?.timestamp.split('T')[1].split('.')[0]}
          </span>
        }
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
        <MDButton className='mr-2 btn btn-ghost btn-sm btn-outline rounded-none'
          href={`/threats/scan-${history.scan_type.toLowerCase()}${history?.permalink}`}
        >
          <Icon className=''>
            history
          </Icon>
        </MDButton>
        {
          !history?.is_deleted &&
          <MDButton className='mr-2 btn btn-error btn-sm btn-outline rounded-none text-red-400 btn-outline' onClick={deleteHistory} >
            <Icon className=''>
              delete
            </Icon>
          </MDButton>
        }
        {
          history?.is_deleted && <MDButton className='mr-2 btn btn-primary btn-sm btn-outline text-green-400 rounded-none' onClick={restoreHistory} >
            <Icon className=''>
              restore
            </Icon>
          </MDButton>
        }
      </div>
    </div>
  )
}


export default function History() {
  const noti = useNotification();
  const [results, setResults] = useState([]);
  const [state, setState] = useState('history'); //history, archive
  const {
    data,
    fetchHistories,
    fetchDeletedHistories,
    deleteHistoryById,
    restoreHistoryById,
  } = useHistoryActions();
  const loc = useLocation();
  const pathname = loc.pathname;

  useEffect(() => {
    fetchHistories();
  }, []);

  useEffect(() => {
    setResults(data.results);
    setResults(data?.results || data);
  }, [data]);


  const handleDelete = async (id) => {
    await deleteHistoryById(id).then(() => {
      setResults(results.filter((history) => history.id !== id));
      noti.success('Success', 'History deleted successfully.', 'See archived histories to restore it.');
    }).catch((err) => {
      noti.error('Error', err.message);
    });
  };

  const handleRestore = async (id) => {
    await restoreHistoryById(id).then(() => {
      setResults(results.filter((history) => history.id !== id));
      noti.success('Success', 'History restored successfully.', 'See history to view it.');
    }).catch((err) => {
      noti.error('Error', err.message);
    });
  };

  const handleStateChange = (state) => async () => {
    const swapResults = async () => {
      setState(state);
      if (state === 'history') {
        return fetchHistories();
      } else if (state === 'archive') {
        return fetchDeletedHistories();
      }
    }
    swapResults().then((response) => {
      noti.info(`Showing ${state == 'history' ? 'current' : 'archived'} histories.`);
    }).catch((err) => {
      noti.error('Error', err.message);
    });

  };



  return (
    <>
      <MDBox className="flex w-full justify-end">

        {/* Archive Btn */}
        {
          state === 'history' && <MDButton
            onClick={handleStateChange('archive')}
            className="btn btn-primary btn-sm">
            View Archived
          </MDButton>
        }

        {/* History btn */}
        {
          state === 'archive' && <MDButton
            onClick={handleStateChange('history')}
            className="btn btn-primary btn-sm">
            View History
          </MDButton>
        }
      </MDBox>
      <MDBox className="flex flex-col-reverse gap-2" >
        {results?.map((history, index) => {
          return <HistoryCard key={index} history={history} onDelete={handleDelete} onRestore={handleRestore} />
        })}
        {noti.renderNotifications}
      </MDBox>
    </>

  )
}
