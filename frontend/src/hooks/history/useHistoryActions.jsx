import { useDispatch } from 'react-redux';
import api from 'states/history/api';
import { actions } from 'states/history/slice';

const historyVerbose = {
    url: {
        title: "URL Scan. ",
        message: "User scanned a URL. URL: ",
    },
    file: {
        title: "File Scan. ",
        message: "User scanned a file. File: ",
    },
    hash: {
        title: "Hash Scan. ",
        message: "User scanned a hash. Hash: ",
    },
    urlReport: {
        title: "URL Report. ",
        message: "",
    },
    fileReport: {
        title: "File Repor. t",
        message: "",
    },
    manageReports: {
        title: "Manage Reports. ",
        message: "",
    },
}


export default function useHistoryActions() {
    const dispatch = useDispatch();
    const { useSaveMutation, useGetQuery, useDeleteMutation } = api;
    const [save] = useSaveMutation();
    const { data: historyData } = useGetQuery();
    const [deleteHistory] = useDeleteMutation();

    const saveHistory = async (data) => {
        try {
            const savedData = await save(data).unwrap();
            dispatch(actions.save(savedData));
        } catch (error) {
            console.error('Failed to save history:', error);
        }
    };

    const deleteHistoryById = async (id) => {
        try {
            await deleteHistory(id).unwrap();
            dispatch(actions.delete(id));
        } catch (error) {
            console.error('Failed to delete history:', error);
        }
    };

    // Dispatch setHistory action to initialize the history state
    if (historyData) {
        dispatch(actions.setHistory(historyData));
    }

    return {
        saveHistory,
        historyData,
        historyVerbose,
        deleteHistoryById,
    };
}