import { CreateAsnWithOrders } from "@/hooks/AsnList/useAsnTable";
import { ChangeEvent } from "react";

type AsnTab = "all" | "asn" | "containernumber";

interface AsnRecord {
  AsnId: number;
  AsnNumber: string;
  ContainerNumber: string;
  CreatedBy: number;
  CreatedDate: string;
  PoNumber: number;
  RecordCreator: string;
}
interface PurchaseOrderSkuItemName {
  PurchaseOrderNumber: number;
  SKU: string;
  ItemName: string;
  PODetailIds: number;
}
interface CreateAsn {
  AsnId?: number;
  AsnNumber: string;
  ContainerNumber: string;
  PODetailIds: number[];
  POItemName?: PurchaseOrderSkuItemName[];
  UserId: number;
}

interface UpdateAsnDetails {
  AsnId: number;
  AsnNumber: string;
  ContainerNumber: string;
  PODetailIds: number[];
  UserId: number;
}

interface AsnDetails {
  AsnDetailId: number;
  SKU: number;
  ItemName: string;
  PurchaseOrderNumber: number;
  PODetailIds: number;
}

interface ActionProps {
  openModal: boolean;
  closeModal: () => void;
  onSave: (asnData: CreateAsnWithOrders) => void;
  asnData?: CreateAsnWithOrders;
  poData?: PurchaseOrderSkuItemName[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  handleAddRemovePoId:(id: number, isAddition: boolean) => void
  handleFieldChange:(e: ChangeEvent<HTMLInputElement>)=>void
  
}

export type {
  AsnRecord,
  PurchaseOrderSkuItemName,
  CreateAsn,
  AsnTab,
  ActionProps,
  AsnDetails,
  UpdateAsnDetails,
};
