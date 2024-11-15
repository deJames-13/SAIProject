import useUrlReportAction from 'hooks/virustotal/useUrlReportAction';
import React from 'react';

export default function reportTable() {
    const {
        reports,
        fetchUrlReports,
    } = useUrlReportAction();

    React.useEffect(() => {
        fetchUrlReports();
    }, []);

    React.useEffect(() => {
        console.log(reports);
    }, [reports]);

    return {
        columns: [
            { Header: "url", accessor: "url", width: "45%", align: "left" },
            { Header: "times submitted", accessor: "timesSubmitted", width: "10%", align: "left" },
            { Header: "votes", accessor: "votes", align: "center" },
        ],
        rows: []
    }
}
