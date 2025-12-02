'use client';

import React from "react";

import { Box, Button, Stack } from "@mui/material";
import { useBlocksContext } from "@/contexts/Blocks";
import Search from "./Search";
import Move from "./Move";
import Config from "@/components/Manager/Movements/Config";
import { BlockModes } from "@/enums/Blocks";
import { usePathname } from 'next/navigation';

export default function ActionsPanel() {

    const { currentMode } = useBlocksContext();

    return (

        <Stack spacing={1} alignItems={'flex-end'} sx={{ position: 'fixed', right: 35 }}>

            {/* <Button 
                href={`/manager/movements/logs?back=${usePathname()}`}
                variant="contained" 
                size='small' 
                color='error' 
                sx={{ borderRadius: 5, textTransform: 'none', fontSize: 15, fontWeight: 'bold', px: 4 }}
                
            >
                See Movement Logs
            </Button> */}

            <Box
                sx={{
                    width: 400,
                    height: 'auto',
                    padding: 1,
                    zIndex: 1000,
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '16px',
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(5px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                }}
            >
                <Box sx={{ height: '100%', width: '100%' }}>
                    {currentMode === BlockModes.SEARCH && <Search />}
                    {currentMode === BlockModes.MOVE && <Move />}
                    {[BlockModes.SLOT_CONTROL, BlockModes.SLOT_SKU].includes(currentMode) && <Config />}
                </Box>
            </Box>
        </Stack>
    )

}

