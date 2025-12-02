"use client";

import { useManagerAsnQueueContext } from "@/contexts/ManagerAsnQueue";
import { IAsnItem } from "@/interfaces/Asns/AsnQueue";
import { Box, Grid, Paper, Typography } from "@mui/material";

interface IAsnDetailCardProps {
    data: IAsnItem;
}

export default function AsnDetailCard({ data }: IAsnDetailCardProps) {
    const formattedNumberFixed = new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 2,
    });

    const columns = [
        { label: "Unit per Case", value: formattedNumberFixed.format(data.UnitQuantity) },
        { label: "Layer", value: formattedNumberFixed.format(data.Hi) },
        { label: "Tie", value: formattedNumberFixed.format(data.Tie) },
        { label: "Case per Pallet", value: formattedNumberFixed.format(data.CasePerPallet) },
        { label: "Pallet Weight", value: `${formattedNumberFixed.format(data.PalletWeight)} KG` },
        { label: "Total Cases", value: formattedNumberFixed.format(data.TotalCases) },
    ];

    return (
        <>
            <Paper elevation={10} sx={{ p: 2, mt: 1.5 }}>
                <Grid container>
                    <Grid size={2.5}>
                        <Grid textAlign={"left"}>
                            <Typography variant="h6" color="textDisabled">
                                UPC Number:
                            </Typography>
                            <Typography variant="h6" color="primary">
                                {data.Upc}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid size={2.5}>
                        {" "}
                        <Grid>
                            <Box
                                sx={{
                                    borderRadius: 1,
                                    backgroundColor: data.IsFullyReceived ? "#002060" : "#ffc000",
                                    mt: "10px",
                                    ml: "10px",
                                    width: { xs: 50, md: 100, lg: 130, xl: 200 },
                                    px: 2,
                                    textAlign: "center",
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    fontSize={{ xs: "12px", md: "12px", lg: "15px", xl: "15px" }}
                                    color={data.IsFullyReceived ? "white" : "black"}
                                >
                                    {data.IsFullyReceived ? "FULLY" : "PARTIALLY"} RECEIVED
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid textAlign={"left"} marginLeft={10} size={2}>
                        <Grid>
                            <Typography variant="body1" color="textDisabled">
                                Description:
                            </Typography>
                        </Grid>
                        <Grid>
                            <Typography variant="body1" color="textDisabled">
                                SKU:
                            </Typography>
                        </Grid>
                        <Grid>
                            <Typography variant="body1" color="textDisabled">
                                Vendor:
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid textAlign={"left"} size={4}>
                        <Grid>
                            <Typography variant="body1" color="primary">
                                {data.SkuName}
                            </Typography>
                        </Grid>
                        <Grid>
                            <Typography variant="body1" color="primary">
                                {data.Sku}
                            </Typography>
                        </Grid>
                        <Grid>
                            <Typography variant="body1" color="primary">
                                {data.VendorId}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Paper
                    elevation={6}
                    sx={{
                        backgroundColor: "#002060",
                        mt: 1,
                    }}
                >
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
                        {columns.map((c, index) => (
                            <Grid key={index} size={2}>
                                <Typography
                                    variant="h6"
                                    color="white"
                                    fontSize={{ xs: "15px", sm: "15px", md: "15px", lg: "15px", xl: "20px" }}
                                >
                                    {c.label}
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
                <Grid container sx={{ mx: 2, mt: 2 }}>
                    {columns.map((c, index) => (
                        <Grid key={index} size={2}>
                            <Typography variant="h5" color="primary" fontSize={{ xs: "15px", sm: "15px", md: "15px", lg: "20px" }}>
                                <b>{c.value}</b>
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </>
    );
}
