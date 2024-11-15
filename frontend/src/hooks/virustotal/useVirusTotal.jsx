import useNotification from 'hooks/notifications/useNotification';
import { useEffect, useState } from 'react';


import {
    useGetDataMutation,
    useScanUrlMutation,
} from 'states/virustotal/api';


const useVirusTotal = () => {
    const { showNotification, renderNotifications } = useNotification();

    const [url, setUrl] = useState('');
    const [id, setId] = useState('');
    const [data, setData] = useState(null);
    const [scanUrl] = useScanUrlMutation();
    const [getData] = useGetDataMutation();
    const [status, setStatus] = useState();

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
        console.clear()
        let a = JSON.parse(localStorage.getItem('data'))
        console.log(JSON.stringify(a.attributes.total_votes))
        setData(a);
        // setStatus("Scanning...");
        // scanUrl(url).unwrap().then(data => {
        //     const { id = null } = data
        //     setId(id);
        //     handleGetData(id);
        // });
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
        status,
        setStatus,
        renderNotifications
    }


};

export default useVirusTotal;
