import styled from "@emotion/styled"; import { Box, Button, Dialog, DialogActions, DialogTitle, Typography } from "@mui/material";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: "30px",
    width: "450px",
  },
}));

const TitleBar = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: "#212C5E",
  padding: "16px",

}));

const BoldTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
 
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display:"flex",
  justifyContent: "center",
  flexDirection: "column",
  margin: "10px",
  padding: "20px",
  paddingTop: "15px",
}));

const CenteredActions = styled(DialogActions)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const DeleteButton = styled(Button)(() => ({
  backgroundColor: "#212C5E",
  color: "white",
  padding: "4px 10px",
  borderRadius: "28px",
  width:"150px",
  margin: "10px",
  "&:hover": {
    backgroundColor: "white",
    color: "#212C5E",
  },
}));

const CancelButton = styled(Button)(() =>({
  backgroundColor: "#201c1cff",
  color: "white",
  padding: "4px 10px",
  borderRadius: "28px",
  width:"150px",
}))
export {
  ContentBox,
  StyledDialog,
  TitleBar,
  BoldTitle,
  CenteredActions,
  DeleteButton,
  CancelButton
};