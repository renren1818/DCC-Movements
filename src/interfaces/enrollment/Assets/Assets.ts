import { PickerValue } from "@mui/x-date-pickers/internals";
import { SharedOption } from "../Common/SharedOption";

interface EquipmentList {
  Age: number;
  Code: string;
  EquipmentId: number;
  EquipmentStatus: string;
  EquipmentType: string;
  IncidentDate: string;
  IsDeleted: boolean;
  LastAssignment: string;
  Location: string;
  Name: string;
  PurchaseDate: string;
  ReportedDate: string;
}
interface CreateEquipment {
  BuildingId: number;
  Code: string;
  CreateAt: string;
  EquipmentId: number;
  EquipmentStatus: string;
  EquipmentTypeId: number;
  IsDeleted: boolean;
  Name: string;
  PurchaseDate: string;
  UpdateAt: string;
}

interface EquipmentType {
  EquipmentTypeId: number;
  Code: number;
  Description: string;
  Level: number;
}

 interface ActionProps {
  openModal: boolean;
  closeModal: () => void;
  equipmentType: EquipmentType[];
  distriCenter: SharedOption[];
  equipmentData?: CreateEquipment;
  onSaved: (id:number ,equipments: CreateEquipment) => void;
}

export type { EquipmentList, CreateEquipment, EquipmentType, ActionProps };
