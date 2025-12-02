import { ILpnExpiry } from "@/interfaces/Hub/Receiving";
import { Delete } from "@mui/icons-material";
import { Checkbox, FormControlLabel, IconButton, Stack, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function Pallets(props: {index : number, lpn: ILpnExpiry, onChange: (index: number, lpn: ILpnExpiry) => void, onRemove: (index: number) => void }) {

    return (

        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack direction={'row'} spacing={1}>
                <DatePicker 
                    label='Expiration Date' 
                    value={dayjs(props.lpn.ExpiryDate)} 
                    onChange={(value) => props.onChange(props.index, { ...props.lpn, ExpiryDate: new Date(value!.toDate().setHours(0, 0, 0, 0)) })} 
                />
                <TextField 
                    label='Pallet Count' 
                    value={props.lpn.PalletCount !== 0 ? props.lpn.PalletCount : ''} 
                    error={props.lpn.PalletCount === 0}
                    helperText={props.lpn.PalletCount === 0 ? 'cannot be empty or 0.' : ''}
                    onChange={(event) => props.onChange(props.index, { ...props.lpn, PalletCount: +event.target.value })} 
                />
                <FormControlLabel control={<Checkbox checked={props.lpn.IsNonConformingPallets} onChange={(event) => props.onChange(props.index, { ...props.lpn, IsNonConformingPallets: event.target.checked })} />} label="Is Non-Conforming" />
                <IconButton onClick={() => props.onRemove(props.index)}><Delete color="error" /></IconButton>
            </Stack>
        </LocalizationProvider>

    );

}