import { Stack, Typography } from "@mui/material";
import { StyledBox } from "./Styles";
import { IBlockHook } from "@/interfaces/Blocks/Blocks";
import { useBlocksContext } from "@/contexts/Blocks";

export default function Location(props: IBlockHook) {

    const { locations } = useBlocksContext();

    return (

        <Stack direction={'row'} spacing={1} paddingY={1}>
            
            <StyledBox sx={{ width: '30px', background: props.colors.block}}>
                <Typography variant="h5" color='white' fontWeight={'bold'}> {props.location[0]}</Typography>
            </StyledBox>
            {
                props.location.length > 1 &&
                <>
                    <StyledBox sx={{ width: '30px', background: props.colors.block}}>
                        <Typography variant="h5" color='white' fontWeight={'bold'}>{props.location[1]}</Typography>
                    </StyledBox>
                    <StyledBox sx={{ width: '80px', background: props.colors.block}}>
                        <Typography variant="h5" color='white' fontWeight={'bold'}>{`${locations.rowMin} - ${locations.rowMax}`}</Typography>
                    </StyledBox>
                </>
            }

        </Stack>

    );

}