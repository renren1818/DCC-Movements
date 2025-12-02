'use client';

import { Paper, Stack, Box, Typography } from "@mui/material";

import BlockHighDensityImage from "/src/assets/images/blocks/map/highDensity.png";
import BlockSalvageDensityImage from "/src/assets/images/blocks/map/salvageDensity.png";
import BlockPickDensityImage from "/src/assets/images/blocks/map/pickDensity.png";
import BlockLowDensityImage from "/src/assets/images/blocks/map/lowDensity.png";
import BlockHoldingAreaImage from "/src/assets/images/blocks/map/holdingArea.png";

export default function Legend() {

    const imageLegends = [
        { name: "High Density", image: BlockHighDensityImage },
        { name: "Low Density", image: BlockLowDensityImage },
        { name: "Pick Density", image: BlockPickDensityImage },
        { name: "Salvage Density", image: BlockSalvageDensityImage },
        { name: "Holding Area", image: BlockHoldingAreaImage },
    ];

    return (
        <Paper elevation={4} sx={{ height: 245, p: 1, justifyItems: 'center' }}>
            <Stack spacing={1} width={40}>
                {imageLegends.map((item, index) => {
                return (
                    <Box key={index} sx={{ justifyItems: "center" }}>
                        <img src={item.image.src!} width={item.name === "Holding Area" ? '20px' : '100%'} />
                        <Typography fontWeight={'bold'} fontSize={7} noWrap>
                            {item.name}
                        </Typography>
                    </Box>
                );
                })}
            </Stack>
        </Paper>
    );
    
}