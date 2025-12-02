'use client';

import React from "react";

import { Box, Button, Grid, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import { TabPanel } from "../../Blocks/Styles";

import useMove from "@/hooks/Manager/Movements/Move";
import LocationField from "../../LocationField/LocationField";

export default function Move() {

    const move = useMove();

    return (

        <Box sx={{ height: '100%', width: '100%' }}>
            <Tabs variant="fullWidth" value={move.currentTab} onChange={move.handleTabChange} centered>
                <Tab label="Move" sx={{ fontWeight: 'bold' }} />
            </Tabs>
            <TabPanel index={0} value={move.currentTab}>
                <Stack height={'100%'} spacing={1} alignItems={'end'} justifyContent={'space-between'}>
                    <Grid container spacing={1} alignItems={'center'} textAlign={'left'}>
                        <Grid size={2}>
                            <Typography>SKU</Typography>
                        </Grid>
                        <Grid size={10}>
                            <TextField
                                size='small'
                                value={move.sku} 
                                fullWidth 
                                slotProps={{
                                    input: { sx: { '& input': { textAlign: 'center', fontWeight: 'bold', color: 'primary.main' } }},
                                    htmlInput: { autoComplete: 'off', readOnly: true }
                                }}
                                sx={{ backgroundColor: 'ButtonFace' }} 
                            />
                        </Grid>
                        <Grid size={2}>
                            <Typography>Pickup</Typography>
                        </Grid>
                        <Grid size={10}>
                            <TextField
                                size='small'
                                value={move.pickup} 
                                fullWidth 
                                slotProps={{
                                    input: { sx: { '& input': { textAlign: 'center', fontWeight: 'bold', color: 'primary.main' } }},
                                    htmlInput: { autoComplete: 'off', readOnly: true }
                                }}
                                sx={{ backgroundColor: 'ButtonFace' }} 
                            />
                        </Grid>
                        <Grid size={2}>
                            <Typography>Drop</Typography>
                        </Grid>
                        <Grid size={10}>
                            <LocationField locations={move.locations} onChange={(location) => move.setLocation(location)} />
                        </Grid>
                        <Grid size={2}>
                            <Typography>Quantity</Typography>
                        </Grid>
                        <Grid size={10}>
                            <TextField
                                size='small'
                                value={move.quantity === 0 ? '' : move.quantity} 
                                onChange={move.handleQuantityChange}
                                fullWidth 
                                slotProps={{
                                    input: { sx: { '& input': { textAlign: 'center', fontWeight: 'bold', color: 'primary.main' } }},
                                    htmlInput: { autoComplete: 'off' }
                                }}
                                sx={{ backgroundColor: 'white', textAlign: 'center' }} 
                            />
                        </Grid>
                    </Grid>
                    <Button variant="contained" color='primary' onClick={move.handleMove} sx={{ width: '50%' }}>MOVE</Button>
                </Stack>
            </TabPanel>
        </Box>

    )

}

