'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { Divider, Grid, Icon, Stack, Typography } from "@mui/material";
import { FeatureButton, ParentRedBadge } from "@/components/FeatureButton/FeatureButton";
import { supervisorFeatures } from "./features";
import { useSession } from '@/contexts/Session';

export default function ManagerLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

    const pathname = usePathname();
    const router = useRouter();
    const session = useSession();
    
    return (
        <Stack spacing={1}>
            <Typography variant={session.isTablet ? 'h5' : 'h4'} color="primary" fontWeight={'bold'}>Supervisor&#39;s Control Panel</Typography>
            <Grid container>
                <Grid size='auto'>
                    <Stack spacing={2} marginRight={1}>
                        {
                            supervisorFeatures.map((feat) =>
                                <ParentRedBadge key={feat.route}>
                                <FeatureButton
                                    key={feat.name} 
                                    startIcon={<Icon>{feat.icon}</Icon>} 
                                    active={pathname.startsWith(feat.route)}
                                    onClick={() => router.push(feat.route)}
                                >
                                    {feat.name}
                                </FeatureButton>
                                </ParentRedBadge>
                            )
                        }
                    </Stack>
                </Grid>
                <Grid size={'auto'}>
                    <Divider orientation="vertical" ></Divider>
                </Grid>
                <Grid size={'grow'}>                
                    {children}
                </Grid>
            </Grid>
        </Stack>
    );
        
}
