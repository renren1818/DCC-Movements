'use client';

import React from "react";

import { Box, Button, IconButton, InputAdornment, Stack, Tab, Tabs, TextField } from "@mui/material";
import { TabPanel } from "../../Blocks/Styles";

import ClearIcon from '@mui/icons-material/Clear';
import useSearch from "@/hooks/Manager/Movements/Search";
import LocationField from "../../LocationField/LocationField";

export default function Search() {

    const search = useSearch();

    return (

        <Box sx={{ height: '100%', width: '100%' }}>
            <Tabs variant="fullWidth" value={search.currentTab} onChange={search.handleTabChange} centered>
                <Tab label="SKU" sx={{ fontWeight: 'bold' }} />
                <Tab label="Location" sx={{ fontWeight: 'bold' }} />            
            </Tabs>
            <TabPanel index={0} value={search.currentTab}>
                <Stack height={'100%'} spacing={2} alignItems={'end'} justifyContent={'space-between'}>
                    <TextField
                        size='small'
                        value={search.sku} 
                        onChange={(e) => search.setSku(e.target.value)}
                        fullWidth 
                        slotProps={{
                            input: {
                                endAdornment: (
                                    search.sku !== '' &&
                                    <InputAdornment position="end">
                                        <IconButton size="small" onClick={search.clearSkuSearch}>
                                            <ClearIcon fontSize="small" />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            },
                            htmlInput: { autoComplete: 'off' }
                        }}
                        sx={{ backgroundColor: 'white' }} 
                    />
                    <Button variant="contained" color='primary' onClick={search.handleSkuSearch} sx={{ width: '50%' }}>SEARCH</Button>
                </Stack>
            </TabPanel>
            <TabPanel index={1} value={search.currentTab}>
                <Stack height={'100%'}  spacing={2} alignItems={'end'} justifyContent={'space-between'}>
                    <LocationField onChange={(location) => { search.setLocation(location); }}  />
                    <Button variant="contained" color='primary' onClick={search.handleLocationSearch} sx={{ width: '50%' }}>SEARCH</Button>
                </Stack>
            </TabPanel>
        </Box>

    )

}

