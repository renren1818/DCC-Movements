"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { AsnTab, CreateAsn, PurchaseOrderSkuItemName, AsnDetails } from "@/interfaces/AsnList/AsnList";
import useAsnList from "@/hooks/AsnList/useAsnList";
import { IPagination } from "@/interfaces/enrollment/Common/Pagination";
import useDebounce from "../Debounce";
import { GridPaginationModel } from "@mui/x-data-grid";

export type CreateAsnWithOrders = CreateAsn & {
    PurchaseOrders: PurchaseOrderSkuItemName[];
};

export default function useAsnTable() {
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [skuItems, setSkuItems] = useState<PurchaseOrderSkuItemName[]>([]);
    const [selectAsn, setSelectAsn] = useState<CreateAsnWithOrders>();
    const [selectAsnId, setSelectAsnId] = useState<number | null>(null);
    const [selectAsnNumber, setSelectAsnNumber] = useState<string | null>(null);
    const { data, fetchSkuItemName, createAsnDetails, fetchAsnList, fetchAsnById, updateAsn, deleteAsn, updateDetails, totalCount } =
        useAsnList();

    const [pagination, setPagination] = useState<IPagination>({
        PageNumber: 0,
        OrderBy: "asc",
        ColumnToSort: "type",
        PageSize: 10,
        SearchQuery: "",
    } as IPagination);

    const [tab, setTab] = useState<AsnTab>("all");

    const debouncedSearch = useDebounce(pagination.SearchQuery, 700);

    useEffect(() => {
        fetchAsnList(pagination.SearchQuery, pagination.PageNumber, pagination.PageSize, pagination.ColumnToSort);
    }, [debouncedSearch, pagination.PageNumber, pagination.PageSize, pagination.ColumnToSort]);

    const handleFetchSkuItems = async (poNumber: number) => {
        try {
            const items = await fetchSkuItemName(poNumber);
            setSkuItems(Array.isArray(items) ? items : []);
        } catch (error) {
            console.error("Error fetching SKU items:", error);
            setSkuItems([]);
        }
    };

    const handleOpen = async (action: "Open" | "Modify" | "Delete") => {
        if (action === "Open") {
            setSelectAsnId(null);
            setSelectAsn({
                AsnNumber: "",
                ContainerNumber: "",
                PODetailIds: [],
                UserId: 0,
                PurchaseOrders: [],
            });
            setSkuItems([]);
            setOpenDialog(true);
            return;
        }

        if (action === "Modify" && selectAsnId) {
            try {
                const asn = await fetchAsnById(selectAsnId);
                if (!asn || !Array.isArray(asn.AsnDetails)) return;

                const purchaseOrders = asn.AsnDetails.map((detail: AsnDetails) => ({
                    PurchaseOrderNumber: detail.PurchaseOrderNumber,
                    SKU: String(detail.SKU),
                    ItemName: detail.ItemName,
                    PODetailIds: detail.PODetailIds,
                }));

                const enrichedAsn: CreateAsnWithOrders = {
                    AsnId: asn.AsnId,
                    AsnNumber: asn.AsnNumber,
                    ContainerNumber: asn.ContainerNumber,
                    PODetailIds: asn.AsnDetails.map((p: any) => p.PODetailIds),
                    UserId: Number(asn.CreatedBy ?? 0),
                    PurchaseOrders: purchaseOrders,
                };

                setSelectAsn(enrichedAsn);
                setOpenDialog(true);
            } catch (error) {
                console.error("Error fetching ASN:", error);
            }
            return;
        }

        if (action === "Delete" && selectAsnId) {
            setDeleteModal(true);
        }
    };

    const handleClose = () => {
        setOpenDialog(false);
        setDeleteModal(false);
        setSearchTerm("");
        setSkuItems([]);
        setSelectAsn(undefined);
        setSelectAsnId(null);
        setSelectAsnNumber(null);
    };

    const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectAsn((prev: any) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleAddRemovePoId = (id: number, isAddition: boolean) => {
        const purchaseShit = skuItems;

        setSelectAsn((prev: any) => {
            const list = prev?.PODetailIds ?? [];
            const purchaseOrders = prev?.PurchaseOrders ?? [];

            return {
                ...prev,
                PurchaseOrders: !isAddition
                    ? purchaseOrders?.filter((x: any) => x.PODetailIds !== id)
                    : [...purchaseOrders, purchaseShit.find((x) => x.PODetailIds === id)],
                PODetailIds: list.includes(id) ? list.filter((x: number) => x !== id) : [...list, id],
            };
        });
    };

    const handleSave = async (asn: CreateAsnWithOrders) => {
        try {
            if (!asn.AsnId) {
                await createAsnDetails(asn);
            } else {
                await updateAsn(asn);
                await updateDetails(selectAsn as CreateAsnWithOrders);
            }

            await fetchAsnList();

            setOpenDialog(false);
            setSelectAsnId(null);
            setSelectAsnNumber(null);

            handleClose();
        } catch (error) {
            console.error("Error saving ASN", error);
        }
    };

    const filteredSkuItems = !searchTerm
        ? skuItems
        : skuItems.filter(
              (i) =>
                  i.PurchaseOrderNumber.toString().includes(searchTerm) ||
                  i.SKU.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  i.ItemName.toLowerCase().includes(searchTerm.toLowerCase())
          );

    const handleDelete = async () => {
        if (!selectAsnId) return;
        try {
            await deleteAsn(selectAsnId);
            await fetchAsnList();
            setSelectAsnId(null);
            setSelectAsnNumber(null);
            setDeleteModal(false);
            handleClose();
        } catch (error) {
            console.error("Error deleting ASN", error);
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            const n = Number(searchTerm);
            if (searchTerm && !Number.isNaN(n)) {
                handleFetchSkuItems(n);
            }
        }, 400);
        return () => clearTimeout(timeout);
    }, [searchTerm]);

    const sharedGridProps = {
        rows: data,
        paginationModel: { pageSize: pagination.PageSize, page: pagination.PageNumber },
        rowCount: totalCount * pagination.PageSize,
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

    const handleTabClick = () => {
        switch (tab) {
            case "asn":
                setPagination((prev) => ({
                    ...prev,
                    ColumnToSort: "asn",
                    OrderBy: prev.OrderBy == "asc" ? "desc" : "asc",
                }));

                break;
            case "containernumber":
                setPagination((prev) => ({
                    ...prev,
                    ColumnToSort: "containernumber",
                    OrderBy: prev.OrderBy == "asc" ? "desc" : "asc",
                }));

                break;
            default:
                setPagination((prev) => ({
                    ...prev,
                    ColumnToSort: "asn",
                    OrderBy: prev.OrderBy == "asc" ? "desc" : "asc",
                }));

                break;
        }
    };

    useEffect(() => {
        handleTabClick();
    }, [tab]);

    return {
        openDialog,
        deleteModal,
        tab,
        rows: data,
        selectAsn,
        searchTerm,
        selectAsnNumber,
        setTab,
        setSearchTerm,
        filteredSkuItems,
        handleOpen,
        handleClose,
        handleSave,
        handleDelete,
        handleFetchSkuItems,
        skuItems,
        setSelectAsnId,
        setSelectAsnNumber,
        handleAddRemovePoId,
        handleFieldChange,
        selectAsnId,
        sharedGridProps,
        pagination,
        handleSetPageSize,
        handleSearch,
        handeleColumnHeaderClick,
    };
}
