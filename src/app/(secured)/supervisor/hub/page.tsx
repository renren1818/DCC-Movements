import MyQueue from "@/components/Supervisor/Hub/MyQueue";
import HubContextProvider from "@/contexts/Hub";
import DialogBoxContextProvider from "@/contexts/DialogBox";
import { Grid } from "@mui/material";
import Door from "@/components/Supervisor/Hub/Door";

export default function Page() {

  return (
    <HubContextProvider>
        <DialogBoxContextProvider>
            <Grid container>
                <Grid size={'auto'}>
                    <MyQueue />
                </Grid>
                <Grid size={'grow'} overflow={'auto'} sx={{ scrollbarWidth: 'thin' }} minHeight={'calc(100vh - 150px)'} maxHeight={'calc(100vh - 150px)'}>
                    <Door />
                </Grid>
            </Grid>
        </DialogBoxContextProvider>
    </HubContextProvider>
  );

}
