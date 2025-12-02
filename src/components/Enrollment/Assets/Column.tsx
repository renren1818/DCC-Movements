
import { Box, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";


export const columns: GridColDef[] = [
  {
    field: "Code",
    headerName: "Equipment Code",
    flex: 1,
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
  },
  {
    field: "Name",
    headerName: "Name",
    flex: 1,
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
  },
  {
    field: "EquipmentType",
    headerName: "Type",
    flex: 1,
    headerAlign: "center",
    align: "center",
    headerClassName: "super-app-theme--header",
  },
  {
    field: "Location",
    headerName: "Location",
    flex: 1,
    headerAlign: "center",
    headerClassName: "super-app-theme--header",
  },
  {
    field: "PurchaseDate",
    headerName: "Purchase Date",
    flex: 1,
    headerAlign: "center",
    align: "center",
    headerClassName: "super-app-theme--header",
  },
  {
    field: "Age",
    headerName: "Age",
    flex: 1,
    headerAlign: "center",
    align: "center",
    headerClassName: "super-app-theme--header",
  },
  {
    field: "EquipmentStatus",
    headerName: "Condition",
    flex: 1,
    headerAlign: "center",
    align: "center",
    headerClassName: "super-app-theme--header",
    renderCell: (params) => {
      const status: string = params.row.EquipmentStatus;
      const bgColor = status.toLowerCase() === "defective" ? "red" : "green";

      const displayText = status ? status.charAt(0).toUpperCase() + status.slice(1) : "";

      return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%",}}>
          <Box sx={{px: 2,py: 1, borderRadius: 1, backgroundColor: bgColor, color: "white", textAlign: "center",}}>
            <Typography variant="body2" sx={{ fontWeight: "bold", fontSize: "1rem" }}>
              {displayText}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    field: "IncidentDate",
    headerName: "Incident Date",
    flex: 1,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },
  {
    field: "ReportedDate",
    headerName: "Reported Date",
    flex: 1,
    headerClassName: "super-app-theme--header",
    renderCell: (params) => params.value || "—",
  },
  {
    field: "LastAssignment",
    headerName: "Last Assignment",
    flex: 1,
    headerClassName: "super-app-theme--header",
    renderCell: (params) => params.value || "—",
  },
];