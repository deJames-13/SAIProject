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
    } = vtApi

    const [getUrlReports] = useGetUrlReportsMutation();
    const [getUrlReport] = useGetUrlReportMutation();
    const [saveUrlReport] = useSaveUrlReportMutation();
    const [editUrlReport] = useEditUrlReportMutation();
    const [deleteUrlReport] = useDeleteUrlReportMutation();

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

    return {
        reports,
        report,
        url,
        setUrl,
        fetchUrlReports,
        fetchUrlReport,
        createUrlReport,
        updateReport,
        removeReport,
    }









}
