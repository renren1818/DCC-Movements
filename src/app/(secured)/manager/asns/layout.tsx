"use client";

import Queue from "@/components/Manager/Asns/Queue";
import DialogBoxContextProvider from "@/contexts/DialogBox";
import ManagerAsnQueueContextProvider from "@/contexts/ManagerAsnQueue";
import {Grid, Stack} from "@mui/material";
import React from "react";

export default function AsnLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <ManagerAsnQueueContextProvider>
            <DialogBoxContextProvider>
                <Grid container>
                    <Grid size={"auto"}>
                        <Queue />
                    </Grid>
                    <Grid size={"grow"} overflow={"auto"} sx={{scrollbarWidth: "thin"}}>
                        <Stack
                            direction="column"
                            margin={1}
                            spacing={1}
                            minHeight={"calc(100vh - 150px)"}
                            maxHeight={"calc(100vh - 150px)"}
                            position={"sticky"}
                        >
                            {children}
                        </Stack>
                    </Grid>
                </Grid>
            </DialogBoxContextProvider>
        </ManagerAsnQueueContextProvider>
    );
}
