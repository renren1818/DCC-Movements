export interface Ilog {
    Description: string;
    From: string;
    MovementAssignmentId : number;
    Quantity: number;
    SKU: string;
    Status: string;
    To: string;
}

export interface ILogs {
    ItemCount: number;
    Items: Ilog[];
    PageCount: number;
}