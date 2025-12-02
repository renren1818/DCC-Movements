import { ContrastTextColor } from "@/utils/ContrastTextColor";
import { Box, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  {
    field: "EmployeeNumber",
    headerName: "Employee Number",
    flex: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "FullName",
    headerName: "Full Name",
    flex: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "Designation",
    headerName: "Designation",
    flex: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "Location",
    headerName: "Location",
    flex: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "Shift",
    headerName: "Shift",
    flex: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "Ranks",
    headerName: "Ranks",
    flex: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "Team",
    headerName: "Team",
    flex: 1,
    headerClassName: "super-app-theme--header",
    renderCell: (params) => {
      const color = params.row.TeamColorCode;
      const textColor = ContrastTextColor(color);
      return (
        <Box
          sx={{
            backgroundColor: color,
            color: textColor,
            width: "120px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: "12px",
            p: "3px 5px",
          }}
        >
          <Typography>{params.value || "-"}</Typography>
        </Box>
      );
    },
  },
  {
    field: "Skills",
    headerName: "Skills",
    flex: 1,
    headerClassName: "super-app-theme--header",
    renderCell: (params) => params.value || "—",
  },
];
