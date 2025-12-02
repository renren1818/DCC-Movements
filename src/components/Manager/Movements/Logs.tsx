'use client';

import useLogs from "@/hooks/Manager/Movements/Logs";
import { Box, Button, Grid, Pagination, Stack, TextField } from "@mui/material";
import { StyledGrid } from "./Styles";
import { KeyboardDoubleArrowLeft } from "@mui/icons-material";
import React from "react";

export default function Logs(props: { back?: string }) {

    const logs = useLogs();
    
    return (

        <Stack spacing={1} height={'calc(100vh - 175px)'} sx={{ m: 2, justifyContent: 'start', alignContent: 'center' }}>

            <Box sx={{ width: '100%', textAlign: 'right' }}>
                <Button 
                    href={props.back ?? '/manager/movements/blocks'}
                    size='small' 
                    color='primary' 
                    sx={{ borderRadius: 5, textTransform: 'none', fontSize: 15, px: 4 }}
                    
                >
                    <KeyboardDoubleArrowLeft /> Back to Previous Page
                </Button>
            </Box>

            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>

                <TextField 
                    label="Search"
                    size="small"
                    value={logs.searchQuery}
                    onChange={(e) => logs.setSearchQuery(e.target.value)}
                />

                <Pagination 
                    variant="outlined" 
                    shape="rounded" 
                    color="primary" 
                    count={logs.logs?.PageCount ?? 1} 
                    page={logs.page}
                    onChange={(e, value) => logs.setPage(value)}
                />

            </Stack>

            <StyledGrid container header>
                <Grid size={2}>SKU No</Grid>
                <Grid size={5}>Description</Grid>
                <Grid size={1}>From</Grid>
                <Grid size={1}>To</Grid>
                <Grid size={1}>Quantity</Grid>
                <Grid size={2}>Status</Grid>
            </StyledGrid>

            {

                logs.logs?.Items.map((item, index) => (

                    <StyledGrid key={index} container disabled={item.Status !== 'Queued'}>
                        <Grid size={2}>{item.SKU}</Grid>
                        <Grid size={5} textAlign={'left'}>{item.Description}</Grid>
                        <Grid size={1}>{item.From}</Grid>
                        <Grid size={1}>{item.To}</Grid>
                        <Grid size={1}>{item.Quantity}</Grid>
                        <Grid size={2} sx={{ color: '#ee8900', fontWeight: 'bold' }}>
                            {
                                item.Status === 'Queued' 
                                ?
                                <Button 
                                    variant="contained" 
                                    size="small" 
                                    color='primary' 
                                    sx={{ 
                                        maxHeight: '22px', 
                                        textTransform: 'none', 
                                        borderRadius: 3 
                                    }}
                                    onClick={() => logs.deleteLog(item.MovementAssignmentId)}
                                >
                                    Cancel Move
                                </Button>
                                :
                                item.Status
                            }
                        </Grid>
                    </StyledGrid>

                ))

            }

        </Stack>

    );

}