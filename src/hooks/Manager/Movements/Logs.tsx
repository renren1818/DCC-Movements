'use client';

import { useDialogBoxContext } from "@/contexts/DialogBox";
import { useFetcher } from "@/hooks/Fetcher";
import { IDialog } from "@/interfaces/DialogBoxContext";
import { ILogs } from "@/interfaces/Movements/Logs";
import React from "react";

export default function useLogs() {

    const { openDialog } = useDialogBoxContext();
    const fetcher = useFetcher();

    const [logs, setLogs] = React.useState<ILogs>();
    const [page, setPage] = React.useState(1);
    const [searchQuery, setSearchQuery] = React.useState('');


    const fetchLogs = React.useCallback(() => {

        fetcher.POST('Movement/Logs', {
            ColumtoSort: '',
            orderBy: 'desc',
            pageNumber: page,
            pageSize: 10,
            searchQuery: searchQuery
        }).then((result) => setLogs(result.data.data));

    }, [page, searchQuery]); // eslint-disable-line react-hooks/exhaustive-deps

    React.useEffect(() => {

        fetchLogs();

    }, [fetchLogs]);

    const deleteLog = async (id: number) => {

        const result = await fetcher.DELETE(`Movement/Logs/${id}`);

        if (result.data.Success === true) {
        
            openDialog(108);
            
        } else {

            openDialog({ type: 'error', title: 'Unexpected Error', message: result.data.ErrorMessage } as IDialog);

        }

        fetchLogs();

    }

    return {
        logs,
        page, setPage,
        searchQuery, setSearchQuery,
        deleteLog
    }

}