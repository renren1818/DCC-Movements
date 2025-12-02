import { DateFormater } from "@/utils/DateFormater";
import { GridColDef } from "@mui/x-data-grid";

export const column : GridColDef[] = [
  {
    field: "AsnNumber",
    headerName: "Asn",
    flex: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "ContainerNumber",
    headerName: "Container Number",
    flex: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "RecordCreator",
    headerName: "Created By",
    flex: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "CreatedDate",
    headerName: "Date Created",
    flex: 1,
    headerClassName: "super-app-theme--header",
    renderCell: (params) =>{
      const date = params.row.CreatedDate 
      return DateFormater(date)
    }
  },
]
