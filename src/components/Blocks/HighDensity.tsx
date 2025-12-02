import { redirect } from "next/navigation";

import { IBlockHook, IHDRow } from "@/interfaces/Blocks/Blocks";
import { Grid, Box, Stack, Typography, IconButton } from "@mui/material";

import hdBG from "/src/assets/images/blocks/highDensity.png";
import hdRow from "/src/assets/images/blocks/highDensityRow.png";
import hdRowSelected from "/src/assets/images/blocks/highDensityRowSelected.png";
import hdRowUnavailable from "/src/assets/images/blocks/highDensityRowUnavailable.png";

import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import useHighDensity from "@/hooks/Blocks/HighDensity";
import { StyledTooltip } from "./Styles";
import { BlockModes } from "@/enums/Blocks";

export default function HighDensity(props: IBlockHook) {

    const hd = useHighDensity(props);

    return (

        <Grid container height={'100%'} width={'100%'} >
            <Grid size={'grow'}>
                <Box 
                    sx={{ paddingRight: '15px', maxHeight: '400px', height: 'calc(100vh - 430px)', backgroundRepeat: "no-repeat", backgroundSize: '100% calc(100% - 60px)', backgroundImage: `url(${hdBG.src})` }}
                >
                    <Box sx={{ margin: '3px', height: '100%', width: '100%', overflowY: 'hidden', overflowX: 'scroll', scrollbarWidth: 'thin', scrollbarColor: `${props.colors.block} transparent` }}>
                        <Stack direction={'row'} height={'100%'}>
                        { 
                            hd.slots.map((row: IHDRow) => (
                                <Stack key={row.LocationId} sx={{ minWidth: '40px', width: `calc((100% - 50px) / ${props.items.length})`, height: '100%', margin: '3px', alignItems: 'center' }}>
                                    <StyledTooltip key={row.Row} arrow title={hd.IsNotAvailable(row)?.message}>
                                        <Box 
                                            sx={{ 
                                                position: 'relative',
                                                padding: '10px 0px', 
                                                width: '100%', 
                                                height: 'calc(100% - 70px)', 
                                                backgroundRepeat: "no-repeat", 
                                                backgroundSize: '100% 100%', 
                                                backgroundImage: `url(${ hd.isSelected(row.LocationId) && hd.currentMode !== BlockModes.SLOT_CONTROL ? hdRowSelected.src : row.IsAvailable ? hdRow.src : hdRowUnavailable.src})`, 
                                                margin: '2px',
                                                "&:hover": {
                                                    cursor: !hd.IsNotAvailable(row) ? 'pointer' : 'not-allowed',
                                                    transform: "scale(1.01)",
                                                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                                                },
                                            }}
                                            onClick={() => hd.clickRow(row)}
                                        >
                                            <Stack 
                                                width={'100%'} 
                                                height={'100%'} 
                                                justifyContent={'space-between'}
                                            >
                                                <Typography variant="caption" paddingRight={'5px'}>{row.Row}</Typography>
                                                <Typography variant="caption" sx={{ paddingRight: '5px', alignContent: 'center', justifyContent:'center', textOrientation: 'upright', writingMode: 'vertical-lr' }}>{row.Sku}</Typography>
                                            </Stack>
                                            <Box 
                                                sx={{ 
                                                    position: 'relative', 
                                                    bottom: 'calc(100% - 20px)', 
                                                    margin: '2px', 
                                                    height: `calc(100% - 10px)`, 
                                                    opacity: 0.5,
                                                    background: 'no-repeat repeating-linear-gradient(315deg, #add8e6, #add8e6 10px, #87ceeb 10px, #87ceeb 20px)',
                                                    backgroundPosition: 'bottom',
                                                    backgroundSize: `100% ${row.Capacity}%`
                                                }} 
                                            />
                                            {
                                                hd.currentMode === BlockModes.SLOT_CONTROL &&
                                                <IconButton id={row.LocationId.toString()} color={ row.IsAvailable ? 'error' : 'success' } onClick={hd.toggleSlot} sx={{ position: 'absolute', zIndex: 999, bottom: 5, left: `calc((100% / 2) - 20px)` }}>
                                                    { row.IsAvailable ? <RemoveCircleIcon /> : <AddCircleIcon /> }
                                                </IconButton>
                                            }
                                        </Box>
                                    </StyledTooltip>
                                    <Box sx={{ marginTop: '16px', display: 'flex', color: 'white', justifyContent: 'center', alignItems: 'center', width: 'calc(100% - 8px)', height: '25px', backgroundColor: props.colors.fullness}}>
                                        <Typography variant="caption">{row.Capacity}%</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', color: 'white', justifyContent: 'center', alignItems: 'center', width: 'calc(100% - 8px)', height: '25px'}}>
                                        { hd.indicators(row) }
                                    </Box>
                                </Stack>
                        ))
                        }
                        </Stack>
                    </Box>
                </Box>
            </Grid>
            <Grid size={'auto'}>
                <Stack height={'100%'} width={'40px'} spacing={2} paddingLeft={'10px'} justifyContent={'center'}>
                    {
                        
                        ...Array(props.block?.Sides).fill(0).map((_i, index) => (
                            
                                <IconButton
                                    key={index}
                                    sx={{ width: '40px', borderRadius: '10px', backgroundColor: props.location[1] === `${index+1}` ? props.colors.block : 'lightgray'}}
                                    onClick={() => redirect(`${index+1}`)}
                                >
                                    <Typography variant="body2" color='white' fontWeight={'bold'}>{index+1}</Typography>
                                </IconButton>
                            
                        ))
                    }
                </Stack>
            </Grid>
        </Grid>

    );

}