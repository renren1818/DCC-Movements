// hooks/useAsnList.ts
import { useEffect, useState } from "react";
import { useFetcher } from "../Fetcher";
import { AsnRecord, CreateAsn } from "@/interfaces/AsnList/AsnList";
import { useSession } from "@/contexts/Session";
import { CreateAsnWithOrders } from "./useAsnTable";

export default function useAsnList() {
    const fetcher = useFetcher();
    const { user } = useSession();

    const [data, setData] = useState<AsnRecord[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [currentAsn, setCurrentAsn] = useState<CreateAsn | null>(null);

    const fetchAsnList = async (query: string = "", pageNumber: number = 0, pageSize: number = 10, tab?: string) => {
        try {
            const res = await fetcher.POST("/asn/GetPaginationAsnAsync", {
                searchQuery: query,
                pageNumber: pageNumber + 1,
                pageSize,
                pageCount: 0,
                columnToSort: tab ?? "",
                orderBy: "asc",
            });

            const list = res.data.Item1 ?? [];
            const asnData: AsnRecord[] = list.map((asn: AsnRecord) => ({
                id: asn.AsnId,
                AsnId: asn.AsnId,
                AsnNumber: asn.AsnNumber,
                ContainerNumber: asn.ContainerNumber,
                CreatedBy: asn.CreatedBy,
                CreatedDate: asn.CreatedDate,
                PoNumber: asn.PoNumber,
                RecordCreator: asn.RecordCreator,
            }));

            setData(asnData);
            setTotalCount(res.data.Item2);
        } catch (err) {
            console.error("Failed to fetch ASN list", err);
        }
    };

    const fetchSkuItemName = async (poNumber: number) => {
        try {
            const res = await fetcher.GET(`/purchaseOrder/GetPoSKUItemName?PONumber=${poNumber}`);
            const skuItems = res.data?.data ?? [];

            return skuItems.map((sku: any) => ({
                PurchaseOrderNumber: sku.PurchaseOrderNumber,
                SKU: sku.SKU,
                ItemName: sku.ItemName,
                PODetailIds: sku.PODetailIds,
            }));
        } catch (err) {
            console.error("Failed to fetch SKU items", err);
            return [];
        }
    };

    const createAsnDetails = async (asn: CreateAsn) => {
        try {
            const res = await fetcher.POST("/asn/CreateASnWithDetails", {
                UserId: user?.UserId,
                AsnNumber: asn.AsnNumber,
                ContainerNumber: asn.ContainerNumber,
                PODetailIds: asn.PODetailIds,
            });
            await fetchAsnList();
            setCurrentAsn(null);
            return res.data.data ?? res.data;
        } catch (err) {
            console.error("Failed to create ASN", err);
        }
    };

    const fetchAsnById = async (id: number) => {
        try {
            const res = await fetcher.GET(`/asn/GetAsnById?asnId=${id}`);
            const asn = res.data.data ?? res.data;
            setCurrentAsn(asn);
            return asn;
        } catch (err) {
            console.error("Failed to fetch ASN by ID", err);
        }
    };

    const updateAsn = async (asn: CreateAsn) => {
        try {
            const res = await fetcher.POST("/asn/UpdateAsnAsync", {
                AsnId: asn.AsnId,
                AsnNumber: asn.AsnNumber,
                ContainerNumber: asn.ContainerNumber,
                UserId: user?.UserId,
            });
            await fetchAsnList();
            setCurrentAsn(null);
            return res.data.data ?? res.data;
        } catch (err) {
            console.error("Failed to update ASN", err);
        }
    };

    const updateDetails = async (update: CreateAsnWithOrders) => {
        try {
            const request = await fetcher.POST("/asn/UpdateCreateASnWithDetails", {
                AsnId: update.AsnId,
                AsnNumber: update.AsnNumber,
                ContainerNumber: update.ContainerNumber,
                PODetailIds: update.PODetailIds,
                UserId: user?.UserId,
            });

            return request.data.data ?? request.data;
        } catch (error) {
            console.error("Failed top update the AsnDetails", error);
        }
    };

    const deleteAsn = async (id: number) => {
        try {
            const res = await fetcher.GET(`/asn/DeleteAsnById?asnId=${id}`);
            await fetchAsnList();

            setCurrentAsn(null); // clear after delete
            return res.data.data ?? res.data;
        } catch (err) {
            console.error("Failed to delete ASN", err);
        }
    };

    useEffect(() => {
        fetchAsnList();
    }, []);

    return {
        data,
        currentAsn,
        setCurrentAsn,
        fetchAsnList,
        fetchSkuItemName,
        createAsnDetails,
        updateDetails,
        fetchAsnById,
        updateAsn,
        deleteAsn,
        totalCount,
    };
}
