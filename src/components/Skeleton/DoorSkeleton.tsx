"use client";

import { Box, Divider, Grid, Skeleton, Stack } from "@mui/material";
import React from "react";

export default function DoorSkeleton() {
  return (
    <>
      {/* Header section */}
      <Grid container padding={1} color="primary.main">
        {/* Left labels */}
        <Grid size={3}>
          <Stack textAlign="right" sx={{ paddingRight: 4 }}>
            <Skeleton variant="text" width={100} /> {/* Door */}
            <Skeleton variant="text" width={120} /> {/* Staging Area */}
            <Skeleton variant="text" width={140} /> {/* Container Number */}
            <Skeleton variant="text" width={120} /> {/* Seal Number */}
          </Stack>
        </Grid>

        {/* Right values */}
        <Grid size={3}>
          <Stack textAlign="left" sx={{ paddingLeft: 0 }}>
            <Skeleton variant="text" width={60} /> {/* 10 */}
            <Skeleton variant="text" width={60} /> {/* 110 */}
            <Skeleton variant="text" width={160} /> {/* JOEMAR-ERA-X1 */}
            <Skeleton variant="text" width={50} /> {/* SEAL */}
          </Stack>
        </Grid>

        {/* Action buttons */}
        <Grid size={6}>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Stack spacing={1}>
              <Skeleton variant="rectangular" width={120} height={36} sx={{ borderRadius: 1 }} />
              <Skeleton variant="rectangular" width={120} height={36} sx={{ borderRadius: 1 }} />
            </Stack>

            {/* GALLERIES » skeleton */}
            <Stack direction="row" spacing={1} alignItems="center">
              <Skeleton variant="text" width={100} height={36} />
        
            </Stack>
          </Stack>
        </Grid>
      </Grid>

      <Divider />

      {/* Report section */}
      <Grid container padding={1} color="primary.main">
        {/* Left shipment info */}
        <Grid size={"auto"}>
          <Stack textAlign="left">
            <Skeleton variant="text" width={180} />
            <Skeleton variant="text" width={140} />
            <Skeleton variant="text" width={200} />
            <Skeleton variant="text" width={200} />
          </Stack>
        </Grid>

        {/* Center report header */}
        <Grid size={"grow"}>
          <Stack textAlign="center" alignItems="center" spacing={1}>
            <Skeleton variant="text" width={280} />
            <Skeleton variant="text" width={220} />
            <Skeleton variant="text" width={160} />
            <Skeleton variant="rectangular" width={200} height={32} />
          </Stack>
        </Grid>

   
        <Grid size={"auto"}>
          <Stack textAlign="right">
            <Skeleton variant="text" width={160} />
            <Skeleton variant="text" width={140} />
            <Skeleton variant="text" width={120} />
          </Stack>
        </Grid>
      </Grid>

      <Stack spacing={2} marginTop={2}>
        {[...Array(4)].map((_, i) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 2,
              borderRadius: 2,
              border: "1px solid #ccc",
            }}
          >
            {/* Left: SKU info */}
            <Stack spacing={1}>
              <Skeleton variant="text" width={180} height={24} />
              <Skeleton variant="text" width={300} height={24} />
            </Stack>

            {/* Right: Action buttons */}
            <Stack direction="row" spacing={2}>
              <Skeleton variant="rectangular" width={160} height={36} sx={{ borderRadius: 1 }} />
              <Skeleton variant="rectangular" width={100} height={36} sx={{ borderRadius: 1 }} />
            </Stack>
          </Box>
        ))}
      </Stack>
      <Stack direction="row" justifyContent="flex-end" mt={2}>
        <Skeleton variant="rectangular" width={220} height={40} sx={{ borderRadius: 1 }} />
      </Stack>
    </>
  );
}
