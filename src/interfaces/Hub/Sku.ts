export interface ISku {
    Description: string;
    HavePartial: boolean;
    IsAssign: boolean;
    IsCompleted: boolean;
    LpnList: string[];
    POQuantity: number;
    PurchaseOrderNumber: number;
    Sku: number;
    upclist: string[];
}