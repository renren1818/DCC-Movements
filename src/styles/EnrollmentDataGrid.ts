"use client";

import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";

export const EnrollmentDataGrid = styled(DataGrid)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  width: "100%",
  "& .MuiDataGrid-cell": {
    fontSize: "0.9rem",
  },
  "& .MuiDataGrid-columnHeaders, & .MuiDataGrid-columnHeaderCheckbox, & .super-app-theme--header": {
    backgroundColor: "#212C5E",
    color: theme.palette.common.white,
    fontWeight: "bold",
    fontSize: "0.95rem",
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer": {
    display: "none",
  },

  "& .MuiDataGrid-columnHeaderCheckbox .MuiCheckbox-root svg": {
    fill: "gray",
  },
  "& .MuiDataGrid-columnHeaderCheckbox .MuiCheckbox-root.Mui-checked": {
    borderRadius: 4,
  },

  "& .MuiDataGrid-columnHeaderCheckbox .MuiCheckbox-root.Mui-checked svg": {
    fill: "white",
  },
  "& .row-enrolled": {
    backgroundColor: "#5c5c5cff", // light cyan
  },
  "& .row-alt-gray": {
    backgroundColor: theme.palette.grey[200],
  },
}));
