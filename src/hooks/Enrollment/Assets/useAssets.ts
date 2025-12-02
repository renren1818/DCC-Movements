import { useFetcher } from "@/hooks/Fetcher";
import { CreateEquipment, EquipmentList, EquipmentType } from "@/interfaces/enrollment/Assets/Assets";
import { SharedOption } from "@/interfaces/enrollment/Common/SharedOption";
import { DateAgeFormatter } from "@/utils/DateAgeFormater";
import { DateFormater } from "@/utils/DateFormater";

import { useEffect, useState } from "react";

export function useAssets() {
    const fetcher = useFetcher();

    const [totalCount, setTotalCount] = useState(0);
    const [data, setData] = useState<EquipmentList[]>([]);
    const [equipmentType, setEquipmentType] = useState<EquipmentType[]>([]);
    const [location, setLocation] = useState<SharedOption[]>([]);

    const fetchCenter = async () => {
        try {
            const response = await fetcher.GET("/dc/SelectDc");

            const data = response.data.data ?? response.data;
            const centerData: SharedOption[] = data.map((center: SharedOption, index: number) => ({
                Value: center.Value || index,
                Label: center.Label,
                Disabled: center.Disabled,
            }));

            setLocation(centerData);
        } catch (error) {
            console.error("There are only one distribution center");
        }
    };

    const fetchEquipment = async (query: string = "", pageNumber: number = 0, pageSize: number = 10, tab?: string) => {
        try {
            const response = await fetcher.POST("/equipment/GetEquipmentList", {
                searchQuery: query,
                pageNumber: pageNumber + 1,
                pageSize,
                pageCount: 0,
                columnToSort: tab ?? "",
                orderBy: "asc",
            });

            const assetData = response.data.data.data ?? response.data;

            const fetchEquipments: EquipmentList[] = assetData.map((asset: EquipmentList) => ({
                id: asset.EquipmentId,
                EquipmentId: asset.EquipmentId,
                EquipmentStatus: asset.EquipmentStatus,
                EquipmentType: asset.EquipmentType,
                Age: DateAgeFormatter(asset.PurchaseDate),
                Code: asset.Code,
                IsDeleted: asset.IsDeleted,
                LastAssignment: asset.LastAssignment,
                Location: asset.Location,
                Name: asset.Name,
                IncidentDate: DateFormater(asset.IncidentDate),
                PurchaseDate: DateFormater(asset.PurchaseDate),
                ReportedDate: DateFormater(asset.ReportedDate),
            }));

            setData(fetchEquipments);
            setTotalCount(response.data.data.count);
        } catch (error) {
            console.log("Failed to fetch equipments", error);
        }
    };

    const fetchEquipmentId = async (equipmentId: number) => {
        try {
            const response = await fetcher.POST(`/equipment/GetEquipmentAsync?id=${equipmentId}`, {});

            const equipmentData = response.data.data ?? response.data;

            if (!equipmentData) {
                console.warn("No Equipment found", response.data);
                return null;
            }

            return {
                BuildingId: equipmentData.BuildingId,
                Name: equipmentData.Name,
                EquipmentId: equipmentData.EquipmentId,
                EquipmentStatus: equipmentData.EquipmentStatus,
                EquipmentTypeId: equipmentData.EquipmentTypeId,
                Code: equipmentData.Code,
                PurchaseDate: equipmentData.PurchaseDate,
                CreateAt: equipmentData.CreateAt,
                UpdateAt: equipmentData.UpdateAt,
                IsDeleted: equipmentData.IsDeleted,
            };
        } catch (error) {
            console.error("Failed to fetch Equipment by Id", error);
        }
    };

    const fetchEquipmentType = async () => {
        try {
            const response = await fetcher.GET("/equipmentTypes/GetEquipmentTypesAsync");

            const equipmentTypeData = response.data.data ?? response.data;

            const data: EquipmentType[] = equipmentTypeData.map((x: EquipmentType, index: number) => ({
                EquipmentTypeId: x.EquipmentTypeId | index,
                Description: x.Description,
                Level: x.Level,
                Code: x.Code,
            }));

            setEquipmentType(data);
        } catch (error) {
            console.error("Failed to retrive Equipment Type", error);
        }
    };

    const createEquipments = async (equip: CreateEquipment) => {
        try {
            const response = await fetcher.POST("/equipment/CreateEquipmentAsync", {
                id: equip.EquipmentId,
                EquipmentId: equip.EquipmentId,
                EquipmentStatus: equip.EquipmentStatus,
                EquipmentTypeId: equip.EquipmentTypeId,
                BuildingId: equip.BuildingId,
                Code: equip.Code,
                Name: equip.Name,
                PurchaseDate: equip.PurchaseDate,
                CreatedAt: equip.CreateAt,
                UpdatedAt: equip.UpdateAt,
            });

            return response.data.data ?? response.data;
        } catch (error) {
            console.error("Failed Creation of Equipments", error);
        }
    };

    const deleteEquipment = async (id: number) => {
        try {
            const response = await fetcher.DELETE(`/equipment/DeleteEquipmentAsync?id=${id}`);

            return response.data.data ?? response.data;
        } catch (error) {
            console.error("The Equipment cannot be deleted since it doesn't exist", error);
        }
    };

    const updateEquipment = async (id: number, equip: CreateEquipment) => {
        try {
            const response = await fetcher.PUT(`/equipment/UpdateEquipmentAsync?id=${id}`, {
                EquipmentId: equip.EquipmentId,
                EquipmentStatus: equip.EquipmentStatus,
                EquipmentTypeId: equip.EquipmentTypeId,
                Name: equip.Name,
                BuildingId: equip.BuildingId,
                Code: equip.Code,
                IsDeleted: equip.IsDeleted,
                PurchaseDate: equip.PurchaseDate, // ensure ISO string
            });

            return response.data.data ?? response.data;
        } catch (error) {
            console.error("There is no existing equipment", error);
        }
    };

    useEffect(() => {
        const fetchAll = async () => {
            await Promise.all([fetchEquipment("", 0, 10), fetchEquipmentType(), fetchCenter()]);
        };

        fetchAll();
    }, []);

    return {
        location,
        data,
        equipmentType,
        setData,
        fetchEquipment,
        fetchEquipmentId,
        createEquipments,
        deleteEquipment,
        updateEquipment,
        totalCount,
    };
}
