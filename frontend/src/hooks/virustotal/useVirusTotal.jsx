import { useEffect, useState } from 'react';


import {
    useGetDataMutation,
    useScanUrlMutation,
} from 'states/virustotal/api';


const useVirusTotal = () => {
    const [url, setUrl] = useState('');
    const [id, setId] = useState('');
    const [data, setData] = useState(null);
    const [scanUrl] = useScanUrlMutation();
    const [getData] = useGetDataMutation();
    const [status, setStatus] = useState();

    const handleGetData = (id) => {
        if (id) {
            getData(id).unwrap().then(({ data }) => {
                setData(data);
            });
        }
    }

    const handleScan = (id) => {

        console.clear()
        // let a = JSON.parse(localStorage.getItem('data'))
        // console.log(a)
        // setData(a);

        scanUrl(url).unwrap().then(data => {
            const { id = null } = data
            setId(id);
            handleGetData(id);
        });
    };

    return {
        url,
        setUrl,
        data,
        handleScan,
        status,
        setStatus,
    }


};

export default useVirusTotal;
