import { Box, Stack, Backdrop, CircularProgress } from "@mui/material";
import Location from "./Location";
import useBlock from "@/hooks/Blocks/Block";

import { BlockTypes } from "@/enums/Blocks";
import HighDensity from "./HighDensity";
import LowDensity from "./LowDensity";

export default function Block(props: { location: string[] }) {

    const hook = useBlock(props.location);

    if (!hook.block) return (
        <Box width={'100%'} alignContent={'flex-end'}>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={!hook.block}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    );

    return (
        <Box width={'100%'} alignContent={'flex-end'}>
            <Stack paddingLeft={'85px'}>
                <Location {...hook} />
                {
                    [BlockTypes.HIGH, BlockTypes.HIGH_MINI].includes(hook.block?.BlockType as BlockTypes) ?
                        <HighDensity {...hook} /> :
                        <LowDensity {...hook} />
                }
            </Stack>
        </Box>
    );

}