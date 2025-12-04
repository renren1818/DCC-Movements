import useSide from "@/hooks/Blocks/Side";
import { IBlockHook } from "@/interfaces/Blocks/Blocks";
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";

import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { StyledTooltip } from "./Styles";
import { BlockModes } from "@/enums/Blocks";

export default function BlockSide(props: IBlockHook) {

  const side = useSide(props);

  return (

    <Box sx={{ paddingRight: '3px', maxHeight: '400px', height: 'calc(100vh - 430px)', overflow: 'auto', scrollbarWidth: 'thin', scrollbarColor: `${props.colors.block} transparent` }}>
      <Grid container width={'100%'}>
        <Grid size={'grow'}>
          <Stack
            sx={{
              paddingX: '2px',
              paddingTop: '10px',
              overflowX: 'scroll', scrollbarWidth: 'thin', scrollbarColor: `${props.colors.block} transparent`
            }}
          >
            {
              side.levels.map((level, index) => [
                <Stack key={`level-${index}`} direction={'row'}>
                  {
                    level.Locations.map((row, index) =>
                      <StyledTooltip key={index} arrow title={side.IsNotAvailable(row)?.message}>
                        <Box
                          key={`location-${index}`}
                          sx={{
                            position: 'relative',
                            margin: '1px',
                            padding: '1px',
                            minWidth: '80px',
                            width: `calc(100% / ${level.Locations.length})`,
                            height: '60px',
                            backgroundColor: side.isSelected(row.LocationId) && side.currentMode !== BlockModes.SLOT_CONTROL ? props.colors.fullness : (row.IsOccupied || row.IsCompleted) ? props.colors.block : row.IsAvailable ? 'transparent' : 'darkgrey',
                            border: `1px solid ${props.colors.block}`,
                            justifyContent: 'start',
                            "&:hover": {
                              cursor: !side.IsNotAvailable(row) ? 'pointer' : 'not-allowed',
                              transform: "scale(1.05)",
                              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                            },
                          }}
                          onClick={() => side.clickSlot(props.location, row)}
                        >
                          <Stack spacing={2} justifyContent={'space-between'} alignItems={'stretch'}>
                            <Stack direction={'row'} justifyContent={'space-between'}>
                              <Typography variant="subtitle1" color={'textSecondary'} fontWeight={'bold'}>{row.Row}</Typography>
                              <Box sx={{ justifyContent: 'flex-end', marginTop: '2px', display: 'flex', color: 'white', width: '36px', height: '25px' }}>
                                {side.indicators(row)}
                              </Box>
                            </Stack>
                            <Typography variant="subtitle2" fontWeight={'bold'} color='textSecondary'>{row.Sku}</Typography>
                          </Stack>
                          {
                            side.currentMode === BlockModes.SLOT_CONTROL &&
                            <IconButton id={row.LocationId.toString()} color={row.IsAvailable ? 'error' : 'success'} onClick={side.toggleSlot} sx={{ position: 'absolute', zIndex: 999, top: 10, left: `calc((100% / 2) - 20px)` }}>
                              {row.IsAvailable ? <RemoveCircleIcon /> : <AddCircleIcon />}
                            </IconButton>
                          }
                        </Box>
                      </StyledTooltip>
                    )
                  }
                </Stack>,
                (index + 1) === side.levels.length &&
                <Stack key={`level-${index + 1}`} direction={'row'}>
                  {
                    level.PercentByRow.map((row) =>
                      <Box
                        key={row.Row}
                        sx={{
                          margin: '1px',
                          padding: '1px',
                          minWidth: '80px',
                          width: `calc(100% / ${level.PercentByRow.length})`,
                          height: '32px',
                          backgroundColor: props.colors.fullness,
                          border: `1px solid ${props.colors.block}`,
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <Typography variant="h6" fontWeight={'bold'} color='white'>{row.Capacity.toFixed(1)}%</Typography>
                      </Box>
                    )
                  }

                </Stack>
              ])
            }

          </Stack>
        </Grid>
        <Grid size={'auto'}>
          <Stack sx={{ paddingX: '2px', paddingTop: '10px' }}>
            {

              side.levels.map((level, index) =>
                <Stack key={index} direction={'row'}>
                  <Box
                    sx={{
                      margin: '1px',
                      padding: '1px',
                      marginLeft: '5px',
                      minWidth: '72px',
                      width: '72px',
                      height: '60px',
                      backgroundColor: props.colors.block,
                      border: `1px solid ${props.colors.block}`,
                      alignContent: 'center'
                    }}
                  >
                    <Typography variant="h4" fontWeight={'bold'} color='white'>L{side.levels.length - index}</Typography>
                  </Box>
                </Stack>
              )
            }
          </Stack>

        </Grid>
      </Grid>
    </Box>

  );

}