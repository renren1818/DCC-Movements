import { Close } from "@mui/icons-material";
import {
  Dialog, DialogContent, DialogTitle, FormControl, Grid, IconButton,
  InputLabel, MenuItem, Select, Stack, TextField, Button, Typography,
  Box, InputAdornment,Snackbar,Alert} from "@mui/material";
import { CreateTeam } from "@/interfaces/enrollment/Teams/Teams";
import { SharedOption } from "@/interfaces/enrollment/Common/SharedOption";
import { Schedule } from "@/interfaces/enrollment/Teams/Schedule";
import { useTeamDialog } from "@/hooks/Enrollment/Teams/useTeamDialog";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface ActionProps {
  openModal: boolean;
  closeModal: () => void;
  scheduleData: Schedule[];
  distriCenter: SharedOption[];
  teamData?: CreateTeam;
  onSave: (team: CreateTeam) => void | Promise<void>;
}

export default function AddModifiedDialogTeam({
  openModal, closeModal, scheduleData, distriCenter, teamData, onSave
}: ActionProps) {

  const {
    data,
    tempColor,
    colorDialogOpen,
    selectedScheduleId,
    uiSchedule,
    setData,
    setTempColor,
    setColorDialogOpen,
    setSelectedScheduleId,
    handleSave,
    handleChange,
    handleReset,
    fieldError,
    showToast,
    setShowToast,
    toastMessage
  } = useTeamDialog(teamData, scheduleData);

  return (

    <>
    <Dialog open={openModal} onClose={closeModal} maxWidth="sm" fullWidth
      slotProps={{ paper: { sx: { borderRadius: "30px" } } }}>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        Enrollment&nbsp;&ndash;&nbsp;Team
        <IconButton onClick={closeModal} size="small"><Close /></IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={3}>

          <Grid size={6}>
            <Stack spacing={2}>
              <TextField
                label="Team Name"
                name="Name"
                value={data.Name ?? ""}
                onChange={handleChange}
                fullWidth
                error={Boolean(fieldError.Name)}
                helperText={fieldError.Name}
              />

              <TextField
                label="Color Code"
                name="ColorCode"
                value={data.ColorCode ?? ""}
                onChange={handleChange}
                fullWidth
                error={Boolean(fieldError.ColorCode)}
                helperText={fieldError.ColorCode}
                slotProps={{
                  inputLabel: { shrink: true },
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <Box
                          onClick={() => { setTempColor(data.ColorCode); setColorDialogOpen(true); }}
                          sx={{
                            width: 32, height: 32, borderRadius: "4px",
                            bgcolor: data.ColorCode, border: "1px solid #ccc", cursor: "pointer"
                          }}
                        />
                      </InputAdornment>
                    )
                  }
                }}
              />

              <TextField
                label="Area"
                name="Area"
                value={data.Area}
                onChange={handleChange}
                fullWidth
                error={Boolean(fieldError.Area)}
                helperText={fieldError.Area}
              />

              <FormControl fullWidth error={Boolean(fieldError.LocationId)}>
                <InputLabel id="location-label">Location</InputLabel>
                <Select
                  labelId="location-label"
                  value={data.LocationId}
                  onChange={(e) => setData((p: any) => ({ ...p, LocationId: Number(e.target.value) }))}
                >
                  {distriCenter.map(center =>
                    <MenuItem key={center.Value} value={center.Value} disabled={center.Disabled}>
                      {center.Label}
                    </MenuItem>
                  )}
                </Select>
                {fieldError.LocationId && (
                  <Typography variant="caption" color="error">
                    {fieldError.LocationId}
                  </Typography>
                )}
              </FormControl>
            </Stack>
          </Grid>

          <Grid size={6}>
            <FormControl fullWidth sx={{ mb: 2 }} error={Boolean(fieldError.ScheduleDateId)}>
              <InputLabel id="schedule-label">Schedule</InputLabel>
              <Select
                labelId="schedule-label"
                value={selectedScheduleId || 0}
                onChange={(e) => setSelectedScheduleId(Number(e.target.value))}
              >
                {scheduleData.map(s =>
                  <MenuItem key={s.ScheduleId} value={Number(s.ScheduleId)}>{s.Name}</MenuItem>
                )}
              </Select>
              {fieldError.ScheduleDateId && (
                <Typography variant="caption" color="error">
                  {fieldError.ScheduleDateId}
                </Typography>
              )}
            </FormControl>

            <Box sx={{ border: "1px solid #ccc", borderRadius: "8px", overflow: "hidden", p: 2 }}>
              <Grid container columns={7} sx={{ mb: 2 }}>
                {uiSchedule.map((row, idx) =>
                  <Grid key={idx} size={1} sx={{ display: "flex", justifyContent: "center" }}>
                    <Box sx={{
                      width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
                      borderRadius: "4px", bgcolor: row.active ? "green" : "grey.200",
                      color: "white", fontWeight: "bold", fontSize: "0.75rem", mr: "3px"
                    }}>
                      {row.day[0]}
                    </Box>
                  </Grid>
                )}
              </Grid>

              {uiSchedule.map((row, idx) =>
                <Grid container key={idx} sx={{ borderBottom: idx < uiSchedule.length - 1 ? "1px solid #eee" : "none", py: 1 }}>
                  <Grid size={4}><Typography fontWeight="bold">{row.day.slice(0, 3).toUpperCase()}</Typography></Grid>
                  <Grid size={4}><Typography>{row.start}</Typography></Grid>
                  <Grid size={4}><Typography>{row.end}</Typography></Grid>
                </Grid>
              )}
            </Box>
          </Grid>
        </Grid>

        <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
          {(data.SecretaryId ?? 0) === 0 && (
            <Button variant="outlined" color="primary" sx={{ borderRadius: "20px" }} onClick={handleReset}>
              RESET
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            sx={{ borderRadius: "20px" }}
            onClick={() => handleSave(onSave)}
          >
            {data.TeamId === 0 ? "Save" : "Update"}
          </Button>
        </Stack>
      </DialogContent>

      <Dialog open={colorDialogOpen} onClose={() => setColorDialogOpen(false)} fullWidth maxWidth="xs"
        PaperProps={{ sx: { borderRadius: 2, m: 1, overflowX: "hidden" } }}>
        <DialogTitle>Choose a Color</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400, minHeight: 180 }}>
          <TextField
            type="color"
            value={tempColor}
            onChange={(e) => setTempColor(e.target.value)}
            fullWidth
            slotProps={{ input: { sx: { height: 60, p: 0, cursor: "pointer" } } }}
          />
          <Typography>Selected: {tempColor}</Typography>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button onClick={() => setColorDialogOpen(false)}>Cancel</Button>
            <Button
              variant="contained"
              onClick={() => { setData(p => ({ ...p, ColorCode: tempColor })); setColorDialogOpen(false); }}
            >
              OK
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </Dialog>

      <Snackbar open={showToast} autoHideDuration={1000} onClose={() => setShowToast(false)} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
            <Alert severity="success" variant="filled" icon={<CheckCircleIcon />} onClose={() => setShowToast(false)}
              sx={{bgcolor: "green", color: "white", fontWeight: "bold", alignItems: "center", borderRadius: "8px"}}>
              {toastMessage}
            </Alert>
          </Snackbar>
</>
    
  );
}