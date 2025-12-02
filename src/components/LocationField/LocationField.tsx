import React from "react";
import { Stack, TextField, Typography } from "@mui/material";
import { ILocations, ISearchLocation } from "@/interfaces/BlocksContext";
import { useBlocksContext } from "@/contexts/Blocks";
import { BlockTypes } from "@/enums/Blocks";

const SegmentField = (props: { name: string; value: string; onChange: (name: string, value: string) => void; isHD?: boolean; }) => {

    const isNumber = !isNaN(+props.value);

    return (

        <TextField 
            name={props.name}
            variant="standard"
            placeholder={props.isHD ? "0" : "XX"}
            value={props.value === '0' ? '' : props.value}
            onChange={(e) => props.onChange(props.name, e.target.value)}
            slotProps={{
                input: { disableUnderline: true, sx: { '& input': { textAlign: 'center' } } },
                htmlInput: { maxLength: 2, autoComplete: 'off', readOnly: props.isHD }
            }}
            sx={{
                width: '20px',
                padding: 1,
                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                    display: "none",
                },
                '& .MuiInputBase-input': { 
                    color: isNumber ? 'success.main' : 'error.main',
                    fontWeight: 'bold',
                },
            }}
        />

    );

}

export default function LocationField(props: {locations?: ILocations,  onChange: (location: ISearchLocation) => void; }) {

    const { blocks } = useBlocksContext();

    const nullLocation: ISearchLocation = React.useMemo(() => ({ block: 0, side: 0, rowFrom: 0, rowTo: 0, levelFrom: 0, levelTo: 0 }), []);

    const [location, setLocation] = React.useState<ISearchLocation>(
        (props.locations && props.locations.items.length > 0)
        ?
        { 
            block: +props.locations.items[0]?.block, 
            side: +props.locations.items[0]?.side, 
            rowFrom: +props.locations.rowMin, 
            rowTo: +props.locations.rowMax, 
            levelFrom: +props.locations.levelMin, 
            levelTo: +props.locations.levelMax 
        }
        : 
        nullLocation
    );

    const [isHd, setIsHD] = React.useState(false);

    React.useEffect(() => {

        if (props.locations && props.locations.items.length > 0) {

            setLocation({ 
                block: +props.locations?.items[0].block, 
                side: +props.locations?.items[0].side, 
                rowFrom: +props.locations?.rowMin, 
                rowTo: +props.locations?.rowMax, 
                levelFrom: +props.locations?.levelMin, 
                levelTo: +props.locations?.levelMax 
            });

        } else setLocation(nullLocation);

    }, [props.locations, nullLocation])

    React.useEffect(() => {

        setIsHD([BlockTypes.HIGH, BlockTypes.HIGH_MINI].includes(blocks.find((b) => +b.Code! === location.block)?.BlockType as BlockTypes));

    }, [location, blocks]);

    const handleChange = (name: string, value: string) => {

        const isNumber = !isNaN(+value);

        if (!isNumber) return;

        setLocation((prevLocation) => {

            props.onChange({...prevLocation, [name]: isNumber ? +value : 0 })

            return {
                ...prevLocation,
                [name]: isNumber ? +value : 0
            }

        });

    } 

    return (

        <Stack 
            direction={'row'} 
            sx={{ 
                width: '100%', height: '38px', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', border: 1, borderRadius: '4px', borderColor: 'grey.500',
                '&:focus-within' : {
                    borderColor: 'primary.main',
                    outline: 1.5
                }
            }}
        >
            <SegmentField name='block' value={`${location.block}`} onChange={handleChange} />
            <Typography variant="h5" color="orange" fontWeight={'bold'}>—</Typography>
            <SegmentField name='side' value={`${location.side}`} onChange={handleChange} />
            <Typography variant="h5" color="orange" fontWeight={'bold'}>—</Typography>
            <SegmentField name='rowFrom' value={`${location.rowFrom}`} onChange={handleChange} />
            <Typography variant="caption" color="lightgrey">-</Typography>
            <SegmentField name='rowTo' value={`${location.rowTo}`} onChange={handleChange} />
            <Typography variant="h5" color="orange" fontWeight={'bold'}>—</Typography>
            <SegmentField name='levelFrom' value={`${location.levelFrom}`} onChange={handleChange} isHD={isHd} />
            <Typography variant="caption" color="lightgrey">-</Typography>
            <SegmentField name='levelTo' value={`${location.levelTo}`} onChange={handleChange} isHD={isHd} />

        </Stack>

    );

}