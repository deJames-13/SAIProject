import React from 'react';
import vtApi from 'states/virustotal/api';

export default function useFileReportAction() {
    const [reports, setReports] = React.useState([]);
    const [report, setReport] = React.useState(null);
    const [file, setFile] = React.useState(null);

    const {
        useGetFileReportsMutation,
        useGetFileReportMutation,
        useSaveFileReportMutation,
        useEditFileReportMutation,
        useDeleteFileReportMutation,
        useGetDeletedFileReportsMutation,
        useGetAllFileReportsMutation,
        useRestoreFileReportMutation
    } = vtApi

    const [getFileReports] = useGetFileReportsMutation();
    const [getFileReport] = useGetFileReportMutation();
    const [saveFileReport] = useSaveFileReportMutation();
    const [editFileReport] = useEditFileReportMutation();
    const [deleteFileReport] = useDeleteFileReportMutation();
    const [getAllFileReports] = useGetAllFileReportsMutation();
    const [getDeletedFileReports] = useGetDeletedFileReportsMutation();
    const [restoreFileReport] = useRestoreFileReportMutation();


    const fetchFileReports = async () => {
        return getFileReports()
            .then((response) => {
                setReports(response.data);
                return response;
            })
            .catch((error) => {
                console.error(error);
                return error;
            });
    };

    const fetchFileReport = async (id) => {
        return getFileReport(id)
            .then((response) => {
                setReport(response.data);
                if (response.error)
                    throw new Error(response.error);
                return response;
            })
            .catch((error) => {
                console.error(error);
                return error;
            });
    }

    const fetchDeletedFileReports = async () => {
        return getDeletedFileReports()
            .then((response) => {
                setReports(response.data);
                return response;
            })
            .catch((error) => {
                console.error(error);
                return error;
            });
    }

    const fetchAllFileReports = async () => {
        return getAllFileReports()
            .then((response) => {
                setReports(response.data);
                return response;
            })
            .catch((error) => {
                console.error(error);
                return error;
            });
    }

    const createFileReport = async (report) => {
        return saveFileReport(report)
            .then((response) => {
                setReport(response.data);

                if (response.error) {
                    throw new Error(response.error);
                }
                return response;
            })
            .catch((error) => {
                console.error(error);
                return error;
            });
    }


    const updateReport = async (report) => {
        return editFileReport(report)
            .then((response) => {
                setReport(response.data);
                if (response.error)
                    throw new Error(response.error);
                return response;
            })
            .catch((error) => {
                console.error(error);
                return error;
            });
    };

    const removeReport = async (id) => {
        return deleteFileReport(id)
            .then((response) => {
                if (response.error)
                    throw new Error(response.error);

                return response;
            })
            .catch((error) => {
                console.error(error);
                return error;
            });
    }

    const restoreReport = async (id) => {
        return restoreFileReport(id)
            .then((response) => {
                if (response.error)
                    throw new Error(response.error);

                return response;
            })
            .catch((error) => {
                console.error(error);
                return error;
            });
    }

    return {
        reports,
        setReports,
        report,
        fetchFileReports,
        fetchFileReport,
        fetchDeletedFileReports,
        fetchAllFileReports,
        createFileReport,
        updateReport,
        removeReport,
        restoreReport,
    }
}
