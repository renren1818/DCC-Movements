export interface IMyQueue {
    DoorTeamId: number;
    DoorCode: string;
    StagingCode: string;
    IsRead: boolean;
    IsOpen: boolean;
    ContainerNumber: string;
    SealNumber: string;
    Asn: string;
    PurchaseOrderNumber: number[];
    HasReport: boolean;
    HasImage: boolean;
}