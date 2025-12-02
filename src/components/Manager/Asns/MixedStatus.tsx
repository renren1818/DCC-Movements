import React from "react";
import {Typography, Stack, Box} from "@mui/material";
import {MixedStatusStyledButton} from "./StyleQueue";

interface IMixedStatusProps {
    value: "Y" | "N";
}

export default function MixedStatus({value}: IMixedStatusProps) {
    return (
        <Box display="flex" alignItems="center" justifyContent="flex-end" gap={2}>
            <Typography variant="body1" fontWeight={700} color="#2E2E2E">
                Mixed:
            </Typography>
            <MixedStatusStyledButton
                variant="contained"
                disableElevation
                active={value === "Y"}
                activeColor="#28A745"
                hoverColor="#218838"
            >
                Y
            </MixedStatusStyledButton>
            <MixedStatusStyledButton
                variant="contained"
                disableElevation
                active={value === "N"}
                activeColor="#4F4F4F"
                hoverColor="#3A3A3A"
            >
                N
            </MixedStatusStyledButton>
        </Box>
    );
}
