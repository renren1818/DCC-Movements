interface ITeamDataResponse {
    data: IAsnTeamQueue[];
    count: number;
}

interface IAsnTeamQueue {
    TeamName: string;
    ColorCode: string;
    Details: IAsnQueue[];
}

interface IAsnQueue {
    AsnNumber: string;
    ContainerNumber: string;
    TeamId: number;
    StagingCode: string;
    DoorCode: string;
    IsCompleteReceiving: boolean;
}

interface IselectedAsn {
    Asn: IAsnQueue;
    ColorCode: string;
}

export type {ITeamDataResponse, IAsnQueue, IAsnTeamQueue, IselectedAsn};
