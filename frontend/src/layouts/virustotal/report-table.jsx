import { Icon } from '@mui/material';
import MDBox from 'components/MDBox';
import MDButton from 'components/MDButton';
import DataTable from 'components/Tables/DataTable';
import useUrlReportAction from 'hooks/virustotal/useUrlReportAction';
import React from 'react';
import Swal from 'sweetalert2';

export default function ReportTable() {
    const [results, setResults] = React.useState([]);
    const {
        reports,
        fetchUrlReports,
        removeReport
    } = useUrlReportAction();


    React.useEffect(() => {
        fetchUrlReports();
    }, []);

    React.useEffect(() => {
        if (reports?.results) {
            setResults(reports.results);
        }
    }, [reports]);


    const info = ((report, idx) => {
        return (
            <MDBox key={`info_` + idx} className='py-4'>
                <div className='flex gap-4 items-start'>
                    <div className='font-bold'>Title:</div>
                    <div>{report?.title}</div>
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
            { Header: "URL", accessor: "votes", width: "20%", align: "left" },
            { Header: "Submissions", accessor: "submissions", align: "center" },
            { Header: "Timestamp", accessor: "timestamp", align: "center" },
            { Header: "", accessor: "actions", align: "center" },

        ],
        rows: results.map((report, idx) => ({
            info: info(report, idx),
            votes: votes(report, idx),
            submissions: report?.times_submitted,
            timestamp: report?.timestamp,
            actions: (
                <MDBox display="flex" alignItems="center" justifyContent="center" gap={2}>
                    <MDButton color="primary">
                        <Icon>visibility</Icon>
                    </MDButton>

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
