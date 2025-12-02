'use client';

import useMyQueue from "@/hooks/Supervisor/Hub/MyQueue";
import { IMyQueue } from "@/interfaces/Hub/MyQueue";
import { Badge, Box, Stack, Typography } from "@mui/material";
import { DoorButton } from "./Styles";
import { Circle } from "@mui/icons-material";

export default function MyQueue() {

    const queue = useMyQueue();

    return (

        <Box width={'200px'} height={'100%'}>
        
            <Stack spacing={1} padding={1}>

                <Stack direction={'row'} spacing={1} alignItems={'center'} justifyContent={'center'}>
                    <Circle sx={{ color: queue.team ?? 'transparent' }} />
                    <Typography variant="h6" color='primary' fontWeight={'bold'}>
                        My Queue
                    </Typography>
                </Stack>

                { queue.doors.length === 0 && <Typography color='textDisabled' fontWeight='bold'>No Queue Available</Typography> }

                {

                    queue.doors.map((item: IMyQueue) => (
                        <Badge 
                            key={item.Asn} 
                            color='error' 
                            badgeContent={
                                !item.IsOpen || 
                                (
                                    item.IsOpen && item.SealNumber !== '' 
                                    && 
                                    (!item.HasReport || !item.HasImage) 
                                )
                                ? '' : undefined
                            } 
                        >
                            <DoorButton 
                                variant="outlined"
                                onClick={() => queue.changeDoor(item.Asn)}
                                fullWidth
                            >
                                Go to Door {item.DoorCode}
                            </DoorButton>
                        </Badge>
                    ))

                }

            </Stack>

        </Box>

    );

}