import { ILocation } from "./Blocks/Blocks";

export interface ILocations {
    items: ILocation[];
    rowMin: string; 
    rowMax: string; 
    levelMin: string;
    levelMax: string;
}
export interface ISearchLocation {
    block: number; 
    side: number; 
    rowFrom: number;
    rowTo: number;
    levelFrom: number;
    levelTo: number;
}

export interface ISearchParams {

    sku?: string;
    location?: ISearchLocation;
    blocks?: number[];

}

