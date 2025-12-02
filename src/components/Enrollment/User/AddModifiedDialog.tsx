import { Close } from '@mui/icons-material';
import {
  Alert,
  Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle,
  FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Grid, IconButton,
  InputLabel, MenuItem, Radio, RadioGroup, Select , Snackbar, Stack, TextField
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import React, { useEffect, useState } from 'react';
import { ActionProps, AddUser } from '@/interfaces/enrollment/Employee/User';
import { AddUpdateUserSchema } from '@/validation/Enrollment/UserValidation';
import { FieldError } from '@/utils/FieldError';


const defaultUser : AddUser = {
    UserId: 0,
    EmployeeNumber: "",
    FirstName: "",
    MiddleName: "",
    LastName: "",
    LocationId: 0,
    DesignationId: 0,
    TeamId: 0,
    EmploymentStatus: "active",
    SkillIds: [],
    RoleIds: [],
    ActiveStatus: true,
    IsLogIn: false,
    IsPasswordReset: false,
}
export default function AddModifiedDialog({ openModal, closeModal, userData, onSaved, designation, roles, team, location, skills } : ActionProps) {
  const [data, setData] = useState<AddUser>({...defaultUser , ...userData});
  const [fieldError, setFieldError] = useState<Record<string,string>>({})
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setData(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSelectChange = (id: number, property: string) =>
    setData(p => ({ ...p, [property]: id }));

  const handleSkillToggle = (skillId: number, checked: boolean) =>
    setData(p => ({ ...p, SkillIds: checked ? [...(p.SkillIds ?? []), skillId] : (p.SkillIds ?? []).filter(id => id !== skillId) }));

  const handleRoleToggle = (roleId: number, checked: boolean) =>
    setData(p => ({ ...p, RoleIds: checked ? [...(p.RoleIds ?? []), roleId] : (p.RoleIds ?? []).filter(id => id !== roleId) }));

  const handleSave = async() =>{
    const result = AddUpdateUserSchema.safeParse(data);
    if (!result.success) {
      const errorMessages = FieldError(result.error.issues);
      setFieldError(errorMessages);
      return;
    }
    
    await onSaved(result.data);

    if (!data.UserId) {
      setData(defaultUser);
    }

    setShowToast(true);
    setToastMessage(data.UserId === 0 ? "Saved Successfully" : "Updated Successfully")
    closeModal();
  }

  useEffect(() => {
  if (openModal) {
    setData(userData?.UserId ? userData : defaultUser);
    setFieldError({});
  }
}, [openModal, userData]);

  return (
   <>

    <Dialog open={openModal} onClose={closeModal} maxWidth="md" fullWidth slotProps={{ paper: { sx: { borderRadius: "30px" } } }}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Enrollment&nbsp;&ndash;&nbsp;Employee <IconButton onClick={closeModal} size="small"><Close /></IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid size={5} sx={{ height: "450px" }}>
            <Stack spacing={2}>
              <TextField label="Employee Number" name={'EmployeeNumber'} value={data?.EmployeeNumber ?? ''} onChange={handleChange} error={!!fieldError.EmployeeNumber} helperText={fieldError.EmployeeNumber} fullWidth />
              <TextField label="First Name" name={'FirstName'} value={data?.FirstName ?? '' } error={!!fieldError.FirstName} helperText={fieldError.FirstName} onChange={handleChange} fullWidth />
              <TextField label="Middle Name" name={'MiddleName'} value={data?.MiddleName ?? ''}  onChange={handleChange} fullWidth />
              <TextField label="Last Name" name={'LastName'} value={data?.LastName ?? ''} error={!!fieldError.LastName} helperText={fieldError.LastName} onChange={handleChange} fullWidth />

              <FormControl fullWidth variant='outlined'>
                <InputLabel id="location-label" variant='outlined'>Location</InputLabel>
                <Select labelId="location-label" value={data?.LocationId } error={!!fieldError.LocationId}  onChange={(e) => handleSelectChange(parseInt(e.target.value.toString()), "LocationId")} variant='outlined'>
                  {location?.map(d => (
                    <MenuItem key={d.Value} value={d.Value} disabled={d.Disabled}>{d.Label}</MenuItem>
                  ))}

                </Select>
                    <FormHelperText sx={{ color: 'error.main' }}>{fieldError.LocationId} </FormHelperText>
              </FormControl>

              <FormControl fullWidth variant="outlined">
                <InputLabel id="designation-label">Designation</InputLabel>
                <Select labelId="designation-label" value={data?.DesignationId } error={!!fieldError.DesignationId} onChange={(e) => handleSelectChange(parseInt(e.target.value.toString()), "DesignationId")}>
                  {designation?.map(d => (
                    <MenuItem key={d.Value} value={d.Value} disabled={d.Disabled}>{d.Label}</MenuItem>
                  ))}
                </Select>
                 <FormHelperText sx={{ color: 'error.main' }}>{fieldError.DesignationId} </FormHelperText>
              </FormControl>
            </Stack>
          </Grid>

          <Grid size={7} sx={{ height: "30px" }}>
            <FormControl fullWidth>
              <InputLabel id="team-label">Team</InputLabel>
              <Select labelId="team-label" value={data?.TeamId ?? '' } error={!!fieldError.TeamId}  onChange={(e) => handleSelectChange(parseInt(e.target.value.toString()), "TeamId")}>
                {team?.map(d => (
                  <MenuItem key={d.Value} value={d.Value} disabled={d.Disabled}>{d.Label}</MenuItem>
                ))}
              </Select>
                   <FormHelperText  sx={{ color: 'error.main' }}>{fieldError.TeamId} </FormHelperText>
            </FormControl>

            <FormControl component="fieldset" sx={{ mt: 2 }}>
                <FormLabel>Employment Status</FormLabel>
                  <RadioGroup row value={data.EmploymentStatus} onChange={(e) => setData((p) => ({ ...p, EmploymentStatus: e.target.value as "active" | "inactive" }))}>
                    {["active", "inactive"].map((status) => (
                      <FormControlLabel key={status} value={status} control={<Radio />}  label={status.charAt(0).toUpperCase() + status.slice(1)}/>
                    ))}
                  </RadioGroup>
                    <FormHelperText sx={{ color: "error.main" }}>{fieldError.EmploymentStatus}</FormHelperText>
            </FormControl>


            <FormControl component="fieldset" error={!!fieldError.SkillIds} sx={{ mt: 2 }}>
              <FormLabel>Skills</FormLabel>
              <FormGroup row>
                {skills?.map((s) => (
                  <FormControlLabel key={s.Id} label={s.Name} sx={{ width: 110 }} slotProps={{ typography: { fontSize: '0.8rem' } }}
                    control={<Checkbox checked={data?.SkillIds?.includes(s.Id) ?? false} onChange={(e) => handleSkillToggle(s.Id, e.target.checked)}/>}
                  />
                ))}
              </FormGroup>
                <FormHelperText  sx={{ color: 'error.main', paddingTop: "12px" }}>{fieldError.SkillIds}</FormHelperText>

            </FormControl>

            <FormControl component="fieldset" error={!!fieldError.RoleIds} sx={{ mt: 2 }}>
              <FormLabel>Roles</FormLabel>
              <FormGroup row>
                {roles?.map((r, index) => (
                  <FormControlLabel
                    key={index}
                    control={<Checkbox name={r.Name} checked={data?.RoleIds?.includes(r.Id) ?? false} onChange={(e) => handleRoleToggle(r.Id, e.target.checked)}/>}
                    label={r.Name}
                    sx={{ width: 110 }}
                    slotProps={{ typography: { fontSize: '0.8rem' } }}
                  />
                ))}
                   <FormHelperText  sx={{ color: 'error.main', paddingTop: "12px" }}>{fieldError.RoleIds}</FormHelperText>
              </FormGroup>


            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{paddingRight:"15px"}} >
        {(data.UserId ?? 0) === 0 && (
          <Button onClick={() => {
          if (window.confirm("Reset all the changes?")) {
          setData({ ...defaultUser, ...userData });
          setFieldError({});
        }}}>
      Reset
    </Button> )}

        {(data.UserId ?? 0) > 0 && (
      <>
      <Button color="warning"
        onClick={() => {
          if (window.confirm("Reset this user's password?")) {
            console.log("Reset password for", data.UserId);
          }
        }}
      >
        Reset Password
      </Button>

      <Button
        color="error"
        onClick={() => {
          if (window.confirm("Log this user out?")) {

            console.log("Logout user", data.UserId);
          }
        }}
      >
        Logout
      </Button>
    </>
        )}

      <Button variant="contained" onClick={handleSave}>
          {data.UserId ? "Update" : "Save"}
      </Button>

      </DialogActions>
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
