'use client';

import React from "react";

import { Paper, Stack, Box, Typography } from "@mui/material";

import { IBlockColors, IBlocksProps, IGridLayout } from "@/interfaces/Blocks/Blocks";
import { BlockColors, BlockFullnessColors, BlockTypes } from "@/enums/Blocks";

import BlockHighDensityImage from "/src/assets/images/blocks/map/highDensity.png";
import BlockSingleSalvageDensityImage from "/src/assets/images/blocks/map/pickDensitySingle.png";
import BlockSalvageDensityImage from "/src/assets/images/blocks/map/salvageDensity.png";
import BlockSinglePickDensityImage from "/src/assets/images/blocks/map/pickDensitySingle.png";
import BlockPickDensityImage from "/src/assets/images/blocks/map/pickDensity.png";
import BlockLowDensityImage from "/src/assets/images/blocks/map/lowDensity.png";
import BlockOversizeImage from "/src/assets/images/blocks/map/oversize.png";

import PackageIcon from "/src/assets/images/movements/packageIcon.svg";
import { useBlocksContext } from "@/contexts/Blocks";

import LocationPinIcon from '@mui/icons-material/LocationPin';

export default function useMap() {

    const { blocks, searchParams } = useBlocksContext();
    
    function renderHoldingArea(side: number, block: IGridLayout) {

        const ha = block.HoldingAreas.find((ha) => ha.includes(`-${side}-99`));

        if (ha) {
            return (
            <Paper 
                sx={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                bgcolor: "yellow"
                }}
            >
                <Typography variant="button" sx={{ writingMode: 'sideways-lr'}}>
                {ha}
                </Typography>
            </Paper>
            )
        }
    
    }

    function getBlockColors(type: BlockTypes): IBlockColors {
        const index = Object.values(BlockTypes).indexOf(
            type as unknown as BlockTypes,
        );
        const key = Object.keys(BlockTypes)[index];

        const block =
            Object.values(BlockColors)[
            Object.keys(BlockColors).indexOf(key as unknown as BlockColors)
            ];

        const fullness =
            Object.values(BlockFullnessColors)[
            Object.keys(BlockFullnessColors).indexOf(
                key as unknown as BlockFullnessColors,
            )
            ];
        return {
            Block: block,
            Fullness: fullness,
        };
    }

    function renderImages(block: IGridLayout) {

        let image: string = "";
        let imageSingle: string = "";

        switch (block.BlockType) {

            case BlockTypes.LOW:
            case BlockTypes.LOW_MINI:
                
                image = BlockLowDensityImage.src;
                imageSingle = BlockLowDensityImage.src;
                break;

            case BlockTypes.LOW_PICKING:

                image = BlockPickDensityImage.src;
                imageSingle = BlockSinglePickDensityImage.src;
                break;

            case BlockTypes.SALVAGE:
                image = BlockSalvageDensityImage.src;
                imageSingle = BlockSingleSalvageDensityImage.src;
                break;

            case BlockTypes.OVERSIZE:

                return (
                    <Paper sx={{ width: '100%', backgroundColor: "#f5f5f5", padding: 1 }}>
                        <img src={BlockOversizeImage.src} style={{ width: '100%', height: '100%', objectFit: 'fill' }} />
                    </Paper>
                );

            case BlockTypes.HIGH:
            case BlockTypes.HIGH_MINI:

                return (
                    <Paper sx={{ width: '100%', backgroundColor: "#f5f5f5", padding: 1 }}>
                        <img src={BlockHighDensityImage.src} style={{ width: '100%', height: '100%', objectFit: 'fill' }} />
                    </Paper>
                );

        }

        return (
            <Paper
            sx={{
                width: '100%',
                backgroundColor: "#f5f5f5",
                display: "flex",
                justifyContent: "flex-end",
                padding: 1,
            }}
            >
                <Stack direction='column' spacing={0.75} sx={{ width: '100%', justifyContent: "flex-end" }}>
                    {(block.Sides % 2) > 0 && (
                        <img key={0} src={imageSingle} style={{ height: '15px', width:'100%', objectFit:'fill' }} />
                    )}
                    {[...Array(Math.floor(block.Sides / 2))].map((_value, index) => (
                        <img key={index + 1} src={image} style={{ height: '15px', width:'100%', objectFit:'fill' }} />
                    ))}
                </Stack>
            </Paper>
        );
    }

    function renderCode(block: IGridLayout) {
        
        const colors = getBlockColors(block.BlockType);

        const mini =
            block.BlockType == BlockTypes.HIGH_MINI || block.BlockType == BlockTypes.LOW_MINI || block.Layout.RowSpan === 1
            ? 20
            : undefined;

        return (
            <Paper
            sx={{
                display: "flex",
                position: "absolute",
                marginTop: 0.5,
                padding: 0.25,
                width: 18,
                height: 18,
                justifyContent: "center",
                border: 3,
                borderColor: "white",
                backgroundColor: colors.Block,
                left: mini,
            }}
            >
                <Typography variant='body2' color='white'>
                    <strong>{('00'+block.Code).slice(-2)}</strong>
                </Typography>
            </Paper>
        );
    }

    function renderFullness(block: IGridLayout) {
        
        const colors = getBlockColors(block.BlockType);

        const mini =
            block.BlockType == BlockTypes.HIGH_MINI || block.BlockType == BlockTypes.LOW_MINI || block.Layout.RowSpan === 1
            ? [20, undefined, undefined] 
            : [undefined, undefined, 5 ];

        return (
            <Paper
                sx={{
                    display: "flex",
                    position: "absolute",
                    padding: .25,
                    marginTop: 1,
                    width: 40,
                    justifyContent: "center",
                    borderColor: "white",
                    backgroundColor: colors.Fullness,
                    right: mini[0],
                    top: mini[1],
                    bottom: mini[2],
                }}
            >
            <Typography variant='caption' color='white'>
                <strong>{block.Fullness.toFixed(1)}%</strong>
            </Typography>
            </Paper>
        );
    }

    function renderIndicators(props: IBlocksProps, block: IGridLayout) {

        return [

            block.HasAssignedSku &&
            (
            <Box
                key={`package-${block.BlockId}`}
                bgcolor={'white'}
                style={{
                position: 'absolute',
                top: 10,
                left: 10,
                width: 24,
                height: 24,
                borderRadius: '50%',
                animation: block.HasMovement ? 'heartbeatAnim 0.8s infinite' : 'none',
                }} 
            >
                <img src={PackageIcon.src} style={{ width: 24, height: 24 }} />
            </Box>
            ),

            (
                (searchParams.location?.block === +block.Code!)
                || 
                props.skuBlocks.includes(+block.BlockId)
            ) 
            &&
            (
                <Box
                    key={`sku-${block.BlockId}`}
                    style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    animation: 'heartbeatAnim 0.8s infinite',
                    }} 
                >
                    <LocationPinIcon color='inherit' />
                </Box>
            )

        ];

    }

    function renderBlock(props: IBlocksProps, block: IGridLayout) {

        return (
            <Stack 
                direction={'row'}
                key={block.i}
                sx={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                {renderHoldingArea(2, block)}
                <Box
                    key={block.i}
                    sx={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    width: '100%',
                    "&:hover": {
                        borderRadius: 1,
                        border: 2,
                        borderColor: getBlockColors(block.BlockType).Block,
                        cursor: 'pointer'
                    },
                    }}
                    onClick={() => props.onClick(block)}
                >
                    {renderImages(block)}
                    {renderCode(block)}
                    {renderFullness(block)}
                    {renderIndicators(props, block)}
                </Box>
                {renderHoldingArea(1, block)}
            </Stack>
        );
    }

    return {
        items: blocks,
        renderBlock
    };

}