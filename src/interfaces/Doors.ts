// src/interfaces/Doors.ts

interface InboundDoor {
    Asn: string;
    ContainerNumber: string;
    DoorCode: string;
    DoorId: number; // 👈 Number
    SealNumber: string;
    TimeIn: string;
    Type: number;
    IsForDockout: boolean;
}

interface IDoorWithTeam {
    SealNumber: string;
    DoorTeamId: number;
    TeamId: number; // 👈 Number
    DoorId: number; // 👈 Number
    IsRead: boolean;
    IsOpen: boolean;
    StagingId: number; // 👈 Number
    ColorCode: string;
    IsHasReport: boolean;
    Status: number;
}

interface DoorTeam {
    Asn: string;
    ContainerNumber: string;
    DoorId: number;
    SealNumber: string;
    StagingId: number;
    Status: number;
    TeamId: number;
}

interface IPopulateStaging {
    Disabled: boolean;
    Label: string;
    Value: number; // 👈 Number (The StagingId)
}

interface ITeamColor {
    ColorCode: string;
    Disabled: boolean;
    Label: string;
    Value: number; // 👈 Number (The TeamId)
}

interface IUpdateDoorTeamRequest {
    DoorTeamId: number;
    ContainerNumber: string;
    Asn: string;
    TeamId: number | undefined;
    SealNumber: string;
    StagingId: number;
    DoorId: number;
    Status: number;
}

interface IInvalidFootprint {
    FootprintCode: string;
    FootprintId: number;
    Hi: number;
    Length: number;
    ReceivingHeight: number;
    SKU: string;
    ShippingHeight: number;
    Status: number;
    StorageHeight: number;
    Tie: number;
    UnitQuantity: number;
    Weight: number;
    Width: number;
}

interface IGetInboundReport {
    PoNumber: number;
    AsnNumber: string;
    Description: string;
    DoorCode: number;
    DoorTeamId: number;
    Id: number;
    IsDisabled: boolean;
    PurchaseOrderNumber: number;
    ReportCount: string;
    Sku: number;
    TeamId: number;
    UPC: number;
    Footprint: IInvalidFootprint;
}

interface IInboundReportsLogs {
    Action: number;
    CreatedBy: string;
    InboundOutboundReportId: number;
}

interface AcknowledgementLogs {
    asnNumber: string;
    poNumber: number;
    sku: number;
    status: number;
    teamId: number;
    updateBy: string;
}

export type {
    InboundDoor,
    IDoorWithTeam,
    IPopulateStaging,
    ITeamColor,
    DoorTeam,
    IUpdateDoorTeamRequest,
    IGetInboundReport,
    IInboundReportsLogs,
    AcknowledgementLogs,
};
