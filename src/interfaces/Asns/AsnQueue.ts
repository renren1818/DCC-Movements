interface IAsnItem {
    Asn: string;
    Upc: string;
    Sku: number;
    SkuName: string;
    VendorId: number;
    DateCreated: string; // ISO date string (e.g., "2025-10-30T06:01:28.957")
    UnitQuantity: number;
    Hi: number;
    Tie: number;
    CasePerPallet: number;
    PalletWeight: number;
    TotalCases: number;
    IsFullyReceived: boolean;
}

interface IAsnResponse {
    data: IAsnItem[];
    count: number;
}

export type {IAsnItem, IAsnResponse};
