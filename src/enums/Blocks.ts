/* eslint-disable @typescript-eslint/no-duplicate-enum-values */

export enum BlockTypes {
  HIGH = "HIGH DENSITY",
  HIGH_MINI = "MINI HIGH DENSITY",
  LOW = "LOW DENSITY",
  LOW_MINI = "MINI LOW DENSITY",
  LOW_PICKING = "LOW DENSITY - PICKING",
  SALVAGE = "SALVAGE DENSITY",
  OVERSIZE = "OVERSIZE DENSITY",
}

export enum BlockColors {
  HIGH = "#6bd4c2",
  HIGH_MINI = "#6bd4c2",
  LOW = "#CDE5A1",
  LOW_MINI = "#CDE5A1",
  LOW_PICKING = "#e09546",
  SALVAGE = "#cfaad7",
  OVERSIZE = "#CDE5A1", //"#D7F1A9",
}

export enum BlockFullnessColors {
  HIGH = "#0e5d50BB",
  HIGH_MINI = "#0e5d50BB",
  LOW = "#728059BB",
  LOW_MINI = "#728059BB",
  LOW_PICKING = "#a26320BB",
  SALVAGE = "#623d6aBB",
  OVERSIZE = "#728059BB",
}

export enum BlockModes {
  SEARCH,
  MOVE,
  SLOT_SKU,
  SLOT_CONTROL
}