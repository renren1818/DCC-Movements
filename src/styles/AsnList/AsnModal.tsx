"use client";

import { styled } from "@mui/material/styles";
import {
  Dialog, DialogTitle, DialogActions, Button, TextField, Table, TableCell,
  Stack, Typography, IconButton, Slide, Card, Divider, Box,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";


export function SlideDownTransition(props: TransitionProps & { children: React.ReactElement }) {
  return <Slide direction="down" {...props} />;
}


export const AsnDialogWrapper = styled(Dialog, {
  shouldForwardProp: (prop) => prop !== "topSpacing",
})<{ topSpacing?: number }>(({ topSpacing = 50 }) => ({
  "& .MuiDialog-container": { alignItems: "flex-start" },
  "& .MuiDialog-paper": {
    borderRadius: 20,
    padding: 2,
    width: 700,
    maxWidth: "none",
    maxHeight: "none",
    overflow: "visible",
    marginTop: topSpacing,
    transition: "margin-top 0.3s ease",
  },
}));

export const AsnDialogTitle = styled(DialogTitle)(() => ({
  fontWeight: "bold",
  fontSize: "1rem",
  color: "#212c5e",
  position: "relative",
  paddingRight: 40,
}));

export const AsnDialogActions = styled(DialogActions)(() => ({
  justifyContent: "flex-end",
  padding: 2,
}));


export const AsnTextField = styled(TextField)(() => ({
  marginTop: 13,
  "& .MuiOutlinedInput-root": {
    borderRadius: 14,
    height: 45,
    backgroundColor: "#fff",
    boxShadow: "0 3px 3px rgba(0,0,0,0.1)",
    transition: "box-shadow 0.3s ease, border-color 0.3s ease",
    "&:hover": { boxShadow: "0 5px 5px rgba(0,0,0,0.15)" },
    "& fieldset": { borderColor: "#ccc" },
    "&:hover fieldset": { borderColor: "#ccc" },
    "&.Mui-focused fieldset": { borderColor: "#2a42b8" },
    "& input": { padding: "12px 14px", fontSize: "0.95rem" },
  },
  "& .MuiInputLabel-root": {
    top: "50%",
    left: 17,
    transform: "translateY(-50%)",
    fontSize: "0.78rem",
    color: "#666",
    transition: "all 0.2s ease",
  },
  "& .MuiInputLabel-shrink": {
    top: 3,
    transform: "translateY(-50%) scale(0.85)",
  },
}));

export const SearchInput = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    height: 32,
    borderRadius: 6,
    fontSize: 14,
    backgroundColor: "#fff",
    "& fieldset": { borderColor: "#ccc", transition: "all 0.2s ease" },
    "&:hover fieldset": { borderColor: "#999" },
    "&.Mui-focused fieldset": {
      borderColor: "#212c5e",
      boxShadow: "0 0 3px rgba(33,44,94,0.4)",
    },
  },
}));

export const PurchaseOrderHeader = styled(Stack)(() => ({
  margin: "20px 0 10px",
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
}));

export const PurchaseOrderTitle = styled(Typography)(() => ({
  fontWeight: 300,
  fontSize: "1rem",
  color: "#212c5e",
  marginLeft: 4,
}));

export const PurchaseOrderTable = styled(Table)(() => ({
  width: 599,
  border: "1px solid #d3d3d3",
  borderRadius: 20,
  overflow: "hidden",
  boxShadow: "0px 4px 8px rgba(0,0,0,0.15)",
  "& th": {
    backgroundColor: "#212c5e",
    color: "#fff",
    fontWeight: 500,
    textAlign: "left",
  },
  "& td": { textAlign: "left" },
  "& .MuiTableCell-root": { borderBottom: "1px solid #e0e0e0" },
}));

export const NoDataCell = styled(TableCell)(() => ({
  textAlign: "center",
  padding: 20,
  color: "#757575",
}));


const BaseCard = styled(Card)(() => ({
  borderRadius: 20,
  backgroundColor: "#fff",
  border: "1px solid #e0e0e0",
  maxWidth: "90vw",
}));

export const AsnDialogCard = styled(BaseCard)(() => ({
  padding: "0 15px 25px",
  boxShadow:
    "0px 5px 6px -3px rgba(0,0,0,0.2), 0px 9px 12px 1px rgba(0,0,0,0.14), 0px 3px 16px 2px rgba(0,0,0,0.12)",
}));

export const TableCard = styled(BaseCard)<{ cardWidth?: string }>(({ cardWidth = "597px" }) => ({
  padding: "5px 10px 13px",
  width: cardWidth,
  boxShadow:
    "0px 0px 0px rgba(0,0,0,0.2), 0px 9px 6px rgba(0,0,0,0.14), 0px 7px 26px 2px rgba(0,0,0,0.12)",
}));

export const SelectTableCard = styled(TableCard)(() => ({
  padding: "5px 10px 20px",
}));

export const AsnVerticalDivider = styled(Divider)(() => ({
  width: 654,
  borderWidth: 1,
  borderColor: "#ebebeb",
  marginLeft: 22,
}));


export const SelectPurchaseHeader = styled(Stack)(() => ({
  margin: "20px 0 10px",
  flexDirection: "row",
  alignItems: "center",
  gap: 175,
}));

export const SearchContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: 8,
}));

export const SearchLabel = styled(Typography)(() => ({
  fontWeight: 500,
  fontSize: 14,
}));


const BaseButton = styled(Button)(() => ({
  borderRadius: 20,
  fontWeight: 600,
  textTransform: "uppercase",
  boxShadow: "0px 4px 5px rgba(0,0,0,0.45)",
}));

export const ResetButton = styled(BaseButton)(() => ({
  color: "#212c5e",
  border: "1px solid #bdbdbd",
  padding: "6px 16px",
  marginBottom: 15,
}));

export const SaveButton = styled(BaseButton)(() => ({
  backgroundColor: "#212c5e",
  color: "#fff",
  padding: "6px 20px",
  margin: "0 15px 15px 0",
  border: "1px solid transparent",
  transition: "all 0.25s ease",
  "&:hover": {
    backgroundColor: "#fff",
    color: "#212c5e",
    boxShadow: "0px 6px 10px rgba(33,44,94,0.4)",
    transform: "translateY(-2px)",
  },
}));

export const CloseButton = styled(ResetButton)(() => ({
  marginTop: 15,
}));

export const SelectedButton = styled(SaveButton)(() => ({
  marginTop: 15,
  marginRight: 2,
}));

export const AddPoButton = styled(IconButton)(() => ({
  backgroundColor: "#212c5e",
  color: "#fff",
  width: 28,
  height: 28,
  "& svg": { fontSize: 22 },
  "&:hover": {
    backgroundColor: "#fff",
    color: "#212c5e",
    boxShadow: "0 4px 12px rgba(33,44,94,0.4)",
    transform: "translateY(-2px)",
  },
}));