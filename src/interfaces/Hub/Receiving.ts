import { ReportStatus } from "@/enums/Hub";

export interface ILpn {
    ExpiryDate: Date;
    IsNonConformingPallets: boolean;
    LpnCode: string;
    SKU: string;
    Quantity: number;
}

export interface ILpnExpiry {
    ExpiryDate: Date;
    IsNonConformingPallets: boolean;
    PalletCount: number;
}

export interface IDoorTeamDetails {
    Description: string;
    DoorTeamDetailId: number;
    DoorTeamId: number;
    HasCaseCode: boolean;
    IsConfigurationCorrect: boolean;
    IsPalletize: boolean;
    IsCompleted: boolean;
    LpnExpiry: ILpnExpiry[];
    Status: ReportStatus;
    TotalCase: number;
    Upc: string;
    Action: number;
    ConfiguredFootprint: { Tie: number; High: number; }
}

export interface ILpnDialog {
    open: boolean;
    full: boolean;
    nonConforming: boolean;
    close: () => void;
    onPrint: (lpns: ILpnExpiry[]) => void;
}

export interface ILpnParams {
    asnId: number;
    purchaseOrderNumber: number;
    totalCase?: number;
    upc?: string;
    doorTeamDetailId?: number;
}

