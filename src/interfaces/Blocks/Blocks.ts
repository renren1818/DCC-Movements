import { BlockColors, BlockFullnessColors, BlockTypes } from "@/enums/Blocks";

export interface IBlocksProps {
  skuBlocks: number[];
  onClick: (block: IBlock) => void;
}

export interface IBlockLayout {
  GridX: number;
  GridY: number;
  ColumnSpan: number;
  RowSpan: number;
}

export interface IBlock {
  BlockId: number;
  BlockType: BlockTypes;
  BuildingName: string;
  Code: string | undefined;
  DesignationName: string;
  Status: string;
  Fullness: number;
  HasMovement: boolean;
  HasAssignedSku: boolean;
  Sides: number;
  Rows: number;
  HoldingAreas: string[];
  Layout: IBlockLayout;
}

export interface IGridLayout extends IBlock {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface IBlockColors {
  Block: BlockColors;
  Fullness: BlockFullnessColors;
}

export interface IHDRow {
  BlockId: number,
  BlockCode: string,
  Row: number,
  Side: number,
  Sku: string,
  Capacity: number,
  LocationId: number,
  HasAssignedSku: boolean,
  MaxPallet: number,
  Threshold: number,
  Occupied: number,
  AssignmentCount: number,
  IsAvailable: boolean,
  HasMovement: boolean,
  SideCount: number
}

export interface ICommonRow {
  Row: number,
  Side: number,
  HasAssignedSku: boolean,
  HasMovement: boolean,
  Fullness: number,
  SKU: number[]
}

export interface ICommonSide {
  side: number,
  rows: ICommonRow[]
}

export interface IBlockHook {
  location: string[],
  block: IGridLayout | undefined,
  items: IHDRow[] | ICommonSide[],
  colors: { block: BlockColors, fullness: BlockFullnessColors }
}

export interface ILevelLocation {
  Row: number,
  Sku: string,
  Level: number,
  IsOccupied: boolean,
  MaxPallet: number,
  LocationId: number,
  HasAssignedSku: boolean,
  BlockTypeId: number,
  HasMovement: boolean,
  IsAvailable: boolean,
  BlockType: string,
  LocationName: string
  IsCompleted: boolean
}

export interface ILevelPercentByRow {
  Row: number,
  Capacity: number,
  IsLow: boolean,
  Sku: string
}

export interface ISide {
  BlockType: string,
  Locations: ILevelLocation[],
  PercentByRow: ILevelPercentByRow[]
}

export interface ILocation {
  id: number;
  block: number;
  side: number;
  row: number;
  level: number;
  slots: number;
  enabled: boolean;
}