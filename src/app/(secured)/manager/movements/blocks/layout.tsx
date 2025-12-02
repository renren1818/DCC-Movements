import ActionsPanel from "@/components/Manager/Movements/ActionsPanel";
import MyQueue from "@/components/Manager/Movements/MyQueue";
import QueueDetail from "@/components/Manager/Movements/QueueDetail";
import SideBar from "@/components/Manager/Movements/SideBar";
import BlocksContextProvider from "@/contexts/Blocks";
import DialogBoxContextProvider from "@/contexts/DialogBox";
import { Grid, Stack } from "@mui/material";

export default function BlocksLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

    return (

        <BlocksContextProvider>
            <DialogBoxContextProvider>
                <Grid container>
                    <Grid size={'auto'}>
                        <MyQueue />
                    </Grid>
                    <Grid size={'grow'} overflow={'auto'} sx={{ scrollbarWidth: 'thin' }}>
                        <Stack direction='row' margin={1} spacing={1} minHeight={'calc(100vh - 150px)'} maxHeight={'calc(100vh - 150px)'} position={'sticky'}>
                            <SideBar />
                            {children}
                            <ActionsPanel />
                            <QueueDetail />
                        </Stack>
                    </Grid>
                </Grid>
            </DialogBoxContextProvider>
        </BlocksContextProvider>

    );

}
