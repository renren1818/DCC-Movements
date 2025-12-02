// hooks/useDialogAsn.ts
import { useState, useRef, useEffect } from "react";
import { CreateAsn, ActionProps, PurchaseOrderSkuItemName } from "@/interfaces/AsnList/AsnList";
import { CreateAsnWithOrders } from "./useAsnTable";
import { AsnValidation } from "@/validation/Asn/AsnValidation";

export function useDialogAsn({ asnData, poData = [], searchTerm, onSearchChange, onSave, closeModal }: ActionProps) {
  const defaultAsn: CreateAsnWithOrders = {
    AsnNumber: "",
    ContainerNumber: "",
    PODetailIds: [],
    UserId: 0,
    PurchaseOrders: [],
  };

  const [data, setData] = useState<CreateAsnWithOrders>(asnData || defaultAsn);
  const [selectPo, setSelectPo] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [addedPo, setAddedPo] = useState<PurchaseOrderSkuItemName[]>([]);
  const [availablePo, setAvailablePo] = useState<PurchaseOrderSkuItemName[]>(poData);

  const [fieldError, setFieldError] = useState<Record<string, string>>({});
  const [isSearching, setIsSearching] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState<"success" | "error">("success");

  const searchTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!asnData) {
      setData(defaultAsn);
      setAddedPo([]);
      return;
    }

    const { PurchaseOrders = [] } = asnData;
    setData(asnData);
    setAddedPo(PurchaseOrders);
  }, [asnData]);

  useEffect(() => {
    setAvailablePo(poData);
  }, [poData]);

  const poSkuItem = availablePo.filter((item) => !addedPo.some((p) => p.SKU === item.SKU));

  const handleToggle = () => setSelectPo((p) => !p);

  const handleSelect = (sku: string) => setSelected((prev) => (prev.includes(sku) ? prev.filter((x) => x !== sku) : [...prev, sku]));

  const filteredItems = !searchTerm ? poSkuItem : poSkuItem.filter((i) => i.PurchaseOrderNumber.toString().includes(searchTerm));

  const handleReset = () => {
    onSearchChange("");
    setSelected([]);
    setData(defaultAsn);
    setAddedPo([]);
    setAvailablePo(poData);
    setSelectPo(false);
    setIsSearching(false);
    setFieldError({});
    if (searchTimerRef.current) {
      clearTimeout(searchTimerRef.current);
      searchTimerRef.current = null;
    }
  };

  // ✅ Field-level validation helper
  const validateField = (name: string, value: any) => {
    const fieldSchema = AsnValidation.shape[name as keyof typeof AsnValidation.shape];
    if (!fieldSchema) return;

    const result = fieldSchema.safeParse(value);
    setFieldError((prev) => ({
      ...prev,
      [name]: result.success ? "" : result.error.issues[0]?.message || "",
    }));
  };

  // ✅ Full form validation on save
  const handleSaveWithValidation = () => {
    const result = AsnValidation.safeParse({
      ...data,
      PurchaseOrder: addedPo,
      filteredItems,
      selected,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const pathKey = String(issue.path[0]);
        fieldErrors[pathKey] = issue.message;
      });

      if (addedPo.length === 0) {
        fieldErrors["PurchaseOrder"] = "At least one Purchase Order is required";
      }

      setFieldError(fieldErrors);
      setToastMessage(addedPo.length === 0 ? "At least one Purchase Order is required" : Object.values(fieldErrors).join(" | "));
      setToastSeverity("error"); // 🔴 show red toast for validation errors
      setShowSnackbar(true);
      return;
    }

    handleSave();
  };

  const handleRemovePo = (sku?: string) => {
    if (!sku) return;
    setAddedPo((prev) => prev.filter((item) => item.SKU !== sku));
    setSelectPo(true);
  };

  const handleSave = () => {
    const asn: CreateAsnWithOrders = {
      AsnId: data.AsnId,
      AsnNumber: data.AsnNumber,
      ContainerNumber: data.ContainerNumber,
      PODetailIds: addedPo.map((p) => p.PODetailIds),
      UserId: data.UserId ?? 0,
      PurchaseOrders: data.PurchaseOrders,
    };

    setToastMessage(asn?.AsnId ? "Updated Successfully" : "Saved Successfully");
    setToastSeverity("success"); // 🟢 show green toast for success
    setShowSnackbar(true);
    onSave(asn);
    handleReset();
    closeModal();
  };

  const handleSearchChange = (val: string) => {
    onSearchChange(val);
    setIsSearching(val.trim() !== "");
    if (val.trim() === "" && searchTimerRef.current) {
      clearTimeout(searchTimerRef.current);
      searchTimerRef.current = null;
    }
  };

  const noDataText = () => {
    if (isSearching && searchTerm) return "Searching…";
    if (searchTerm && filteredItems.length === 0) return "No matches";
    return "No Data";
  };

  return {
    data,
    setData,
    selectPo,
    handleToggle,
    selected,
    handleSelect,
    poSkuItem,
    addedPo,
    setAddedPo,
    filteredItems,
    handleReset,
    handleSave,
    handleSearchChange,
    handleRemovePo,
    noDataText,
    showSnackbar,
    toastMessage,
    setShowSnackbar,
    handleSaveWithValidation,
    fieldError,
    validateField,
    toastSeverity,
  };
}
