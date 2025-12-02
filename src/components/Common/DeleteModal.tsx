import { BoldTitle, CancelButton, CenteredActions, ContentBox, DeleteButton, StyledDialog, TitleBar } from "@/styles/DeleteModal";
import { Close } from "@mui/icons-material";
import { Divider, IconButton, Typography} from "@mui/material";
import React from "react";

interface DeleteModalProps {
  open: boolean;
  close: () => void;
  dataInfo: string;
  id?: any

  removeData: () => void;
  cancelData: () => void;
}


export default function DeleteModal({ open, close, dataInfo,id,removeData, cancelData, }: DeleteModalProps) {
  return (
    <StyledDialog open={open} onClose={close} fullWidth>
      <TitleBar>
        <BoldTitle variant="h6">Delete {dataInfo}</BoldTitle>
        <IconButton onClick={close} size="small">
      <Close />
    </IconButton>
    </TitleBar>


      <Divider />
      <ContentBox>
        <Typography variant="h6">Are you sure you want to delete {dataInfo} <strong>{id}</strong> ?</Typography>
        <Typography variant="h6">This cannot be undone.</Typography>
      </ContentBox>
      <CenteredActions>
        <DeleteButton onClick={removeData}>Delete</DeleteButton>
        <CancelButton onClick={cancelData}>Cancel</CancelButton>
      </CenteredActions>
    </StyledDialog>
  );
}
