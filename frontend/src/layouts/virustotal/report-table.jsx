import { Icon } from '@mui/material';
import MDBox from 'components/MDBox';
import MDButton from 'components/MDButton';
import DataTable from 'components/Tables/DataTable';
import useNotification from 'hooks/notifications/useNotification';
import useFileReportAction from 'hooks/virustotal/useFileReportAction';
import useUrlReportAction from 'hooks/virustotal/useUrlReportAction';
import React from 'react';
import Swal from 'sweetalert2';
import ScanModal from './scan-modal';
import ScanModalContent from './scan-modal-content';

export default function ReportTable({ type = "url" }) {
    const [results, setResults] = React.useState([]);

    const {
        reports: urlReports,
        setReports: setUrlReports,
        fetchUrlReports,
        removeReport: removeUrlReport
    } = useUrlReportAction();

    const {
        reports: fileReports,
        setReports: setFileReports,
        fetchFileReports,
        removeReport: removeFileReport
    } = useFileReportAction()

    const removeReport = type === 'url' ? removeUrlReport : removeFileReport;
    const fetchReports = type === 'url' ? fetchUrlReports : fetchFileReports;
    const reports = type === 'url' ? urlReports : fileReports;



    React.useEffect(() => {
        fetchReports()
    }, [type]);


    React.useEffect(() => {
        if (reports?.results)
            setResults(reports.results)
    }, [reports]);

    // React.useEffect(() => {
    //     console.log(reports);
    // }, [reports]);



    const info = ((report, idx) => {
        return (
            <MDBox key={`info_` + idx} className='py-4'>
                <div className='flex gap-4 items-start'>
                    <div className='font-bold'>Title:</div>
                    {type === 'file' && <div className='break-words'>{report?.file_name}</div>}
                    {type === 'url' && <div className='break-words'>{report?.title}</div>}
                </div>
            </MDBox>
        )
    });

    const votes = (({ votes }, idx) => {
        return <>
            <div className="flex flex-wrap gap-2">
                {Object.entries(votes || {}).map(([key, value]) => {
                    return (
                        <MDBox className='flex gap-4 items-start' key={key + idx}>
                            <span className='font-bold'>{key}:</span>
                            <span>{value}</span>
                        </MDBox >
                    )
                })}
            </div>
        </>
    })
    const data = !results?.length ? {} : {
        columns: [
            { Header: "Info", accessor: "info", width: "25%", align: "left" },
            { Header: "Votes", accessor: "votes", width: "20%", align: "left" },
            { Header: "Submissions", accessor: "submissions", align: "center" },
            { Header: "Timestamp", accessor: "timestamp", align: "center" },
            { Header: "", accessor: "actions", align: "center" },

        ],
        rows: results.map((report, idx) => ({
            info: info(report, idx),
            votes: votes(report?.analysis, idx),
            submissions: report?.analysis?.times_submitted,
            timestamp: report?.timestamp,
            actions: (
                <MDBox display="flex" alignItems="center" justifyContent="center" gap={2}>
                    <ScanModal
                        topElement={<span className='font-bold uppercase'>View Scanned</span>}
                        contentElement={<ScanModalContent report={report} idx={idx} type={type} />}
                    />
                    <MDButton
                        color="error"
                        onClick={() => {
                            Swal.fire({
                                title: 'Are you sure?',
                                text: "You won't be able to revert this!",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Yes, delete it!'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    removeReport(report?.id).then(() => {
                                        setResults(results.filter((item) => item.id !== report.id));
                                        Swal.fire(
                                            'Deleted!',
                                            'Your file has been deleted.',
                                            'success'
                                        )
                                    })
                                }
                            })
                        }}

                    >
                        <Icon>delete</Icon>
                    </MDButton>

                </MDBox>
            )
        }))
    }
    return <>
        {
            !results?.length ?
                <MDBox display="flex" justifyContent="center" alignItems="center" height="100%" width="100%">
                    <h1 className='font-bold uppercase'>No reports found</h1>
                </MDBox> :

                <>
                    {
                        results.length > 0 &&
                        <DataTable
                            table={data}
                        />
                    }
                </>
        }
    </>
}
