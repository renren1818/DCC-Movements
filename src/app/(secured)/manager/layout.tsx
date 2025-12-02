"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";

import { Badge, Divider, Grid, Icon, Stack, Typography } from "@mui/material";
import { FeatureButton } from "@/components/FeatureButton/FeatureButton";
import { managerFeatures } from "./features";
import { useSession } from "@/contexts/Session";
import useTeamProfile from "@/hooks/Manager/Notification";

export default function ManagerLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const pathname = usePathname();
    const router = useRouter();
    const session = useSession();
    // const { getNotificationPerFeature } = useTeamProfile();

    return (
        <Stack spacing={1}>
            <Typography variant={session.isTablet ? "h5" : "h4"} color="primary" fontWeight={"bold"}>
                Manager&#39;s Control Panel
            </Typography>
            <Grid container>
                <Grid size="auto">
                    <Stack spacing={2} marginRight={1}>
                        {managerFeatures.map((feat, index) => (
                            <Badge
                                key={index}
                                variant="dot"
                                overlap="circular"
                                color="error"
                                // invisible={!getNotificationPerFeature(feat.name)}
                                sx={{
                                    "& .MuiBadge-badge": {
                                        height: 15,
                                        minWidth: 15,
                                        borderRadius: "50%",
                                        right: 3,
                                        left: "auto",
                                        top: 2,
                                    },
                                }}
                            >
                                <FeatureButton
                                    startIcon={<Icon>{feat.icon}</Icon>}
                                    active={pathname.startsWith(feat.route)}
                                    onClick={() => router.push(feat.route)}
                                >
                                    {feat.name}
                                </FeatureButton>
                            </Badge>
                        ))}
                    </Stack>
                </Grid>
                <Grid size={"auto"}>
                    <Divider orientation="vertical"></Divider>
                </Grid>
                <Grid size={"grow"}>{children}</Grid>
            </Grid>
        </Stack>
    );
}
