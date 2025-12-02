'use client';

import React from "react";

import { Box, Button, Chip, Grid, IconButton, InputAdornment, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import { TabPanel } from "../../Blocks/Styles";

import ClearIcon from '@mui/icons-material/Clear';
import useConfig from "@/hooks/Manager/Movements/Config";

import AddIcon from '@mui/icons-material/Add';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';

export default function Config() {

    const config = useConfig();

    return (

        <Box sx={{ height: '100%', width: '100%' }}>
            <Tabs variant="fullWidth" value={config.currentTab} onChange={config.handleTabChange} centered>
                <Tab icon={<AddIcon />} iconPosition="start" label="Assign SKU" sx={{ fontWeight: 'bold' }} />
                <Tab icon={<RemoveCircleIcon />} iconPosition="start" label="Slot Control" sx={{ fontWeight: 'bold' }} />            
            </Tabs>
            <TabPanel index={0} value={config.currentTab}>
                <Stack height={'100%'} spacing={2} alignItems={'end'} justifyContent={'space-between'}>
                    <Grid width={'100%'} container spacing={1} alignItems={'center'} textAlign={'left'}>
                        <Grid size={3}>
                            <Typography>SKU</Typography>
                        </Grid>
                        <Grid size={9}>
                            <TextField
                                size='small'
                                value={config.sku} 
                                onChange={(e) => config.setSku(e.target.value)}
                                fullWidth 
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            config.sku !== '' &&
                                            <InputAdornment position="end">
                                                <IconButton size="small" onClick={config.clearSku}>
                                                    <ClearIcon fontSize="small" />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    },
                                    htmlInput: { autoComplete: 'off' }
                                }}
                                sx={{ backgroundColor: 'white' }} 
                            />
                        </Grid>
                        <Grid size={3}>
                            <Typography>Slots</Typography>
                        </Grid>
                        <Grid size={9}>
                            <Grid 
                                container
                                spacing={1}
                                sx={{ 
                                    padding: 1,
                                    width: '100%', 
                                    height: '70px', 
                                    overflowY: 'scroll',
                                    scrollbarWidth: 'thin',
                                    backgroundColor: 'white', 
                                    border: 1, 
                                    borderRadius: '4px', 
                                    borderColor: 'grey.500',
                                    '&:focus-within' : {
                                        borderColor: 'primary.main',
                                        outline: 1.5
                                    }
                                }}
                            >
                                {
                                    config.locations.items.map((location) => (
                                        <Grid key={location.id} size={'auto'}>
                                            <Chip key={location.id} size="small" label={`${location.block.toString().padStart(2, '0')}-${location.side}-${location.row.toString().padStart(2, '0')}-${location.level}`} />
                                        </Grid>
                                    ))

                                }
                            </Grid>
                        </Grid>
                    </Grid>
                    <Button variant="contained" color='primary' onClick={config.handleAssignSku} sx={{ width: '50%' }}>ASSIGN</Button>
                </Stack>
            </TabPanel>
            <TabPanel index={1} value={config.currentTab}>
                <Stack height={'100%'}  spacing={2} alignItems={'end'} justifyContent={'space-between'}>
                    <Grid width={'100%'} container spacing={1} alignItems={'center'} textAlign={'left'}>
                        {
                            config.isHD && 
                            <>
                                <Grid size={3}>
                                    <Typography>Slot Count</Typography>
                                </Grid>
                                <Grid size={9}>
                                    <TextField
                                        size='small'
                                        value={config.pallets} 
                                        onChange={(e) => config.setPallets(+e.target.value)}
                                        fullWidth 
                                        disabled={!config.editMode}
                                        slotProps={{
                                            input: {
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton size="small" onClick={config.toggleEditMode}>
                                                            { config.editMode ? <EditOffIcon fontSize="small" /> : <EditIcon fontSize="small" /> }
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            },
                                            htmlInput: { autoComplete: 'off' }
                                        }}
                                        sx={{ backgroundColor: 'white' }} 
                                    />
                                </Grid>
                            </>
                            
                        }
                        <Grid size={3}>
                            <Typography>Slots</Typography>
                        </Grid>
                        <Grid size={9}>
                            <Grid 
                                container
                                spacing={1}
                                sx={{ 
                                    padding: 1,
                                    width: '100%', 
                                    height: '70px', 
                                    overflowY: 'scroll',
                                    scrollbarWidth: 'thin',
                                    backgroundColor: 'white', 
                                    border: 1, 
                                    borderRadius: '4px', 
                                    borderColor: 'grey.500',
                                    '&:focus-within' : {
                                        borderColor: 'primary.main',
                                        outline: 1.5
                                    }
                                }}
                            >
                                {
                                    config.locations.items.map((location) => (
                                        <Grid key={location.id} size={'auto'}>
                                            <Chip color={location.enabled ? 'success' : 'error' } key={location.id} size="small" label={`${location.block.toString().padStart(2, '0')}-${location.side}-${location.row.toString().padStart(2, '0')}-${location.level}`} />
                                        </Grid>
                                    ))

                                }
                            </Grid>
                        </Grid>
                    </Grid>
                    <Button variant="contained" color='primary' onClick={config.handleToggleSlot} sx={{ width: '50%' }}>SAVE</Button>
                </Stack>
            </TabPanel>
        </Box>

    )

}

