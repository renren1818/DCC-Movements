import Close from "@mui/icons-material/Close";
import Print from "@mui/icons-material/Print";
import { Badge, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { StyledToggleButton, StyledToggleButtonGroup } from "./Styles";
import { ILpnDialog, ILpnExpiry, ILpnParams } from "@/interfaces/Hub/Receiving";
import useLpn from "@/hooks/Supervisor/Hub/Lpn";

import BugIcon from '@mui/icons-material/BugReportOutlined';

export default function Lpn(props: { lpnDialog: ILpnDialog, lpns: ILpnExpiry[], params: ILpnParams}) {

    const lpn = useLpn(props.lpnDialog, props.lpns, props.params );

    return (

        <Dialog open={props.lpnDialog.open} fullWidth>
            <DialogTitle>
                <Stack alignItems={'center'}>
                    <Print color="primary" sx={{ fontSize: 80 }} />
                    <Typography color='primary' variant="h4">Generate License Plates</Typography>
                </Stack>
            </DialogTitle>
            <IconButton
                sx={{ position: 'absolute', right: 8, top: 8 }}
                onClick={props.lpnDialog.close}
            >
                <Close />
            </IconButton>
            <DialogContent dividers>
                
                <Grid container alignItems={'center'} padding={2} spacing={2}>

                    <Grid size={6}>
                        <Typography variant="h6">Expiration Date</Typography>
                    </Grid>
                    <Grid size={6}>
                        <Select value={lpn.currentExpiry} onChange={(event) => lpn.handleExpiryChange(event.target.value)} fullWidth sx={{ textAlign: 'center'}}>

                            {
                                props.lpns.map((l) => (
                                    <MenuItem value={lpn.formattedExpiryDate(l.ExpiryDate)} sx={{ justifyContent: 'center' }}>
                                        {lpn.formattedExpiryDate(l.ExpiryDate)}
                                    </MenuItem>
                                ))
                            }

                        </Select>
                    </Grid>

                    <Grid size={6}>
                        <Typography variant="h6">Confirming Pallets</Typography>
                    </Grid>
                    <Grid size={6}>
                        <TextField value={lpn.currentLpn?.PalletCount ?? ''} fullWidth slotProps={{ input: { readOnly: true }}}  sx={{'& .MuiInputBase-input': { textAlign: 'center' }}} />
                    </Grid>

                    <Grid size={6}>
                        <Typography variant="h6">Non-Confirming Pallets</Typography>
                    </Grid>
                    <Grid size={6} justifyItems={'center'}>
                        <Stack direction={'row'} justifyContent={'space-between'}>
                            <StyledToggleButtonGroup value={lpn.currentLpn?.IsNonConformingPallets ? 'Y' : 'N'}>
                                 <StyledToggleButton value={'Y'}>Y</StyledToggleButton>
                                 <StyledToggleButton value={'N'}>N</StyledToggleButton>
                            </StyledToggleButtonGroup>
                        </Stack>
                    </Grid>
                    
                    <Grid size={12} textAlign={'center'} paddingTop={2}>
                        <StyledToggleButtonGroup exclusive value={lpn.currentPrinter} onChange={(event, value) => lpn.setCurrentPrinter(value)}>
                            {

                                [0, 1, 2, 3].map((idx) => (
                                    <Badge 
                                        badgeContent={lpn.printers[idx] === 'DEBUG' ? <BugIcon sx={{fontSize: 12}} /> : 0}
                                        color="warning"
                                    >
                                        <StyledToggleButton value={`${idx}`} disabled={`${lpn.printers[idx]}` === 'undefined'}>{idx + 1}</StyledToggleButton>
                                    </Badge>
                                ))

                            }
                        </StyledToggleButtonGroup>
                    </Grid>

                </Grid>

                <Box padding={'20px 50px'}>
                    <Button 
                        variant="contained" 
                        fullWidth 
                        disabled={!lpn.currentLpn || lpn.currentPrinter === ''}
                        onClick={lpn.generateLpns}
                    >
                        PRINT
                    </Button>
                </Box>

            </DialogContent>

        </Dialog>

    )

}