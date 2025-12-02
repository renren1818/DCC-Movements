"use client";

import AsnDetailCard from "@/components/Manager/Asns/AsnDetailCard";
import { AsnHeader } from "@/components/Manager/Asns/AsnHeader";
import useAsnDetailLogic from "@/hooks/Manager/Asns/AsnDetailLogic";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";

import React from "react";

export default function Page() {
    const { asnDetail, completeAsn } = useAsnDetailLogic();

    if (!asnDetail?.data?.length) {
        return (
            <Stack alignItems="center" justifyContent="center" height="60vh" spacing={2}>
                <CircularProgress color="primary" />
                <Typography variant="body1" color="text.secondary">
                    Loading ASN details...
                </Typography>
            </Stack>
        );
    }

    return (
        <>
            <Box>
                <AsnHeader data={asnDetail.data[0]} completeAsn={completeAsn} />
                <Box>
                    {asnDetail.data.map((detail) => (
                        <AsnDetailCard data={detail} key={detail.Sku} />
                    ))}
                </Box>
            </Box>
        </>
    );
}
