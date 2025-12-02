import { useState, useEffect } from "react";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { CreateEquipment } from "@/interfaces/enrollment/Assets/Assets";
import { AddUpdateAssetsSchema } from "@/validation/Enrollment/AssetsValidation";

type EquipmentDraft = Omit<CreateEquipment, "PurchaseDate"> & {
  PurchaseDate: Dayjs | null;
};

export const defaultAsset: EquipmentDraft = {
  BuildingId: 0,
  EquipmentId: 0,
  EquipmentTypeId: 0,
  Code: "",
  EquipmentStatus: "",
  Name: "",
  CreateAt: "",
  UpdateAt: "",
  IsDeleted: false,
  PurchaseDate: null,
};

interface UseAssetsDialogProps {
  openModal: boolean;
  equipmentData?: CreateEquipment;
  onSaved: (id: number, equipments: CreateEquipment) => void;
  closeModal: () => void;
}

export default function useAssetsDialog({
  openModal,
  equipmentData,
  onSaved,
  closeModal,
}: UseAssetsDialogProps) {
  const [data, setData] = useState<EquipmentDraft>(defaultAsset);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("")

  useEffect(() => {
    if (openModal) {
      setData(
        equipmentData
          ? {
              ...equipmentData,
              PurchaseDate: equipmentData.PurchaseDate
                ? dayjs(equipmentData.PurchaseDate)
                : null,
            }
          : defaultAsset
      );
      setErrors({});
    }
  }, [openModal]);

  const handleReset = () => {
    setData(defaultAsset);
    setErrors({});
  };

  const handleSave = () => {
    const result = AddUpdateAssetsSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0])
          fieldErrors[issue.path[0].toString()] = issue.message;
      });

      setErrors(fieldErrors);
      return;
    }

    const payload: CreateEquipment = {
      ...defaultAsset,
      ...data,
      PurchaseDate: data.PurchaseDate ? data.PurchaseDate.toISOString() : "",
    };

    setToastMessage(payload.EquipmentId === 0 ? "Saved Successfully" : "Updated Successfully")
    setShowToast(true);
    onSaved(payload.EquipmentId, payload);
    closeModal();
    handleReset();
  };

  return {
    data,
    setData,
    errors,
    handleReset,
    handleSave,
    showToast,
    setShowToast,
    toastMessage
  };
}
