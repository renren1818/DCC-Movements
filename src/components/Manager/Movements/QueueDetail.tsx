'use client';

import { useBlocksContext } from "@/contexts/Blocks";
import { Box, Stack, Typography } from "@mui/material";

import CircleIcon from '@mui/icons-material/Circle';

export default function QueueDetail() {

    const { currentQueue } = useBlocksContext();

    return (

        (currentQueue && currentQueue.Qty > 0) &&

        <Box
            sx={{
                position: 'fixed',
                left: `calc((100vw / 2) - ${currentQueue?.StagingCode ? 150 : 85}px)`,
                width: 'auto',
                height: 'auto',
                zIndex: 1000,
                padding: '5px 20px',
                background: 'white',
                borderRadius: '16px',
                boxShadow: "0px 5px 12px rgb(0, 0, 0, 0.38)",
            }}
        >
            <Stack direction={'row'} spacing={1} height={'100%'} alignItems={'center'} justifyContent={'center'}>
                <Typography variant="h6" color='primary.light' fontWeight={'bold'}>{currentQueue?.StagingCode && `Staging ${currentQueue?.StagingCode} | `}{currentQueue?.Qty} Pallets</Typography>
                <CircleIcon sx={{ color: currentQueue?.ColorCode }} />
            </Stack>
        </Box>

    );

}