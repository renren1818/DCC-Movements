import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

const renderDayCell = (params: any) => {
  const value = Boolean(params.value);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      {value ? (
        <Box
          sx={{
            width: 15,
            height: 15,
            border: "3px solid #00b050",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#00b050",
            fontSize: 14,
            fontWeight: "bold",
          }}
        >
          ✓
        </Box>
      ) : (
        <Box
          sx={{
            width: 20,
            height: 20,
            bgcolor: "red",
            clipPath: "polygon(30% 0%,70% 0%,100% 30%,100% 70%,70% 100%,30% 100%,0% 70%,0% 30%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: 14,
            fontWeight: "400",
          }}
        >
          X
        </Box>
      )}
    </Box>
  );
};

export const columns: GridColDef[] = [
  {
    field: "Name",
    headerName: "Team Name",
    align: "center",
    headerAlign: "center",
    flex: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "ColorCode",
    headerName: "Color Code",
    flex: 1,
    headerClassName: "super-app-theme--header",
    renderCell: (params) => {
      const color = String(params.row.ColorCode ?? "");

      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              backgroundColor: color,
              border: "2px solid black",
            }}
          />
        </Box>
      );
    },
  },
  {
    field: "Shift",
    headerName: "Shift",
    flex: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "Area",
    headerName: "Area",
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
    field: "Sun",
    headerName: "Sun",
    flex: 1,
    headerClassName: "super-app-theme--header",
    align: "center",
    headerAlign: "center",
    renderCell: renderDayCell,
  },
  {
    field: "Mon",
    headerName: "Mon",
    flex: 1,
    headerClassName: "super-app-theme--header",
    align: "center",
    headerAlign: "center",
    renderCell: renderDayCell,
  },
  {
    field: "Tue",
    headerName: "Tue",
    flex: 1,
    headerClassName: "super-app-theme--header",
    align: "center",
    headerAlign: "center",
    renderCell: renderDayCell,
  },
  {
    field: "Wed",
    headerName: "Wed",
    flex: 1,
    headerClassName: "super-app-theme--header",
    align: "center",
    headerAlign: "center",
    renderCell: renderDayCell,
  },
  {
    field: "Thu",
    headerName: "Thu",
    flex: 1,
    headerClassName: "super-app-theme--header",
    align: "center",
    headerAlign: "center",
    renderCell: renderDayCell,
  },
  {
    field: "Fri",
    headerName: "Fri",
    flex: 1,
    headerClassName: "super-app-theme--header",
    align: "center",
    headerAlign: "center",
    renderCell: renderDayCell,
  },
  {
    field: "Sat",
    headerName: "Sat",
    flex: 1,
    headerClassName: "super-app-theme--header",
    align: "center",
    headerAlign: "center",
    renderCell: renderDayCell,
  },
];
