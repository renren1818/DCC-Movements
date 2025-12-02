'use client';

import MyQue from "@/components/Que/Que";
import { useBlocksContext } from "@/contexts/Blocks";
import useMyQueue from "@/hooks/Manager/Movements/MyQueue";
// import { IQueueDetail } from "@/interfaces/Movements/MyQueue";
import { Box } from "@mui/material";

export default function MyQueue() {

    const { setQueue } = useBlocksContext();
    const queue = useMyQueue();

    return (

        <Box width={'200px'} height={'100%'}>
            <MyQue
                data={queue.items}
                onSelectQueue={(que: IQueueDetail | null) => {
                    if (queue.items.length > 0) setQueue(que!);
                }}
            />
        </Box>

    );

}