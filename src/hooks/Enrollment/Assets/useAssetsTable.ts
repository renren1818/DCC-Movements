"use client";

import { useEffect, useState } from "react";
import { useAssets } from "./useAssets";
import { CreateEquipment } from "@/interfaces/enrollment/Assets/Assets";
import { GridPaginationModel, GridRowClassNameParams } from "@mui/x-data-grid";
import { AssetsTabKey } from "@/interfaces/enrollment/Common/Tabkey";
import { IPagination } from "@/interfaces/enrollment/Common/Pagination";
import useDebounce from "@/hooks/Debounce";

export default function useAssetsTable() {
    const assets = useAssets();

    const [openModal, setOpenModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectAssets, setSelectAssets] = useState<CreateEquipment | undefined>();
    const [selectAssetsId, setSelectAssetsId] = useState<number | null>(null);
    const [query, setQuery] = useState("");

    const [pagination, setPagination] = useState<IPagination>({
        PageNumber: 0,
        OrderBy: "asc",
        ColumnToSort: "type",
        PageSize: 10,
        SearchQuery: "",
    } as IPagination);

    const [tab, setTab] = useState<AssetsTabKey>("all");

    const handleAction = async (action: "Open" | "Modify" | "Delete") => {
        if (action === "Open" && !selectAssetsId) {
            setOpenModal(true);
        }

        if (action === "Modify" && selectAssetsId) {
            try {
                const request = await assets.fetchEquipmentId(selectAssetsId);
                if (request) {
                    setSelectAssets(request);
                    setOpenModal(true);
                }
            } catch (error) {
                console.error("Error fetching equipment:", error);
            }
        }

        if (action === "Delete" && selectAssetsId) {
            setDeleteModal(true);
        }
    };

    const handleSave = async (id: number, equipment: CreateEquipment) => {
        try {
            if (!equipment.EquipmentId) {
                await assets.createEquipments(equipment);
            } else {
                await assets.updateEquipment(id, equipment);
            }
            setOpenModal(false);
            setSelectAssets(undefined);
        } catch (error) {
            console.error(error);
        }
    };

    const handleClose = () => {
        setOpenModal(false);
        setDeleteModal(false);
        setSelectAssetsId(null);
    };

    const handleDelete = async () => {
        if (!selectAssetsId) return setDeleteModal(false);
        await assets.deleteEquipment(selectAssetsId);
        assets.setData(assets.data.filter((x) => x.EquipmentId !== selectAssetsId));
        setDeleteModal(false);
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
        handleTabClick();
    }, [tab]);

    useEffect(() => {
        assets.fetchEquipment(pagination.SearchQuery, pagination.PageNumber, pagination.PageSize, pagination.ColumnToSort);
    }, [debouncedSearch, pagination.PageNumber, pagination.PageSize, pagination.ColumnToSort]);

    const sharedGridProps = {
        rows: assets.data,
        paginationModel: { pageSize: pagination.PageSize, page: pagination.PageNumber },
        rowCount: assets.totalCount * pagination.PageSize,
        paginationMode: "server" as const,
        checkboxSelection: true,
    };

    const handleTabClick = () => {
        switch (tab) {
            case "type":
                setPagination((prev) => ({
                    ...prev,
                    ColumnToSort: "type",
                    OrderBy: prev.OrderBy == "asc" ? "desc" : "asc",
                }));

                break;
            case "condition":
                setPagination((prev) => ({
                    ...prev,
                    ColumnToSort: "condition",
                    OrderBy: prev.OrderBy == "asc" ? "desc" : "asc",
                }));

                break;
            case "location":
                setPagination((prev) => ({
                    ...prev,
                    ColumnToSort: "location",
                    OrderBy: prev.OrderBy == "asc" ? "desc" : "asc",
                }));

                break;
            default:
                setPagination((prev) => ({
                    ...prev,
                    ColumnToSort: "type",
                    OrderBy: prev.OrderBy == "asc" ? "desc" : "asc",
                }));

                break;
        }
    };

    const getRowClassName = (params: GridRowClassNameParams) => (params.indexRelativeToCurrentPage % 2 === 0 ? "row-alt-gray" : "");

    return {
        deleteModal,
        selectAssets,
        selectAssetsId,
        assets,
        tab,
        setTab,
        openModal,
        query,
        setQuery,
        setSelectAssetsId,
        handleAction,
        handleClose,
        getRowClassName,
        handleDelete,
        handleSave,
        handleTabClick,
        handleSetPageSize,
        handleSearch,
        handeleColumnHeaderClick,
        pagination,
        sharedGridProps,
    };
}
