import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, IconButton, Stack, TextField, FormControl,
  InputLabel, Select, MenuItem, Typography, RadioGroup,
  FormControlLabel, Radio,
  Snackbar,
  Alert
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ActionProps } from "@/interfaces/enrollment/Assets/Assets";
import useAssetsDialog from "@/hooks/Enrollment/Assets/useAssetsDialog";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function AddModifiedDialogAsset({openModal, closeModal, equipmentType, distriCenter, equipmentData, onSaved,}: ActionProps) {

  const { data, setData, errors, handleReset, handleSave,  showToast, setShowToast,toastMessage } = useAssetsDialog({
    openModal,
    equipmentData,
    onSaved,
    closeModal,
  });

  return (
 <>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog
        open={openModal}
        onClose={closeModal}
        maxWidth="xs"
        fullWidth
        slotProps={{ paper: { sx: { borderRadius: "20px" } } }}
      >
        <DialogTitle
          sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
        >
          Enrollment&nbsp;&ndash;&nbsp;Equipment
          <IconButton onClick={closeModal} size="small">
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Stack spacing={2}>
            <TextField
              label="Equipment Code"
              value={data.Code ?? ""}
              onChange={(e) => setData((p) => ({ ...p, Code: e.target.value }))}
              fullWidth
              error={!!errors.Code}
              helperText={errors.Code}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
            />

            <TextField
              label="Equipment Name"
              value={data.Name ?? ""}
              onChange={(e) => setData((p) => ({ ...p, Name: e.target.value }))}
              fullWidth
              error={!!errors.Name}
              helperText={errors.Name}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
            />

            <FormControl
              fullWidth
              error={!!errors.EquipmentTypeId}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
            >
              <InputLabel id="EquipmentType">Equipment Type</InputLabel>
              <Select
                labelId="EquipmentType"
                value={data.EquipmentTypeId ?? ""}
                onChange={(e) =>
                  setData((p) => ({ ...p, EquipmentTypeId: Number(e.target.value) }))
                }
                label="Equipment Type"
              >
                {equipmentType.map((type) => (
                  <MenuItem key={type.EquipmentTypeId} value={type.EquipmentTypeId}>
                    {type.Description}
                  </MenuItem>
                ))}
              </Select>
              {errors.EquipmentTypeId && (
                <Typography color="error" variant="caption">
                  {errors.EquipmentTypeId}
                </Typography>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={!!errors.BuildingId}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
            >
              <InputLabel id="Location">Location</InputLabel>
              <Select
                labelId="Location"
                value={data.BuildingId ?? ""}
                onChange={(e) =>
                  setData((p) => ({ ...p, BuildingId: Number(e.target.value) }))
                }
                label="Location"
              >
                {distriCenter.map((center) => (
                  <MenuItem key={center.Value} value={center.Value} disabled={center.Disabled}>
                    {center.Label}
                  </MenuItem>
                ))}
              </Select>
              {errors.BuildingId && (
                <Typography color="error" variant="caption">
                  {errors.BuildingId}
                </Typography>
              )}
            </FormControl>

            <DatePicker
              label="Purchase Date"
              value={data.PurchaseDate}
              onChange={(date) => setData((p) => ({ ...p, PurchaseDate: date }))}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!errors.PurchaseDate,
                  helperText: errors.PurchaseDate,
                  sx: { "& .MuiOutlinedInput-root": { borderRadius: "10px" } },
                },
              }}
            />

            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Equipment Status
              </Typography>
              <RadioGroup
                row
                value={data.EquipmentStatus ?? ""}
                onChange={(e) =>
                  setData((p) => ({ ...p, EquipmentStatus: e.target.value }))
                }
              >
                <FormControlLabel value="working" control={<Radio />} label="Working" />
                <FormControlLabel value="defective" control={<Radio />} label="Defective" />
              </RadioGroup>
              {errors.EquipmentStatus && (
                <Typography color="error" variant="caption">
                  {errors.EquipmentStatus}
                </Typography>
              )}
            </Stack>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={handleReset}>
            RESET
          </Button>
          <Button variant="contained" onClick={handleSave}>
            {data.EquipmentId === 0 ? "Save" : "Update"}
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
 
     <Snackbar open={showToast} autoHideDuration={2000} onClose={() => setShowToast(false)} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert severity="success" variant="filled" icon={<CheckCircleIcon />} onClose={() => setShowToast(false)}
               sx={{bgcolor: "green", color: "white", fontWeight: "bold", alignItems: "center", borderRadius: "8px"}}>
               {toastMessage}
        </Alert>
      </Snackbar>
 </>
  );
}