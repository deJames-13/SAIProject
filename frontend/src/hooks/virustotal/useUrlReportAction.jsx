import React from 'react';
import vtApi from 'states/virustotal/api';

export default function useUrlReportAction() {
    const [reports, setReports] = React.useState([]);
    const [report, setReport] = React.useState(null);
    const [url, setUrl] = React.useState('');

    const {
        useGetUrlReportsMutation,
        useGetUrlReportMutation,
        useSaveUrlReportMutation,
        useEditUrlReportMutation,
        useDeleteUrlReportMutation,
        useGetDeletedUrlReportsMutation,
        useGetAllUrlReportsMutation,
        useRestoreUrlReportMutation,
        useDeleteUrlReportsMutation,
        useRestoreUrlReportsMutation,
    } = vtApi

    const [getUrlReports] = useGetUrlReportsMutation();
    const [getUrlReport] = useGetUrlReportMutation();
    const [saveUrlReport] = useSaveUrlReportMutation();
    const [editUrlReport] = useEditUrlReportMutation();
    const [deleteUrlReport] = useDeleteUrlReportMutation();
    const [getAllUrlReports] = useGetAllUrlReportsMutation();
    const [getDeletedUrlReports] = useGetDeletedUrlReportsMutation();
    const [restoreUrlReport] = useRestoreUrlReportMutation();
    const [deleteUrlReports] = useDeleteUrlReportsMutation();
    const [restoreUrlReports] = useRestoreUrlReportsMutation();

    const fetchUrlReports = async () => {
        return getUrlReports()
            .then((response) => {
                setReports(response.data);
                return response;
            })
            .catch((error) => {
                console.error(error);
                return error;
            });
    };

    const fetchUrlReport = async (id) => {
        return getUrlReport(id)
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

    const fetchDeletedUrlReports = async () => {
        return getDeletedUrlReports()
            .then((response) => {
                setReports(response.data);
                return response;
            })
            .catch((error) => {
                console.error(error);
                return error;
            });
    }

    const fetchAllUrlReports = async () => {
        return getAllUrlReports()
            .then((response) => {
                setReports(response.data);
                return response;
            })
            .catch((error) => {
                console.error(error);
                return error;
            });
    }

    const createUrlReport = async (report) => {
        return saveUrlReport(report)
            .then((response) => {
                setReport(response.data);

                if (response.error) {
                    throw new Error(response.error);
                }


                return response;
            })
    }

    const updateReport = async (report) => {
        return editUrlReport(report)
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
        return deleteUrlReport(id)
            .then((response) => {
                if (response.error)
                    throw new Error(response.error);

                return response;
            })
            .catch((error) => {
                console.error(error);
                return error;
            });
    };

    const restoreReport = async (id) => {
        return restoreUrlReport(id)
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

    const removeReports = async (ids) => {
        return deleteUrlReports(ids)
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

    const restoreReports = async (ids) => {
        return restoreUrlReports(ids)
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
        url,
        setUrl,
        fetchUrlReports,
        fetchUrlReport,
        fetchDeletedUrlReports,
        fetchAllUrlReports,
        createUrlReport,
        updateReport,
        removeReport,
        restoreReport,
        removeReports,
        restoreReports,
    }









}
