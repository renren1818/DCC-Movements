"use client";

import { useManagerAsnQueueContext } from "@/contexts/ManagerAsnQueue";
import { IAsnItem } from "@/interfaces/Asns/AsnQueue";
import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import Barcode from "react-barcode";
import MixedStatus from "./MixedStatus";

interface IAsnHeaderProps {
    data: IAsnItem;
    completeAsn: (asn: string) => Promise<void>;
}

export function AsnHeader({ data, completeAsn }: IAsnHeaderProps) {
    const { selectedAsn, handleRemoveAsn } = useManagerAsnQueueContext();

    return (
        <>
            <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
                <Stack direction="row" spacing={2} alignItems="center" sx={{ flex: 1 }}>
                    <Typography>Status:</Typography>
                    <Box
                        sx={{
                            borderRadius: 1,
                            backgroundColor: selectedAsn?.Asn.IsCompleteReceiving ? "green" : "orange",
                            px: 2,
                            py: 0.5,
                        }}
                    >
                        <Typography variant="h6" color="white" fontSize={{ xs: 15, xl: 20 }}>
                            {selectedAsn?.Asn.IsCompleteReceiving ? "COMPLETE RECEIVING" : "RECEIVING IN PROGRESS"}
                        </Typography>
                    </Box>
                </Stack>
                {selectedAsn?.Asn.IsCompleteReceiving && (
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => {
                            completeAsn(selectedAsn?.Asn.AsnNumber as string);
                            handleRemoveAsn();
                        }}
                    >
                        Remove from Queue
                    </Button>
                )}
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
                <Grid size={4} textAlign={"left"}>
                    <Grid>
                        <Typography variant="body1" fontSize={12} fontWeight={700}>
                            Inboound Shipment No.:{" "}
                            <Box component="span" fontWeight={200}>
                                {data.Asn}
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid>
                        <Typography variant="body1" fontSize={12} fontWeight={700}>
                            PC Weight:{" "}
                            <Box component="span" fontWeight={200}>
                                {!isNaN(data.PalletWeight / (data.CasePerPallet * data.UnitQuantity)) &&
                                isFinite(data.PalletWeight / (data.CasePerPallet * data.UnitQuantity))
                                    ? `${(data.PalletWeight / (data.CasePerPallet * data.UnitQuantity)).toFixed(2)} KG`
                                    : "N/A "}
                            </Box>
                        </Typography>
                    </Grid>

                    <Grid>
                        <Typography variant="body1" fontSize={12} fontWeight={700}>
                            Case Weight:{" "}
                            <Box component="span" fontWeight={200}>
                                {!isNaN(data.PalletWeight / data.CasePerPallet) && isFinite(data.PalletWeight / data.CasePerPallet)
                                    ? `${(data.PalletWeight / data.CasePerPallet).toFixed(2)} KG`
                                    : "N/A "}
                            </Box>
                        </Typography>
                    </Grid>
                </Grid>
                <Grid size={4} textAlign={"center"}>
                    <Grid>
                        <Typography variant="body1" fontSize={12} color="primary" fontWeight={200}>
                            KAREILA MANAGEMENT CORPORATION
                        </Typography>
                    </Grid>
                    <Grid>
                        <Typography variant="body1" color="primary" fontSize={12} fontWeight={700}>
                            Pallet Configuration Report
                        </Typography>
                    </Grid>
                    <Grid>
                        <Typography variant="body1" color="primary" fontSize={12} fontWeight={300}>
                            DC Calamba
                        </Typography>
                    </Grid>
                    <Grid>
                        <Barcode value={data.Asn} displayValue={false} height={30} width={1.2} format="CODE128" />
                    </Grid>
                </Grid>
                <Grid size={4} textAlign={"right"}>
                    <Grid>
                        <Typography variant="body1" fontSize={12} fontWeight={700}>
                            Date:
                            <Box component="span" fontWeight={200}>
                                {new Date(data.DateCreated).toLocaleDateString("en-US")}
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid>
                        <Typography variant="body1" fontSize={12} fontWeight={700}>
                            Time:
                            <Box component="span" fontWeight={200}>
                                {new Date(data.DateCreated).toLocaleTimeString("en-US")}
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid>
                        <MixedStatus value={true ? "Y" : "N"} key={1} />
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
