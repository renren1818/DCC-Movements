export interface IMovement {
    AislelId: number;
    CreatedBy: number;
    EquipmentId: number;
    From: number;
    LpnUpcId: number;
    MoveBy: number;
    To: number;
}

export interface IMovementAssigment {
    ASN: string;
    DoorId: number;
    PurchaseOrderNumber: number;
    StagingCode: string;
    TeamId: number;
    Upc: string;
    UpdatedBy: number;
    UserId: number;
    Movement: IMovement[]
}

export interface IAdvanceMovementAssignment {
    ASN: number;
    UPC: string;
    CreatedBy: number;
    UpdatedBy: number;
    PurchaseOrderNumber: string;
    To: number[];
}
