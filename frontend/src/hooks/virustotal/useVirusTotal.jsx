import useNotification from 'hooks/notifications/useNotification';
import { useEffect, useState } from 'react';


import vtApi from 'states/virustotal/api';
import Swal from 'sweetalert2';


const useVirusTotal = ({ type = 'url' } = {}) => {
    const { showNotification, renderNotifications, ...noti } = useNotification();
    const {
        useGetDataMutation,
        useScanUrlMutation,
        useScanFileMutation,
        useScanHashMutation,
        useGetFileReportMutation,
    } = vtApi;

    const [url, setUrl] = useState('');
    const [id, setId] = useState('');
    const [data, setData] = useState(null);
    const [scanUrl] = useScanUrlMutation();
    const [getData] = useGetDataMutation();
    const [scanFile] = useScanFileMutation();
    const [scanHash] = useScanHashMutation();
    const [getFileReport] = useGetFileReportMutation();
    const [status, setStatus] = useState();


    const tryAgain = (id) => {
        Swal.fire({
            title: 'File Queued',
            text: "Your file has been upload and queued for analysis. Do you want to try getting the file report? FileID: " + id,
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                setStatus("Scanning...");
                fetchFileData(id, 'file');
            }
        })
    }

    const handleHashScan = (hash) => {
        setStatus("Scanning...");
        scanHash(hash).unwrap().then(data => {
            setStatus("Fetching data...");

        }).catch((error) => {
            console.log(error);
            noti.error("Error: " + error?.data?.error, 'Please provide an appropriate URL and try again.');
        });
    }

    const fetchFileData = (id, type = 'analysis') => {
        console.clear()
        setStatus("Fetching data...");
        return getFileReport({ id, type }).unwrap().then(({ data, meta }) => {
            if (type === 'file') {
                setData(data);
                setStatus("Data fetched successfully.");
                console.clear()
                console.log(data)
                localStorage.setItem('data', JSON.stringify(data))
            }
            if (data.attributes.status === "completed") {
                let itemLinkId = meta.file_info.sha256
                return fetchFileData(itemLinkId, 'file');
            }
            if (data.attributes.status === "queued") {
                let itemLinkId = meta.file_info.sha256
                return tryAgain(itemLinkId);
            }
            return data
        });
    }

    const handleFileScan = (file) => {
        setStatus("Scanning...");
        return scanFile(file).unwrap().then(data => {
            return fetchFileData(data.id);
        }).catch((error) => {
            console.log(error);
            noti.error("Error: " + error?.data?.error, 'Please provide an appropriate URL and try again.');
        });
    }

    const handleGetData = (id) => {
        setStatus("Scan finished. Getting data...");
        if (id) {
            return getData(id).unwrap().then(({ data }) => {
                setData(data);
                setStatus("Data fetched successfully.");
            });
        }
    }

    const handleScan = (id) => {
        // console.clear()
        // let a = JSON.parse(localStorage.getItem('data'))
        // console.log(JSON.stringify(a.attributes.total_votes))
        // setData(a);
        setStatus("Scanning...");
        scanUrl(url).unwrap().then(data => {
            const { id = null } = data
            setId(id);
            handleGetData(id);
        }).catch((error) => {
            console.log(error);
            noti.error("Error: " + error?.data?.error, 'Please provide an appropriate URL and try again.');
        });
    };

    useEffect(() => {
        if (status) {
            showNotification(
                "info",
                "notifications",
                "Scan Status: " + status
            );
        }
    }, [status]);

    useEffect(() => {
        console.log(type)
        if (type)
            setData(null);
    }, [type]);

    return {
        url,
        setUrl,
        data,
        setData,
        handleScan,
        handleGetData,
        handleFileScan,
        handleHashScan,
        status,
        setStatus,
        renderNotifications
    }


};

export default useVirusTotal;
