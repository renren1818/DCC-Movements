import { Button, TableCell, TableRow, TextField } from "@mui/material";
import { styled } from "@mui/system";

const AsnTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: "rgb(33, 44, 94)",
  "& .MuiTableCell-root": {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    borderRight: "1px solid rgba(255,255,255,0.2)",
    padding: "8px 12px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.75rem",
      padding: "6px 8px",
    },
  },
  "& .MuiTableCell-root:last-of-type": { borderRight: "none" },
}));

const AsnTableRowData = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": { backgroundColor: "#fafafa" },
  "& .MuiTableCell-root": {
    textAlign: "center",
    padding: "25px 20px",
    [theme.breakpoints.down("sm")]: {
      padding: "12px 8px",
      fontSize: "0.8rem",
    },
  },
}));

const AsnTextFields = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.85rem",
      padding: "6px 10px",
    },
  },
  "& .MuiInputLabel-root": {
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.75rem",
    },
  },
}));

const SaveButtons = styled(Button)(({ theme }) => ({
  border: "1px solid gray",
  backgroundColor: "rgb(33, 44, 94)",
  color: "white",
  borderRadius: 5,
  padding: "6px 16px",
  [theme.breakpoints.down("sm")]: {
    width: "100%", 
    fontSize: "0.8rem",
    padding: "10px",
  },
}));

const DataCell = styled(TableCell)(({ theme }) => ({
  textAlign: "center",
  padding: "20px",
  color: "#757575",
  [theme.breakpoints.down("sm")]: {
    padding: "10px 6px",
    fontSize: "0.8rem",
  },
}));

export { AsnTableRow, AsnTableRowData, AsnTextFields, SaveButtons, DataCell };