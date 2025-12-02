"use client";
import React, { ChangeEvent } from "react";
import { Add, Close, Remove as RemoveIcon, Delete as DeleteIcon, AddBox } from "@mui/icons-material";
import {
  Alert,
  Button,
  Card,
  Collapse,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { AsnTableRow, AsnTableRowData, AsnTextFields, DataCell, SaveButtons } from "@/styles/AsnList/AsnDialog";
import { useDialogAsn } from "@/hooks/AsnList/useDialogAsn";
import { ActionProps } from "@/interfaces/AsnList/AsnList";

export default function DialogAsn(props: ActionProps) {
  const {
    data,
    setData,
    selectPo,
    handleToggle,
    selected,
    handleSelect,
    addedPo,
    filteredItems,
    handleReset,
    handleSaveWithValidation,
    handleSearchChange,
    noDataText,
    handleRemovePo,
    setShowSnackbar,
    showSnackbar,
    toastMessage,
    fieldError,
    validateField,
    toastSeverity,
  } = useDialogAsn(props);

  const { openModal, closeModal, searchTerm } = props;

  return (
    <>
      <Dialog
        open={openModal}
        onClose={() => {
          handleReset();
          closeModal();
        }}
        fullWidth
        slotProps={{ paper: { sx: { borderRadius: 4, maxWidth: 700 } } }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Enrollment&nbsp;&ndash;&nbsp;Asn
          <IconButton
            onClick={() => {
              handleReset();
              closeModal();
            }}
            size="small"
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Card sx={{ boxShadow: 3, p: 3 }}>
            <Stack spacing={2}>
              <AsnTextFields
                fullWidth
                label="ASN Number"
                value={data.AsnNumber}
                error={!!fieldError.AsnNumber}
                helperText={fieldError.AsnNumber}
                slotProps={{ input: { name: "AsnNumber" } }}
                onChange={(e) => {
                  setData({ ...data, AsnNumber: e.target.value });
                  validateField("AsnNumber", e.target.value);
                  props.handleFieldChange?.(e as ChangeEvent<HTMLInputElement>);
                }}
              />

              <AsnTextFields
                fullWidth
                label="Container Number"
                value={data.ContainerNumber}
                error={!!fieldError.ContainerNumber}
                helperText={fieldError.ContainerNumber}
                slotProps={{ input: { name: "ContainerNumber" } }}
                onChange={(e) => {
                  setData({ ...data, ContainerNumber: e.target.value });
                  validateField("ContainerNumber", e.target.value);
                  props.handleFieldChange?.(e as ChangeEvent<HTMLInputElement>);
                }}
              />
            </Stack>

            {/* Added Purchase Orders */}
            <Card sx={{ mt: 3, boxShadow: 10, p: 2, borderRadius: 2 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="subtitle1">Added Purchase Orders</Typography>
                <IconButton size="small" onClick={handleToggle}>
                  {selectPo ? <RemoveIcon /> : <Add fontSize="small" />}
                </IconButton>
              </Stack>
              <Table size="small" sx={{ border: "1px solid #e0e0e0" }}>
                <TableHead>
                  <AsnTableRow>
                    <TableCell>Purchase Order Number</TableCell>
                    <TableCell>SKU</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell align="right" />
                  </AsnTableRow>
                </TableHead>
                <TableBody>
                  {addedPo?.length > 0 ? (
                    addedPo?.map((item) => (
                      <AsnTableRowData key={item.PODetailIds}>
                        <TableCell>{item.PurchaseOrderNumber}</TableCell>
                        <TableCell>{item.SKU}</TableCell>
                        <TableCell>{item.ItemName}</TableCell>
                        <TableCell align="right">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => {
                              props.handleAddRemovePoId(item.PODetailIds, false);
                              handleRemovePo(item.SKU);
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </AsnTableRowData>
                    ))
                  ) : (
                    <AsnTableRowData>
                      <DataCell colSpan={4}>No Data</DataCell>
                    </AsnTableRowData>
                  )}
                </TableBody>
              </Table>
            </Card>

            {/* Select Purchase Orders */}
            <Collapse in={selectPo} timeout={300} unmountOnExit>
              <Card sx={{ boxShadow: 3, p: 2, mt: 2 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="subtitle1">Select Purchase Orders</Typography>
                  <TextField label="Search" size="small" value={searchTerm} onChange={(e) => handleSearchChange(e.target.value)} />
                </Stack>
                <Table size="small" sx={{ border: "1px solid #e0e0e0" }}>
                  <TableHead>
                    <AsnTableRow>
                      <TableCell padding="checkbox" />
                      <TableCell>Purchase Order Number</TableCell>
                      <TableCell>SKU</TableCell>
                      <TableCell>Description</TableCell>
                    </AsnTableRow>
                  </TableHead>
                  <TableBody>
                    {filteredItems.length > 0 ? (
                      filteredItems.map((item) => (
                        <AsnTableRowData key={item.PODetailIds}>
                          <TableCell padding="checkbox">
                            <IconButton
                              size="small"
                              onClick={() => {
                                handleSelect(item.SKU);
                                props.handleAddRemovePoId(item.PODetailIds, true);
                              }}
                            >
                              <AddBox fontSize="small" color={selected.includes(item.SKU) ? "success" : "action"} />
                            </IconButton>
                          </TableCell>
                          <TableCell>{item.PurchaseOrderNumber}</TableCell>
                          <TableCell>{item.SKU}</TableCell>
                          <TableCell>{item.ItemName}</TableCell>
                        </AsnTableRowData>
                      ))
                    ) : (
                      <AsnTableRowData>
                        <DataCell colSpan={4}>{noDataText()}</DataCell>
                      </AsnTableRowData>
                    )}
                  </TableBody>
                </Table>
              </Card>
            </Collapse>
          </Card>

          <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ mt: 2 }}>
            <Button sx={{ border: "1px solid gray", borderRadius: 2 }} onClick={handleReset}>
              Reset
            </Button>
            <SaveButtons onClick={handleSaveWithValidation}>{props.asnData?.AsnId ? "Update" : "Save"}</SaveButtons>
          </Stack>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={5000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={toastSeverity}
          variant="filled"
          icon={<CheckCircleIcon />}
          onClose={() => setShowSnackbar(false)}
          sx={{
            bgcolor: toastSeverity === "error" ? "red" : "green",
            color: "white",
            fontWeight: "bold",
            alignItems: "center",
            borderRadius: "8px",
          }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
