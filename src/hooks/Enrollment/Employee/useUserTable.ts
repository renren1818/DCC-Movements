"use client";

import { useState, useEffect } from "react";
import { GridPaginationModel, GridRowClassNameParams } from "@mui/x-data-grid";
import { AddUser } from "@/interfaces/enrollment/Employee/User";
import useEmployee from "@/hooks/Enrollment/Employee/useEmployee";
import { EmployeeTabKey } from "@/interfaces/enrollment/Common/Tabkey";
import { IPagination } from "@/interfaces/enrollment/Common/Pagination";
import useDebounce from "@/hooks/Debounce";

export default function useUserTable() {
    const peopleEnrollment = useEmployee();

    const [openAddModal, setOpenAddModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<AddUser | undefined>();
    const [selectUserId, setSelectUserId] = useState<number | null>(null);
    const [query, setQuery] = useState("");

    const [pagination, setPagination] = useState<IPagination>({
        PageNumber: 0,
        OrderBy: "asc",
        ColumnToSort: "EmployeeNumber",
        PageSize: 10,
        SearchQuery: "",
    } as IPagination);

    const [tab, setTab] = useState<EmployeeTabKey>("all");

    useEffect(() => {
        paginatedRows();
    }, [tab]);

    const paginatedRows = () => {
        switch (tab) {
            case "Team":
                setPagination((prev) => ({
                    ...prev,
                    ColumnToSort: "Team",
                    OrderBy: prev.OrderBy == "asc" ? "desc" : "asc",
                }));
                break;

            case "Rank":
                setPagination((prev) => ({
                    ...prev,
                    ColumnToSort: "Rank",
                    OrderBy: prev.OrderBy == "asc" ? "desc" : "asc",
                }));
                break;
            case "Location":
                setPagination((prev) => ({
                    ...prev,
                    ColumnToSort: "Location",
                    OrderBy: prev.OrderBy == "asc" ? "desc" : "asc",
                }));
                break;
            default:
                setPagination((prev) => ({
                    ...prev,
                    ColumnToSort: "EmployeeNumber",
                    OrderBy: prev.OrderBy == "asc" ? "desc" : "asc",
                }));
        }
    };

    const getRowClassName = (params: GridRowClassNameParams) => (params.indexRelativeToCurrentPage % 2 === 0 ? "row-alt-gray" : "");

    const handleOpen = async (action: "add" | "modify" | "delete") => {
        if (action === "add") {
            if (!selectUserId) {
                setOpenAddModal(true);
            }
        }

        if (action === "modify" && selectUserId) {
            const employee = await peopleEnrollment.fetchUpdateUser(selectUserId ?? 0);

            setSelectedUser(employee);
            setOpenAddModal(true);
        }

        if (action === "delete" && selectUserId) {
            setDeleteModal(true);
        }
    };

    const handleClose = () => {
        setOpenAddModal(false);
        setDeleteModal(false);
        setSelectedUser(undefined);
        setSelectUserId(null);
    };

    const handleDelete = async () => {
        if (!selectUserId) return setDeleteModal(false);

        await peopleEnrollment.fetchDeleteUser(selectUserId);

        peopleEnrollment.setData(peopleEnrollment.data.filter((x) => x.UserId !== selectUserId));
        setDeleteModal(false);
    };

    const handleSave = async (user: AddUser): Promise<void> => {
        if (!user.UserId) {
            await peopleEnrollment.addUser(user);
        } else {
            await peopleEnrollment.setUserUpdate(user);
        }

        await peopleEnrollment.fetchUsers(query, pagination.PageNumber, pagination.PageSize, tab);

        setOpenAddModal(false);
        setSelectedUser(undefined);
    };

    const sharedGridProps = {
        rows: peopleEnrollment.data,
        paginationModel: { pageSize: pagination.PageSize, page: pagination.PageNumber },
        rowCount: peopleEnrollment.totalCount * pagination.PageSize,
        paginationMode: "server" as const,
        checkboxSelection: true,
    };

    const handleSearch = (searchVal: string) => {
        setPagination((prev) => ({
            ...prev,
            SearchQuery: searchVal,
            PageNumber: 0,
        }));
    };

    const handleSetPageSize = (data: GridPaginationModel) => {
        setPagination((prev) => ({
            ...prev,
            PageSize: data.pageSize,
            PageNumber: data.page,
        }));
    };

    const handeleColumnHeaderClick = (col: string) => {
        setPagination((prev) => ({
            ...prev,
            ColumnToSort: col,
            OrderBy: prev.OrderBy == "asc" ? "desc" : "asc",
        }));
    };

    const debouncedSearch = useDebounce(pagination.SearchQuery, 700);

    useEffect(() => {
        peopleEnrollment.fetchUsers(pagination.SearchQuery, pagination.PageNumber, pagination.PageSize, pagination.ColumnToSort);
    }, [debouncedSearch, pagination.ColumnToSort, pagination.OrderBy, pagination.PageNumber, pagination.PageSize]);

    return {
        tab,
        setTab,
        query,
        setQuery,
        openAddModal,
        deleteModal,
        selectedUser,
        selectUserId,
        setSelectUserId,
        handleOpen,
        handleClose,
        handleDelete,
        handleSave,
        getRowClassName,
        sharedGridProps,
        peopleEnrollment,
        handeleColumnHeaderClick,
        handleSearch,
        handleSetPageSize,
        pagination,
    };
}
