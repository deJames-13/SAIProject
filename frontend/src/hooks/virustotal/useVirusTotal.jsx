import { useEffect, useState } from 'react';
import { useScanUrlMutation } from 'states/virustotal/api';


const useVirusTotal = () => {
    const [url, setUrl] = useState('');
    const [analyses, setAnalyses] = useState(null);
    const [scanUrl] = useScanUrlMutation();
    const [status, setStatus] = useState();

    const handleScan = () => {
        scanUrl(url).unwrap().then(data => {
            const { analyses = null, ...meta } = data
            setAnalyses(analyses);
            setStatus(analyses?.data?.attributes?.status ?? 'idle');
            console.log('analyses', analyses);
        });
    };

    return {
        url,
        setUrl,
        analyses,
        handleScan,
        status,
        setStatus,
    }


};

export default useVirusTotal;
