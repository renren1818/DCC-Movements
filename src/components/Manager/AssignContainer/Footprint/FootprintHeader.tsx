import { SelectedDoorLabelBlue } from "@/styles/AssignContainer/StyledDocking/StyledDocking";
import { Stack, Typography } from "@mui/material";
import DangerousIcon from "@mui/icons-material/Dangerous";
import React from "react";
import { IInvalidFootprintHeaderProps } from "@/interfaces/AssignContainer/InvalidFootprint";
import { InvestigationLabel } from "@/styles/AssignContainer/StyledForceReceive/StyledForceReceive";

function FootprintHeader({ ContainerNumber, DoorCode }: IInvalidFootprintHeaderProps) {
    return (
        <Stack direction="column" spacing={2} alignItems="flex-start" marginTop={6}>
            <Stack direction={"row"} spacing={2} alignItems="center">
                <InvestigationLabel>For Investigation</InvestigationLabel>
                <SelectedDoorLabelBlue>Door {DoorCode}</SelectedDoorLabelBlue>
            </Stack>

            <Stack
                alignItems="flex-start"
                direction={"row"}
                padding={2}
                boxShadow={"inherit"}
                borderRadius="4px"
                bgcolor={"#f5f5f5"}
                sx={{
                    borderRadius: 2,
                    boxShadow: 2,
                    border: "1px solid #e0e0e0",
                }}
                gap={3}
            >
                <Stack alignItems="flex-start" gap={1}>
                    <Typography variant="inherit" color="textSecondary" fontWeight={"bold"}>
                        Inbound Shipment No.
                    </Typography>
                    <Typography variant="h4" color="info" sx={{ textDecoration: "underline" }}>
                        {ContainerNumber}
                    </Typography>
                </Stack>
                <Stack
                    alignItems="center"
                    direction={"row"}
                    sx={{
                        borderRadius: 2,
                        boxShadow: 2,
                        border: "1px solid #e0e0e0",
                    }}
                    width={150}
                    padding={1.5}
                >
                    <DangerousIcon color="error" sx={{ mr: 1, fontSize: 40 }} />
                    <Typography variant="body2" color="textSecondary">
                        Invalid Configuration
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    );
}

export default FootprintHeader;
