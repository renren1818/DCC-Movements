import React from "react";

import { BlockTypes } from "@/enums/Blocks";
import { IBlockHook, ICommonRow, ICommonSide } from "@/interfaces/Blocks/Blocks";
import { Stack, IconButton, Typography, Box } from "@mui/material";
import { redirect } from "next/navigation";

import lowDensityBG from "/src/assets/images/blocks/lowDensity.png";
import pickingDensityBG from "/src/assets/images/blocks/pickingDensity.png";
import salvageDensityBG from "/src/assets/images/blocks/salvageDensity.png";
import slotImg from "/src/assets/images/blocks/slot.svg";
import movementLocation from "/src/assets/images/movements/locationIcon.svg";
import movementPackage from "/src/assets/images/movements/packageIcon.svg";

import { useBlocksContext } from "@/contexts/Blocks";

export default function useLowDensity(hook: IBlockHook) {

    const { searchParams } = useBlocksContext();

    const sideBG = [BlockTypes.LOW, BlockTypes.LOW_MINI].includes(hook.block?.BlockType ?? BlockTypes.SALVAGE) ? lowDensityBG :
        hook.block?.BlockType === BlockTypes.LOW_PICKING ? pickingDensityBG :
            salvageDensityBG;

    const indicators = (row: ICommonRow) =>
        <>
            {
                row.HasAssignedSku
                &&
                <img src={movementPackage.src} width={18} height={18} alt="" style={{ animation: row.HasMovement ? 'heartbeatAnim 0.8s infinite' : '' }} />
            }
            {
                (
                    (searchParams.sku && row.SKU.includes(+searchParams.sku!))
                    ||
                    (
                        (hook.block && +hook.block.Code! === searchParams.location?.block)
                        &&
                        row.Side === searchParams.location?.side
                        &&
                        row.Row >= searchParams.location?.rowFrom && row.Row <= searchParams.location?.rowTo
                    )
                )
                &&
                <img src={movementLocation.src} width={18} height={18} alt="" style={{ animation: 'heartbeatAnim 0.8s infinite' }} />
            }
        </>

    const sides = [];
    const rows = [];

    for (let i = 0; i < hook.items.length; i = i + 2) {

        sides.push(
            <Stack key={i} marginTop={i === 0 ? '60px' : '120px'} width={'45px'} spacing={0.2} paddingLeft={'10px'} justifyContent={'center'}>
                <IconButton
                    sx={{ width: '40px', borderRadius: '10px', backgroundColor: hook.colors.block }}
                    onClick={() => redirect(`${hook.block?.Code}/${i + 1}`)}
                >
                    <Typography variant="body2" color='white' fontWeight={'bold'}>{i + 1}</Typography>
                </IconButton>
                <IconButton
                    sx={{ width: '40px', borderRadius: '10px', backgroundColor: hook.colors.block }}
                    onClick={() => redirect(`${hook.block?.Code}/${i + 2}`)}
                >
                    <Typography variant="body2" color='white' fontWeight={'bold'}>{i + 2}</Typography>
                </IconButton>
            </Stack>

        )

        rows.push(
            <Stack
                key={i}
                direction={'row'}
                sx={{
                    paddingX: '2px',
                    paddingTop: '10px',
                    overflowX: 'scroll', scrollbarWidth: 'thin', scrollbarColor: `${hook.colors.block} transparent`,
                    background: `url(${sideBG.src}) no-repeat left center`, backgroundSize: '100% 60px'
                }}
            >
                {
                    (hook.items[i] as ICommonSide).rows.map((row: ICommonRow, index: number) =>
                        <Stack key={`${row.Side}/${row.Row}`} sx={{ minWidth: '75px', width: `calc((100% - 20px) / ${(hook.items[i] as ICommonSide).rows.length})`, height: '100%', margin: '1px', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', color: 'white', justifyContent: 'center', alignItems: 'center', width: 'calc(100% - 8px)', height: '25px' }}>
                                {indicators(row)}
                            </Box>
                            <Box sx={{ marginBottom: '5px', display: 'flex', color: 'white', justifyContent: 'center', alignItems: 'center', width: 'calc(100% - 8px)', height: '25px', backgroundColor: hook.colors.fullness }}>
                                <Typography variant="caption">{row.Fullness}%</Typography>
                            </Box>
                            <Box sx={{ padding: '2px 0px', width: '100%', height: '25px', backgroundRepeat: "no-repeat", backgroundSize: '100% 100%', backgroundImage: `url(${slotImg.src})`, margin: '0px' }}>
                                <Stack width={'100%'} height={'100%'} justifyContent={'space-between'}>
                                    <Typography variant="caption" paddingRight={'6px'} fontWeight={'bold'}>{row.Row}</Typography>
                                </Stack>
                            </Box>
                            <Box sx={{ padding: '2px 0px', width: '100%', height: '25px', backgroundRepeat: "no-repeat", backgroundSize: '100% 100%', backgroundImage: `url(${slotImg.src})`, margin: '0px' }}>
                                <Stack width={'100%'} height={'100%'} justifyContent={'space-between'}>
                                    <Typography variant="caption" paddingRight={'6px'} fontWeight={'bold'}>{row.Row}</Typography>
                                </Stack>
                            </Box>
                            <Box sx={{ marginTop: '5px', display: 'flex', color: 'white', justifyContent: 'center', alignItems: 'center', width: 'calc(100% - 8px)', height: '25px', backgroundColor: hook.colors.fullness }}>
                                <Typography variant="caption">{(hook.items[i + 1] as ICommonSide).rows[index].Fullness}%</Typography>
                            </Box>
                            <Box sx={{ marginBottom: '5px', display: 'flex', color: 'white', justifyContent: 'center', alignItems: 'center', width: 'calc(100% - 8px)', height: '25px' }}>
                                {indicators((hook.items[i + 1] as ICommonSide).rows[index])}
                            </Box>
                        </Stack>
                    )
                }
            </Stack>
        );

    }


    return {
        sides,
        rows
    }

}