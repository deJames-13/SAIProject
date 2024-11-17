import { Checkbox, Icon } from '@mui/material';
import select from 'assets/theme/components/form/select';
import MDBox from 'components/MDBox';
import MDButton from 'components/MDButton';
import DataTable from 'components/Tables/DataTable';
import useNotification from 'hooks/notifications/useNotification';
import useFileReportAction from 'hooks/virustotal/useFileReportAction';
import useUrlReportAction from 'hooks/virustotal/useUrlReportAction';
import React from 'react';
import { parse } from 'stylis';
import Swal from 'sweetalert2';
import ScanModal from './scan-modal';
import ScanModalContent from './scan-modal-content';

const DeleteAction = ({ removeReport = async () => { }, report, setResults, results }) => {
    return (
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
    )
}

const RestoreAction = ({ restoreReport = async () => { }, report, setResults, results }) => {
    return (
        <MDButton
            color="success"
            onClick={() => {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, restore it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        restoreReport(report?.id).then(() => {
                            setResults(results.filter((item) => item.id !== report.id));
                            Swal.fire(
                                'Restored!',
                                'Your file has been restored.',
                                'success'
                            )
                        })
                    }
                })
            }}

        >
            <Icon>restore</Icon>
        </MDButton>
    )
}

export default function ReportTable({ type = "url" }) {
    // reports - reports only
    // all - all reports including deleted
    // deleted - deleted reports only
    const [state, setState] = React.useState('reports');
    const [results, setResults] = React.useState([]);
    const [selected, setSelected] = React.useState([]);

    const {
        reports: urlReports,
        setReports: setUrlReports,
        fetchUrlReports,
        fetchDeletedUrlReports,
        fetchAllUrlReports,
        removeReport: removeUrlReport,
        restoreReport: restoreUrlReport,
        removeReports: removeUrlReports,
        restoreReports: restoreUrlReports,
    } = useUrlReportAction();

    const {
        reports: fileReports,
        setReports: setFileReports,
        fetchFileReports,
        fetchDeletedFileReports,
        fetchAllFileReports,
        removeReport: removeFileReport,
        restoreReport: restoreFileReport,
        removeReports: removeFileReports,
        restoreReports: restoreFileReports,
    } = useFileReportAction()

    const fetchDeleted = type === 'url' ? fetchDeletedUrlReports : fetchDeletedFileReports;
    const fetchAll = type === 'url' ? fetchAllUrlReports : fetchAllFileReports;
    const fetchReports = type === 'url' ? fetchUrlReports : fetchFileReports;
    const removeReport = type === 'url' ? removeUrlReport : removeFileReport;
    const restoreReport = type === 'url' ? restoreUrlReport : restoreFileReport;
    const reports = type === 'url' ? urlReports : fileReports;
    const setReports = type === 'url' ? setUrlReports : setFileReports;
    const removeReports = type === 'url' ? removeUrlReports : removeFileReports;
    const restoreReports = type === 'url' ? restoreUrlReports : restoreFileReports;

    React.useEffect(() => {
        fetchReports()
    }, [type]);

    React.useEffect(() => {
        if (reports?.results)
            setResults(reports.results)
    }, [reports]);

    // React.useEffect(() => {
    //     console.log(selected)
    // }, [selected]);

    const handleStateChange = (state) => async () => {
        setSelected([]);
        const swapReport = async () => {
            setState(state);
            if (state === 'reports') {
                return fetchReports();
            } else if (state === 'deleted') {
                return fetchDeleted();
            } else if (state === 'all') {
                return fetchAll();
            }
        }
        swapReport().then((res) => {
            if (!res?.data) return;
            setReports(res.data);
            setResults(res.data?.results || res.data);
        }).catch((err) => {
            console.error(err)
        });



    }

    const handleSelect = (e) => {
        const id = parseInt(e.target.value);
        const isChecked = e.target.checked;
        if (isChecked) {
            setSelected([...selected, id]);
        } else {
            setSelected(selected.filter((item) => item !== id));
        }
    }

    const handleMultiDelete = () => {
        return removeReports(selected).then(() => {
            setResults(results.filter((item) => !selected.includes(parseInt(item.id))));
            setSelected([]);
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        });
    }
    const onMultiDelete = () => {
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
                handleMultiDelete()
            }
        })
    }

    const handleMultiRestore = () => {
        return restoreReports(selected).then(() => {
            setResults(results.filter((item) => !selected.includes(parseInt(item.id))));
            setSelected([]);
            Swal.fire(
                'Restored!',
                'Your file has been restored.',
                'success'
            )
        });
    }

    const onMultiRestore = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, restore it!'
        }).then((result) => {
            if (result.isConfirmed) {
                handleMultiRestore()
            }
        })
    }


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
            // checkboxes for mass delete and restore
            { Header: "", accessor: "select", align: "center" },
            { Header: "ID", accessor: "id", width: "10%", align: "center" },
            { Header: "Info", accessor: "info", width: "25%", align: "left" },
            { Header: "Votes", accessor: "votes", width: "20%", align: "left" },
            { Header: "Submissions", accessor: "submissions", align: "center" },
            { Header: "Timestamp", accessor: "timestamp", align: "center" },
            { Header: "", accessor: "actions", align: "center" },

        ],
        rows: results.map((report, idx) => ({
            select: <Checkbox value={report.id} checked={selected.includes(report.id)} onChange={(e) => handleSelect(e)} />,
            id: report?.id,
            info: report?.file_name || report?.title,
            votes: votes(report?.analysis, idx),
            submissions: report?.analysis?.times_submitted,
            timestamp: <span>{report?.timestamp}</span>,
            actions: (
                <MDBox display="flex" alignItems="center" justifyContent="center" gap={2}>
                    <ScanModal
                        topElement={<span className='font-bold uppercase'>View Scanned</span>}
                        contentElement={<ScanModalContent report={report} idx={idx} type={type} />}
                    />
                    {!report?.is_deleted ?
                        <DeleteAction removeReport={removeReport} report={report} setResults={setResults} results={results} />
                        : <RestoreAction restoreReport={restoreReport} report={report} setResults={setResults} results={results} />
                    }
                </MDBox>
            )
        }))
    }
    return <>
        {/* Tabs */}
        <MDBox className="w-full">
            <MDBox className="flex gap-2 w-full justify-end items-center">
                <div className="flex gap-2 mr-auto">
                    {
                        selected.length > 0 && state !== 'reports' && <>
                            <MDButton
                                onClick={onMultiRestore}
                                className='hidden md:block bg-green-500 text-white'
                            >
                                Restore All
                            </MDButton>
                        </>
                    }
                    {
                        selected.length > 0 && state !== 'deleted' && <>
                            <MDButton
                                onClick={onMultiDelete}
                                className='hidden md:block bg-red-500 text-white hover:bg-red-400'
                            >
                                Delete All
                            </MDButton>
                        </>
                    }
                </div>
                <MDButton
                    color={state === 'reports' ? 'primary' : 'light'}
                    onClick={handleStateChange('reports')}
                >
                    Reports
                </MDButton>
                <MDButton
                    color={state === 'deleted' ? 'primary' : 'light'}
                    onClick={handleStateChange('deleted')}
                >
                    Deleted
                </MDButton>
                <MDButton
                    color={state === 'all' ? 'primary' : 'light'}
                    onClick={handleStateChange('all')}
                >
                    All
                </MDButton>
            </MDBox>

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
                                entriesPerPage={{ defaultValue: 5, entries: [5, 10, 15, 20, 25] }}
                                canSearch={true}
                                showTotalEntries={true}
                                pagination={{
                                    color: "primary",
                                    variant: "gradient"
                                }}
                                noEndBorder={false}
                            />
                        }
                    </>
            }
        </MDBox >
    </>
}
