import useReceiving from "@/hooks/Supervisor/Hub/Receiving";
import { IPoDetails } from "@/interfaces/Hub/Door";
import { ISku } from "@/interfaces/Hub/Sku";
import { Add, CropFree, Lock, Subscript } from "@mui/icons-material";
import { Box, Button, Grid, InputAdornment, Paper, Stack, TextField, Typography } from "@mui/material";
import Pallets from "./Pallets";
import Lpn from "./Lpn";
import { StyledToggleButton, StyledToggleButtonGroup } from "./Styles";

export default function Receiving(props: { po?: IPoDetails, sku: ISku }) {

    const receiving = useReceiving(props.po, props.sku);

    return (

        <Stack spacing={2}>

            <Paper elevation={8} sx={{ padding: 2, minHeight: 200 }}>
                <Stack spacing={2}>

                    <Grid container>
                        
                        <Grid size={5} textAlign={'left'}>
                            <Grid container>
                                <Grid size={'grow'}>
                                    <Typography fontWeight={'bold'}>UPC Number: </Typography>
                                    <Typography variant="h4" color={receiving.matchedUPC ? 'success' : 'error'} fontWeight={'bold'}>{receiving.doorTeamDetails?.Upc}</Typography>
                                </Grid>
                                <Grid size={'auto'} marginX={2}>
                                    {
                                        (!receiving.doorTeamDetails || (receiving.doorTeamDetails && !receiving.doorTeamDetails?.Upc)) &&
                                        <Box 
                                            borderRadius={5}
                                            sx={{ backgroundColor: 'primary.main', width: '200px', padding: '15px' }}
                                        >
                                            <TextField 
                                                fullWidth
                                                label={<Typography variant="body1" display={'flex'} alignItems={'center'} fontWeight={'bold'}><CropFree sx={{ marginRight: 1 }} />Scan to verify SKU</Typography>}
                                                value={receiving.scannedUpc}
                                                onChange={(e) => receiving.setScannedUpc(e.target.value)}
                                                onKeyDown={receiving.checkUpc}
                                                slotProps={{
                                                    input: { sx: { color: 'white', fontWeight: 'bold' }}
                                                }}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        color: 'white',
                                                        '& fieldset': {
                                                            borderColor: 'white',
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: 'white',
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: 'white',
                                                        },
                                                    },
                                                    '& .MuiInputLabel-root, .MuiInputLabel-root.Mui-focused, .MuiInputLabel-shrink': {
                                                        color: 'white'
                                                    }
                                                }}
                                            />
                                        </Box>
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid size={2} textAlign={'left'}>
                            <Typography>SKU Description:</Typography>
                            <Typography>SKU Number:</Typography>
                            { (receiving.doorTeamDetails?.Upc) &&  <Typography>Vendor:</Typography> }
                        </Grid>
                        <Grid size={5} color={'primary.main'} textAlign={'right'}>
                            <Typography noWrap fontWeight={'bold'}>{props.sku.Description}</Typography>
                            <Typography>{props.sku.Sku}</Typography>
                            { (receiving.doorTeamDetails?.Upc) && <Typography>{receiving.currentUPC?.Vendor}</Typography> }
                        </Grid>

                        <Grid size={9} alignContent={'center'} justifyItems={'end'}>
                            <Typography variant="h6" color="primary" fontWeight={'bold'}>* Is this configuration correct?</Typography>
                        </Grid>
                        <Grid size={3} textAlign={'end'} padding={1}>
                            <StyledToggleButtonGroup exclusive value={receiving.isConfigurationCorrect} onChange={(event, value) => receiving.toggleIsConfigurationCorrect(value)}>
                                <StyledToggleButton value={receiving.isConfigurationCorrect === '' ? ':true' : 'true'}>Y</StyledToggleButton>
                                <StyledToggleButton value={receiving.isConfigurationCorrect === '' ? ':false' : 'false'}>N</StyledToggleButton>
                            </StyledToggleButtonGroup>      
                        </Grid>
                    </Grid>

                    <Paper elevation={2}>

                        <Stack>
                        
                            <Grid container sx={{ color: 'white', backgroundColor: 'grey' }}>
                                <Grid size={2} border={'1px solid white'} padding={1}>
                                    <Typography fontWeight={'bold'}>Unit Per Case</Typography>
                                </Grid>
                                <Grid size={1} border={'1px solid white'} padding={1}>
                                    <Typography fontWeight={'bold'}>Layer</Typography>
                                </Grid>
                                <Grid size={1} border={'1px solid white'} padding={1}>
                                    <Typography fontWeight={'bold'}>Tie</Typography>
                                </Grid>
                                <Grid size={2} border={'1px solid white'} padding={1}>
                                    <Typography fontWeight={'bold'}>Case Per Pallet</Typography>
                                </Grid>
                                <Grid size={2} border={'1px solid white'} padding={1}>
                                    <Typography fontWeight={'bold'}>Pallet Weight</Typography>
                                </Grid>
                                <Grid size={4} border={'1px solid white'} padding={1}>
                                    <Typography fontWeight={'bold'}>Total Cases</Typography>
                                </Grid>
                            </Grid>
                        
                            <Grid container padding={1} alignItems={'center'}>
                                <Grid size={2} padding={1}>
                                    <Typography variant="h5" color={receiving.currentUPC ? "primary" : "textDisabled"} fontWeight={'bold'}>
                                        {receiving.currentUPC ? receiving.currentUPC?.UnitQuantity : '-'}
                                        <sub style={{ color: 'GrayText', fontSize: 14 }}>
                                            {receiving.doorTeamDetails?.ConfiguredFootprint && receiving.currentUPC?.UnitQuantity }
                                        </sub>
                                    </Typography>
                                </Grid>
                                <Grid size={1} border={'1px solid white'} padding={1}>
                                    <Typography variant="h5" color={receiving.currentUPC ? "primary" : "textDisabled"} fontWeight={'bold'}>
                                        {receiving.doorTeamDetails?.ConfiguredFootprint ? receiving.doorTeamDetails?.ConfiguredFootprint.High : receiving.currentUPC ? receiving.currentUPC?.Hi : '-'}
                                        <sub style={{ color: 'GrayText', fontSize: 14 }}>
                                            {receiving.doorTeamDetails?.ConfiguredFootprint && receiving.currentUPC?.Hi}
                                        </sub>
                                    </Typography>
                                </Grid>
                                <Grid size={1} border={'1px solid white'} padding={1}>
                                    <Typography variant="h5" color={receiving.currentUPC ? "primary" : "textDisabled"} fontWeight={'bold'}>
                                        {receiving.doorTeamDetails?.ConfiguredFootprint ? receiving.doorTeamDetails?.ConfiguredFootprint.Tie : receiving.currentUPC ? receiving.currentUPC?.Tie : '-'}
                                        <sub style={{ color: 'GrayText', fontSize: 14 }}>
                                            {receiving.doorTeamDetails?.ConfiguredFootprint && receiving.currentUPC?.Tie}
                                        </sub>
                                    </Typography>
                                </Grid>
                                <Grid size={2} border={'1px solid white'} padding={1}>
                                    <Typography variant="h5" color={receiving.currentUPC ? "primary" : "textDisabled"} fontWeight={'bold'}>
                                        {receiving.doorTeamDetails?.ConfiguredFootprint ? receiving.doorTeamDetails?.ConfiguredFootprint.High * receiving.doorTeamDetails?.ConfiguredFootprint.Tie : receiving.currentUPC ? receiving.currentUPC?.CasePerPallet : '-'}
                                        <sub style={{ color: 'GrayText', fontSize: 14 }}>
                                            {receiving.doorTeamDetails?.ConfiguredFootprint && receiving.currentUPC?.CasePerPallet}
                                        </sub>
                                    </Typography>
                                </Grid>
                                <Grid size={2} border={'1px solid white'} padding={1}>
                                    <Typography variant="h5" color={receiving.currentUPC ? "primary" : "textDisabled"} fontWeight={'bold'}>{receiving.currentUPC ? `${receiving.currentUPC?.PalletWeight.toFixed(3)} KG` : '-'}</Typography>
                                </Grid>
                                <Grid size={4} border={'1px solid white'} padding={1}>
                                    <TextField 
                                        value={receiving.totalCases !== 0 ? receiving.totalCases : ''}
                                        onChange={(e) => receiving.setTotalCases(+e.target.value)}
                                        disabled={!receiving.enabledCases}
                                        slotProps={{
                                            input: {
                                                type: 'number',
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Lock color={ !receiving.enabledCases ? 'disabled' : receiving.matchedCases ? 'success' : 'error' } />
                                                    </InputAdornment>
                                                )
                                            },
                                            htmlInput: {
                                                readOnly: receiving.lockedCases,
                                                sx: {
                                                    color: receiving.matchedCases ? 'success.main' : 'error.main',
                                                    textAlign: 'center',
                                                    fontSize: 22,
                                                    fontWeight: 'bold'
                                                }
                                            }
                                        }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: receiving.matchedCases ? 'success.main' : 'error.main',
                                                    borderWidth: '3px'
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: receiving.matchedCases ? 'success.main' : 'error.main',
                                                    borderWidth: '3px'
                                                },
                                            },
                                        }}
                                    />
                                </Grid>
                            </Grid>

                        </Stack>

                    </Paper>

                    <Grid container>
                        
                        <Grid size={'grow'} textAlign={'left'}>
    
                            <Button
                                variant="contained"
                                disabled={!receiving.canAddLpns}
                                onClick={receiving.addLpnExpiry}
                            >
                                <Add /> Add Expiration Date/s
                            </Button>

                            <Stack spacing={2} marginTop={2}>
                            
                                {
                                    receiving.lpns.map((lpn, idx) => (
                                        <Pallets 
                                            key={idx} 
                                            index={idx}
                                            lpn={lpn} 
                                            onChange={(index, newLpn) => {
                                                receiving.setLpns(
                                                    receiving.lpns.map((l, idx) => idx === index ? newLpn : l)
                                                )
                                            }}
                                            onRemove={(index) => receiving.setLpns(receiving.lpns.filter((l, idx) => idx !== index))} 
                                        />
                                    ))
                                }
                                
                            </Stack>

                        </Grid>

                        <Grid size={'auto'}>

                            <Stack direction={'row'} spacing={2}>

                                <Stack spacing={1} alignItems={'center'}>
                                    <Typography>On Pallet</Typography>
                                    <StyledToggleButtonGroup exclusive value={receiving.isPalletized} onChange={(event, value) => receiving.toggleIsPalletized(value)} orientation="vertical">
                                        <StyledToggleButton value={receiving.isPalletized === '' ? ':true' : 'true'}>Y</StyledToggleButton>
                                        <StyledToggleButton value={receiving.isPalletized === '' ? ':false' : 'false'}>N</StyledToggleButton>
                                    </StyledToggleButtonGroup>      
                                </Stack>

                                <Stack spacing={1} alignItems={'center'}>
                                    <Typography>Case Code</Typography>
                                    <StyledToggleButtonGroup exclusive value={receiving.hasCaseCode} onChange={(event, value) => receiving.toggleHasCaseCode(value)} orientation="vertical">
                                        <StyledToggleButton value={receiving.hasCaseCode === '' ? ':true' : 'true'}>Y</StyledToggleButton>
                                        <StyledToggleButton value={receiving.hasCaseCode === '' ? ':false' : 'false'}>N</StyledToggleButton>
                                    </StyledToggleButtonGroup>      
                                </Stack>

                            </Stack>

                        </Grid>

                    </Grid>

                </Stack>
            </Paper>

            <Stack direction={'row'} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>

                { 
                    receiving.status !== '' ? 
                    <Box sx={{ backgroundColor: receiving.status.startsWith('Reported') ? 'error.light' : 'rgb(255, 229, 180)', borderRadius: 4, padding: 1 }}>
                        <Typography color={receiving.status.startsWith('Reported') ? 'white' : undefined} fontWeight={'bold'}>{receiving.status}</Typography>
                    </Box>                
                    :
                    <Box></Box>
                }

                <Stack direction={'row'} spacing={1} alignSelf={'flex-end'}>
                    <Button 
                        variant="contained" 
                        disabled={!receiving.canReceive}
                        sx={{ color: 'primary.main', backgroundColor: 'rgb(255, 192, 0)' }}
                        onClick={() => receiving.toggleLpnDialog()}
                    >
                        Partial Receive
                    </Button>
                    <Button 
                        variant="contained" 
                        disabled={!receiving.canReceive}
                        color='success'
                        onClick={() => receiving.toggleLpnDialog(true)}
                    >
                        Fully Receive
                    </Button>
                    <Button 
                        variant="contained" 
                        onClick={receiving.investigate}
                        disabled={receiving.totalCases === 0 || receiving.lockedCases || !receiving.enabledCases || receiving.matchedCases} 
                        color='error'
                    >
                        Investigate
                    </Button>
                </Stack>

            </Stack>
            
            <Lpn 
                lpnDialog={receiving.lpnDialog} 
                lpns={receiving.lpns} 
                params={{
                    asnId: props.po!.AsnId,
                    purchaseOrderNumber: props.sku.PurchaseOrderNumber,
                    upc: receiving.doorTeamDetails?.Upc,
                    totalCase: receiving.doorTeamDetails?.TotalCase,
                    doorTeamDetailId: receiving.doorTeamDetails?.DoorTeamDetailId
                }}
            />

        </Stack>

    );

}