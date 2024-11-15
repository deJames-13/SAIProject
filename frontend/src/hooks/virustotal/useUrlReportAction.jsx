import useNotification from 'hooks/notifications/useNotification';
import React from 'react';
import vtApi from 'states/virustotal/api';

export default function useUrlReportAction() {
    const noti = useNotification();
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
                noti.success('Reports fetched successfully');
                return response;
            })
            .catch((error) => {
                console.error(error);
                noti.error('Failed to fetch reports');
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

    const createReport = async (report) => {
        return saveUrlReport(report)
            .then((response) => {
                setReport(response.data);

                if (response.error) {
                    noti.error(Object.values(response.error?.data || {}).map((item) => item.join('\n')).join(' '));
                    throw new Error(response.error);
                }


                noti.success('Report created successfully');
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
                noti.success('Report deleted successfully');
                setReports(reports.filter((report) => report.id !== id));
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
        createReport,
        updateReport,
        removeReport,
        renderNotifications: noti.renderNotifications,
    }









}
