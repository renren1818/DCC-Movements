"use client";

import { MyQueTitle } from "@/components/Que/StylesQue";
import { Box, Stack, Typography } from "@mui/material";
import { AsnParentQueueButton, BlackBadge, ChildConnector, ChildQueButton, ParentConnector } from "./StyleQueue";
import { ArrowBackIosNew } from "@mui/icons-material";
import { useManagerAsnQueueContext } from "@/contexts/ManagerAsnQueue";

export default function Queue() {
    const { activeTeams, addRemoveActiveParent, teamDataResponse, handleSelectAsn, selectedAsn } = useManagerAsnQueueContext();

    return (
        <Stack alignItems="left" spacing={0}>
            {/* Section Title */}
            <MyQueTitle variant="h6">My Queue</MyQueTitle>
            <Box
                sx={{
                    minHeight: "calc(100vh - 165px)",
                    maxHeight: "calc(100vh - 165px)",
                    overflowX: "hidden",
                    overflowY: "auto",
                    scrollbarWidth: "thin",
                }}
            >
                <Stack alignItems="start" sx={{ px: 1, pt: 1 }}>
                    {(!teamDataResponse.data || teamDataResponse.data?.length == 0) && (
                        <>
                            <Typography color="lightgrey" sx={{ pt: 1, fontWeight: "bold" }}>
                                No Queue Available
                            </Typography>
                        </>
                    )}

                    {teamDataResponse.data?.map((asn, index) => {
                        const isActive = activeTeams.includes(asn.TeamName);

                        return (
                            <Stack key={asn.TeamName} alignItems="start">
                                <AsnParentQueueButton
                                    key={index}
                                    active={isActive}
                                    variant="contained"
                                    onClick={() => addRemoveActiveParent(asn.TeamName)}
                                    backgroundColor={asn.ColorCode}
                                    endIcon={
                                        <ArrowBackIosNew
                                            sx={{
                                                transform: isActive ? "rotate(-90deg)" : "rotate(90deg)",
                                                transition: "transform 0.3s ease",
                                            }}
                                        />
                                    }
                                >
                                    {asn.TeamName}
                                </AsnParentQueueButton>

                                {isActive &&
                                    asn.Details.map((detail, detailIndex) => {
                                        return (
                                            <Box key={detail.AsnNumber}>
                                                {detailIndex === 0 ? <ParentConnector /> : <ChildConnector />}
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        height: "100%",
                                                        gap: 0.5,
                                                    }}
                                                >
                                                    <ChildQueButton
                                                        onClick={() => handleSelectAsn(detail)}
                                                        active={selectedAsn?.Asn.AsnNumber === detail.AsnNumber}
                                                    >
                                                        {detail.AsnNumber}
                                                    </ChildQueButton>
                                                    <BlackBadge color={asn.ColorCode}>{detail.DoorCode}</BlackBadge>
                                                </Box>
                                            </Box>
                                        );
                                    })}
                            </Stack>
                        );
                    })}
                </Stack>
            </Box>
        </Stack>
    );
}
