import Legend from "@/components/Blocks/Map/Legend";
import { Box, Stack } from "@mui/material";
import Actions from "./Actions";

export default function SideBar() {

    return (

        <Box 
            sx={{ 
                padding: 1,
                position: 'fixed', 
                zIndex: 1000, 
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '16px',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(5px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                height: 'calc(100vh - 160px)'
            }}
        >
            <Stack sx={{justifyContent: 'space-between', height: '100%', width: '100%'}}>
                <Actions />
                <Legend />
            </Stack>
        </Box>                


    );

}