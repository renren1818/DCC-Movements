import { IBlockHook } from "@/interfaces/Blocks/Blocks";
import { Box, Grid } from "@mui/material";
import useLowDensity from "@/hooks/Blocks/LowDensity";
import Side from "./Side";

export default function LowDensity(props: IBlockHook) {

    const ld = useLowDensity(props);

    if (props.location.length > 1) return <Side {...props} />

    return (

        <Box sx={{ paddingRight: '3px', maxHeight: '400px', height: 'calc(100vh - 430px)', overflow: 'auto', scrollbarWidth: 'thin', scrollbarColor: `${props.colors.block} transparent` }}>
            <Grid container width={'100%'}>
                <Grid size={'grow'}>
                    {ld.rows}
                </Grid>
                <Grid size={'auto'}>
                    {ld.sides}
                </Grid>
            </Grid>
        </Box>

    );

}