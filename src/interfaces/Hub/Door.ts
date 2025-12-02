export interface IPoItem {
    PcWeight: number;
    CaseWeight: number;
    Vendor: number;
    Upc: string;
    Tie: number;
    Hi: number;
    PalletWeight: number;
    CasePerPallet: number;
    UnitQuantity: number;
    Sku: string;
    IsCompleted: boolean;
    FootprintId: number;
    DoorTeamDetailId: number;
    DoorTeamId: number;
    IsPalletize: boolean;
    HasCaseCode: boolean;
    TotalCase: number;
}

export interface IInvestigationReport {
    Description: string;
    InboundOutboundReportId: number;
    PurchaseOrderNumber:  number;
    Stastus: number;
    TeamId: number;
    TotalCases: number;
}

export interface IPoDetails {
    AsnId: number;
    Asn: string;
    Items: IPoItem[];
    InvestigationReports: IInvestigationReport[];
}