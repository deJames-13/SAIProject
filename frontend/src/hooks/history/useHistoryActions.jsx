import { useState } from 'react';
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
    const { useSaveMutation, useGetMutation, useGetByIdMutation, use, useDeleteMutation } = api;
    const [data, setData] = useState([]);
    const [save] = useSaveMutation();
    const [get] = useGetMutation();
    const [getById] = useGetByIdMutation();
    const [deleteHistory] = useDeleteMutation();

    const fetchHistories = async () => {
        return get().unwrap().then((data) => {
            setData(data);
        });
    }

    const fetchHistoryById = async (id) => {
        return getById(id).unwrap();
    }



    const saveHistory = async (data) => {
        return save(data).unwrap().then((data) => {
            dispatch(actions.add(data));
        });
    };

    const deleteHistoryById = async (id) => {
        return deleteHistory(id).unwrap().then((data) => {
            dispatch(actions.delete(data));
        });
    };


    return {
        data,
        saveHistory,
        historyVerbose,
        fetchHistories,
        fetchHistoryById,
        deleteHistoryById,
    };
}