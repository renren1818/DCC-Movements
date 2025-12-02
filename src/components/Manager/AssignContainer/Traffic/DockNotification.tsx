import ITrafficNotification from "@/hooks/Manager/AssignContainer/TrafficNotification";
import { Box, Button, Stack, Typography } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import React from "react";
import { CustomTitleLabel } from "@/styles/AssignContainer/StyledDocking/StyledDocking";

function DockNotification({ ContainerNumber }: ITrafficNotification) {
    return (
        <>
            <Stack direction="column" spacing={2} alignItems="flex-start" marginTop={6}>
                <CustomTitleLabel>Ready To Undock</CustomTitleLabel>
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
                            Container number
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
                        <WarningIcon color="warning" sx={{ mr: 1 }} />
                        <Typography variant="body2" color="textSecondary">
                            Notify traffic to undock
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        </>
    );
}

export default DockNotification;
