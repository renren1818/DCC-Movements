interface IQueueDetail {
    MovementDetailID: number;
    MovementHeaderID: number;
    Details: string | null;
    ReferenceNo: string;
    ASN: string;
    PurchaseOrderNumber: number;
    SKU: string;
    Description: string;
    Qty: number;
    UPC: string;
    ColorCode: string | undefined;
    StagingCode: string | null;
}

interface IMyQueue {
    MovementHeaderID: number;
    ReferenceNo: string;
    PurchaseOrderNumber: number;
    ReceivedNo: string | null;
    VendorCode: string;
    Qty: number;
    DateCreated: string;
    ExpectedReceiptDate: string;
    Details: IQueueDetail[];
    ASN: string;
    ColorCode: string | undefined;
}