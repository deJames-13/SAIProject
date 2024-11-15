import useNotification from 'hooks/notifications/useNotification';
import { useEffect, useState } from 'react';


import vtApi from 'states/virustotal/api';


const useVirusTotal = () => {
    const { showNotification, renderNotifications, ...noti } = useNotification();
    const {
        useGetDataMutation,
        useScanUrlMutation,
        useScanFileMutation,
        useScanHashMutation,
    } = vtApi;

    const [url, setUrl] = useState('');
    const [id, setId] = useState('');
    const [data, setData] = useState(null);
    const [scanUrl] = useScanUrlMutation();
    const [getData] = useGetDataMutation();
    const [scanFile] = useScanFileMutation();
    const [scanHash] = useScanHashMutation();
    const [status, setStatus] = useState();


    const handleHashScan = (hash) => {
        setStatus("Scanning...");
        scanHash(hash).unwrap().then(data => {
            console.log(data)
            setStatus("Fetching data...");

        }).catch((error) => {
            console.log(error);
            noti.error("Error: " + error?.data?.error, 'Please provide an appropriate URL and try again.');
        });
    }

    const handleFileScan = (file) => {
        setStatus("Scanning...");
        scanFile(file).unwrap().then(data => {
            console.log(data)
            setStatus("Fetching data...");
        }).catch((error) => {
            console.log(error);
            noti.error("Error: " + error?.data?.error, 'Please provide an appropriate URL and try again.');
        });
    }

    const handleGetData = (id) => {
        setStatus("Scan finished. Getting data...");
        if (id) {
            getData(id).unwrap().then(({ data }) => {
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

    return {
        url,
        setUrl,
        data,
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
