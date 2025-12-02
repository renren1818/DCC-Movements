import React from "react";
import { styled } from "@mui/material/styles";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  TextField,
  Table,
  TableCell,
  Stack,
  Typography,
  IconButton,
  Slide,
  Card,
  Divider,
  Box,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

export const SlideDownTransition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const AsnDialogWrapper = styled(Dialog, {
  shouldForwardProp: (prop) => prop !== "topSpacing",
})<{ topSpacing?: number }>(({ topSpacing = 50 }) => ({
  "& .MuiDialog-container": {
    alignItems: "flex-start",
  },
  "& .MuiDialog-paper": {
    borderRadius: "20px",
    padding: "2px 2px 2px 2px",
    width: "700px",     // allows dynamic width based on content/card
    maxWidth: "none",         // disables automatic max width
    overflow: "visible",      // removes scrollbars
    maxHeight: "none",        // allows full height
    marginTop: `${topSpacing}px`,
    transition: "margin-top 0.3s ease",
  },
}));

export const AsnDialogTitle = styled(DialogTitle)(() => ({
  fontWeight: "bold",
  color: "rgb(33, 44, 94)",
  fontSize: "1.0rem",
  position: "relative",
  paddingRight: "40px",
}));

export const AsnTextField = styled(TextField)(() => ({
  marginTop: "13px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "14px",
    height: "45px",
    backgroundColor: "#fff",
    boxShadow: "0 3px 3px rgba(0, 0, 0, 0.1)", // 👈 soft shadow
    transition: "box-shadow 0.3s ease, border-color 0.3s ease",
    "&:hover": {
      boxShadow: "0 5px 5px rgba(0, 0, 0, 0.15)", // 👈 stronger shadow on hover
    },
   
    "& fieldset": {
      borderColor: "#ccc",
    },
    "&:hover fieldset": {
      borderColor: "#ccccccff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#2a42b8",
    },
    "& input": {
      padding: "12px 14px", // 👈 centers placeholder vertically
      fontSize: "0.95rem",
    },
     // 🚫 Remove browser autofill & focus tint
    "& input:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px #fff inset !important",
      WebkitTextFillColor: "#000 !important",
      caretColor: "#000",
      transition: "background-color 9999s ease-in-out 0s",
    },
  },
  "& .MuiInputLabel-root": {
    top: "50%",
    left: "17px",
    transform: "translateY(-50%)", // 👈 center label vertically when empty
    color: "#666",
    fontSize: "0.78rem",
    transition: "all 0.2s ease",
    
  },
  "& .MuiInputLabel-shrink": {
    top: "3px",
    transform: "translateY(-50%) scale(0.85)", // 👈 float upward when filled/focused
  },
}));


export const PurchaseOrderHeader = styled(Stack)(() => ({
  marginTop: "20px",
  marginBottom: "10px",
  flexDirection: "row",
  alignItems: "center",
  display: "flex",
  gap: "10px",
}));

export const PurchaseOrderTitle = styled(Typography)(() => ({
  fontWeight: 300,
  color: "#212c5e",
  fontSize: "1.0rem", 
  marginLeft: "4px",
}));

export const PurchaseOrderTable = styled(Table)(() => ({
  border: "1px solid #d3d3d3",
  borderRadius: "20px",
  overflow: "hidden",
  width: "599px", 
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
  "& th": {
    backgroundColor: "#212c5e",
    color: "#fff",
    fontWeight: 500,
    textAlign: "left",
  },
  "& td": {
    textAlign: "left",
  },
  "& .MuiTableCell-root": {
    borderBottom: "1px solid #e0e0e0",
  },
}));

export const NoDataCell = styled(TableCell)(() => ({
  textAlign: "center",
  padding: "20px",
  color: "#757575",
}));


export const AsnDialogActions = styled(DialogActions)(() => ({
  justifyContent: "flex-end",
  padding: "2px",
}));

export const ResetButton = styled(Button)(() => ({
  borderRadius: "20px",
  color: "#212c5e",
  border: "1px solid #bdbdbdff",
  textTransform: "uppercase",
  padding: "6px 16px",
  fontWeight: 600,
  boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.45)", // soft bottom shadow
  marginBottom: "15px", // optional
}));

export const SaveButton = styled(Button)(() => ({
  borderRadius: "20px",
  backgroundColor: "#212c5e",   
  color: "#ffffff",             
  textTransform: "uppercase",
  padding: "6px 20px",
  fontWeight: 600,
  marginRight: "15px",
  marginBottom: "15px",
  border: "1px solid transparent",
  boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.45)", 
  transition: "all 0.25s ease",

  "&:hover": {
    backgroundColor: "#ffffff", 
    color: "#212c5e",            
    boxShadow: "0px 6px 10px rgba(33, 44, 94, 0.4)", 
    transform: "translateY(-2px)", 
  },
}));

export const AddPoButton = styled(IconButton)(() => ({
  backgroundColor: "#212c5e",   
  color: "#ffffff",             // white icon
  width: 28,
  height: 28,
  "& svg": {
    fontSize: 22,               // icon size
  },
  "&:hover": {
    backgroundColor: "#ffffffff", // turns white
    color: "#212c5eff", 
    boxShadow: "0 4px 12px rgba(33, 44, 94, 0.4)", // deeper hover shadow
    transform: "translateY(-2px)", // slight lift on hover
  },
}));

export const AsnDialogCard = styled(Card)(() => ({
  borderRadius: "20px",
  padding: "0px 15px 25px 15px",
  backgroundColor: "#fff",
  border: "1px solid #e0e0e0",
  maxWidth: "90vw",
  boxShadow:
    "0px 5px 6px -3px rgba(0,0,0,0.2), 0px 9px 12px 1px rgba(0,0,0,0.14), 0px 3px 16px 2px rgba(0,0,0,0.12)", // 👈 matches the one in your screenshot
}));


export const AsnVerticalDivider = styled(Divider)(() => ({
  width: "654px",
  borderWidth: "1px",
  borderColor: "#ebebebff",
  marginLeft: "22px",
}));

export const TableCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "cardWidth",
})<{ cardWidth?: string }>(({ cardWidth = "597px" }) => ({
  borderRadius: "20px",
  padding: "5px 10px 13px 10px",
  backgroundColor: "#fff",
  border: "1px solid #e0e0e0",
  width: cardWidth,
  maxWidth: "90vw",
  boxShadow:
    "0px 0px 0px 0px rgba(0,0,0,0.2), 0px 9px 6px 0px rgba(0,0,0,0.14), 0px 7px 26px 2px rgba(0,0,0,0.12)", 
}));

export const SelectPurchaseHeader = styled(Stack)(() => ({
  marginTop: "20px",
  marginBottom: "10px",
  flexDirection: "row",
  alignItems: "center",
  display: "flex",
  gap: "175px",
}));


export const SearchContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "8px", 
}));


export const SearchLabel = styled(Typography)(() => ({
  fontWeight: 500,
  fontSize: "14px",
}));


export const SearchInput = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    height: "32px",
    borderRadius: "6px",
    fontSize: "14px",
    backgroundColor: "#fff",
    "& fieldset": {
      borderColor: "#ccc",
      transition: "all 0.2s ease",
    },
    "&:hover fieldset": {
      borderColor: "#999",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#212c5e",
      boxShadow: "0 0 3px rgba(33,44,94,0.4)",
    },
  },
}));

export const SelectTableCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "cardWidth",
})<{ cardWidth?: string }>(({ cardWidth = "597px" }) => ({
  borderRadius: "20px",
  padding: "5px 10px 20px 10px",
  backgroundColor: "#fff",
  border: "1px solid #e0e0e0",
  width: cardWidth,
  maxWidth: "90vw",
  boxShadow:
    "0px 0px 0px 0px rgba(0,0,0,0.2), 0px 9px 6px 0px rgba(0,0,0,0.14), 0px 7px 26px 2px rgba(0,0,0,0.12)", 
}));

export const CloseButton = styled(Button)(() => ({
  borderRadius: "20px",
  color: "#212c5e",
  border: "1px solid #bdbdbdff",
  textTransform: "uppercase",
  padding: "6px 16px",
  fontWeight: 600,
  boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.45)", // soft bottom shadow
  marginTop: "15px"

}));

export const SelectedButton = styled(Button)(() => ({
  borderRadius: "20px",
  backgroundColor: "#212c5e",   // dark blue background
  color: "#ffffff",             // white text
  textTransform: "uppercase",
  padding: "6px 20px",
  fontWeight: 600,
  marginRight: "2px",
  marginTop: "15px",
  border: "1px solid transparent",
  boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.45)", // soft bottom shadow
  transition: "all 0.25s ease", // smooth hover animation

  "&:hover": {
    backgroundColor: "#ffffff",  // turns white
    color: "#212c5e",            // blue text
    boxShadow: "0px 6px 10px rgba(33, 44, 94, 0.4)", // deeper hover shadow
    transform: "translateY(-2px)", // subtle lift
  },
}));