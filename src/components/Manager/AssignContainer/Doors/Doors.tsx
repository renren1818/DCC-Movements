"use client";

import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { AssignContainerTitle, DoorBadge, DoorButton, DoorDuration, DoorTime } from "@/styles/AssignContainer/StyledDoors/StyledDoors";
import { useFetcher } from "@/hooks/Fetcher";
import type { InboundDoor, IDoorWithTeam, IPopulateStaging, DoorTeam, IGetInboundReport } from "@/interfaces/Doors";
import Docking from "../Docking/Docking";
import { fetchInboundDoors, fetchDoorTeams, fetchStagingData } from "@/hooks/Manager/AssignContainer/DoorsLogic";
import { useDoors } from "@/hooks/Manager/AssignContainer/DoorsLogic";
import ForceReceive from "../ForceReceive/ForceReceive";
import MoveToHoldZone from "../ForceReceive/MoveToHoldZone";
import Acknowledgement from "../ForceReceive/Acknowledgement";
import { useSignalRContext } from "@/contexts/SignalR";
import InvalidUPC from "../ForceReceive/InvalidUPC";
import { CustomTitleLabel } from "@/styles/AssignContainer/StyledDocking/StyledDocking";
import DockNotification from "../Traffic/DockNotification";
import { set } from "zod";
import Footprint from "../Footprint/Footprint";

export default function Doors() {
    const [badgeDoors, setBadgeDoors] = useState<number[]>([]);
    const [showInvalidUPC, setShowInvalidUPC] = useState(false);
    const [showAcknowledgement, setShowAcknowledgement] = useState(false);
    const [selectedDoor, setSelectedDoor] = useState<InboundDoor | null>(null);
    const [doors, setDoors] = useState<InboundDoor[]>([]);
    const [doorTeams, setDoorTeams] = useState<IDoorWithTeam[]>([]);
    const [stagingData, setStagingData] = useState<IPopulateStaging[]>([]);
    const [now, setNow] = useState(Date.now());
    const [showForceReceive, setShowForceReceive] = useState(false);
    const [showToHoldZone, setShowToHoldZone] = useState(false);
    const fetcher = useFetcher();
    const { inboundreports } = useDoors();
    const [selectedPoNumber, setSelectedPoNumber] = useState<number>(0);

    const [hasInvalidFootprint, setHasInvalidFootprint] = useState(false);
    const [footprintReports, setFootprintReports] = useState<IGetInboundReport[]>([] as IGetInboundReport[]);

    const refreshDoors = async (doorId?: number) => {
        // fetch latest door teams
        const updatedTeams = await fetchDoorTeams(fetcher);
        setDoorTeams(updatedTeams);

        // optional: if you want to refresh a specific door only
        if (doorId) {
            const updatedDoors = await fetchInboundDoors(fetcher);
            setDoors((prev) => prev.map((d) => (d.DoorId === doorId ? updatedDoors.find((u) => u.DoorId === d.DoorId) || d : d)));
        }
    };

    const signalr = useSignalRContext();

    useEffect(() => {
        if (signalr.getMessage(["GETINBOUNDREPORTS", "FETCHDOORS"])) {
            Promise.all([fetchInboundDoors(fetcher), fetchDoorTeams(fetcher), fetchStagingData(fetcher)]).then(([d, t, s]) => {
                setDoors(d);
                setDoorTeams(t);
                setStagingData(s);

                if (selectedDoor?.IsForDockout) {
                    setSelectedDoor(null);
                }
            });

            if (selectedDoor && !selectedDoor?.IsForDockout) {
                handleDoorClick(selectedDoor);
            }
        }
    }, [signalr.messages]);

    useEffect(() => {
        const updatedBadgeDoors = doors
            .filter((door) => {
                const team = doorTeams.find((t) => t.DoorId === door.DoorId);
                return (door.Asn && (!door.SealNumber?.trim() || team?.IsHasReport)) || door.IsForDockout;
            })
            .map((door) => door.DoorId);

        setBadgeDoors(updatedBadgeDoors);
    }, [doors, doorTeams, signalr.messages]);

    useEffect(() => {
        const timer = setInterval(() => setNow(Date.now()), 60000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (t: string) => new Date(t).toLocaleTimeString("en-GB", { hour12: false });

    const formatElapsed = (t: string) => {
        const ms = Math.max(now - new Date(t).getTime(), 0);
        const h = Math.floor(ms / 3600000);
        const m = Math.floor((ms / 60000) % 60);
        return `${h}H ${m}M`;
    };

    useEffect(() => {
        Promise.all([fetchInboundDoors(fetcher), fetchDoorTeams(fetcher), fetchStagingData(fetcher)]).then(([d, t, s]) => {
            setDoors(d);
            setDoorTeams(t);
            setStagingData(s);
        });
    }, []);

    const handleDoorClick = async (door: InboundDoor) => {
        if (!door.Asn || !door.DoorId) return;
        const team = doorTeams.find((t) => t.DoorId === door.DoorId);
        const payload: DoorTeam = {
            DoorId: door.DoorId,
            TeamId: team?.TeamId || 0,
            SealNumber: door.SealNumber,
            StagingId: team?.StagingId || 0,
            Status: team?.Status || 0,
            Asn: door.Asn,
            ContainerNumber: door.ContainerNumber,
        };
        const reports = await inboundreports(payload);
        const poNumber = Number(reports[0]?.PurchaseOrderNumber || 0);
        setSelectedPoNumber(poNumber);

        const upc = reports.some((r) => r.Description?.toLowerCase().includes("upc does not match"));
        const ccs = reports.some((r) => r.Description?.toLowerCase().includes("case count does not match"));
        const incident = reports.some((r) => r.Description?.toLowerCase() === "file an incident report");
        const invalidUPC = reports.some((r) => r.Description?.toLowerCase() === "invalid upc"); // 👈 new
        setSelectedDoor(door);
        setShowToHoldZone(upc);
        setShowForceReceive(ccs);
        setShowAcknowledgement(incident);
        setShowInvalidUPC(invalidUPC); // 👈 new

        const invalidFootprint = reports.filter((r) => r.Description == "Invalid Configuration");
        setFootprintReports(invalidFootprint);
        setHasInvalidFootprint(invalidFootprint.length > 0);
    };

    const teamOf = (id: number) => doorTeams.find((t) => t.DoorId === id);

    const payload: DoorTeam | null = selectedDoor
        ? {
              DoorId: selectedDoor.DoorId,
              TeamId: teamOf(selectedDoor.DoorId)?.TeamId || 0,
              SealNumber: selectedDoor.SealNumber,
              StagingId: teamOf(selectedDoor.DoorId)?.StagingId || 0,
              Status: teamOf(selectedDoor.DoorId)?.Status || 0,
              Asn: selectedDoor.Asn,
              ContainerNumber: selectedDoor.ContainerNumber,
          }
        : null;

    return (
        <Stack ml={2}>
            <AssignContainerTitle variant="h6">Doors</AssignContainerTitle>

            <Stack spacing={5} mt={1}>
                <Stack direction="row" spacing={3} useFlexGap flexWrap="wrap">
                    {doors.map((door) => {
                        const team = teamOf(door.DoorId);
                        if (door.DoorCode == "2" || door.DoorCode == "3") {
                            console.log(`No team found for door`, door, team);
                        }
                        const assigned = !!door.Asn;
                        return (
                            <Stack key={door.DoorId} alignItems="center">
                                <Stack position="relative" display="inline-flex">
                                    <DoorButton
                                        doorcolor={team?.ColorCode}
                                        isassigned={assigned}
                                        disabled={!assigned}
                                        onClick={() => handleDoorClick(door)}
                                        className={selectedDoor?.DoorId === door.DoorId ? "selected" : ""}
                                    >
                                        {door.DoorCode}
                                    </DoorButton>
                                    {badgeDoors.includes(door.DoorId) && <DoorBadge />}
                                </Stack>
                                {assigned && (
                                    <>
                                        <DoorTime>{formatTime(door.TimeIn)}</DoorTime>
                                        <DoorDuration>{formatElapsed(door.TimeIn)}</DoorDuration>
                                    </>
                                )}
                            </Stack>
                        );
                    })}
                </Stack>
            </Stack>

            {selectedDoor && (showForceReceive || showToHoldZone || showInvalidUPC || showAcknowledgement) && (
                <CustomTitleLabel style={{ marginTop: "25px" }}>Door {selectedDoor.DoorCode}</CustomTitleLabel>
            )}

            {payload && showForceReceive && (
                <ForceReceive door={payload} disabledCard={showAcknowledgement} onClose={() => setShowForceReceive(false)} />
            )}
            {payload && showToHoldZone && (
                <MoveToHoldZone door={payload} onClose={() => setShowToHoldZone(false)} onRefresh={() => refreshDoors(payload.DoorId)} />
            )}

            {payload && showAcknowledgement && (
                <Acknowledgement
                    door={payload}
                    onRefresh={() => refreshDoors(payload.DoorId)}
                    onClose={() => {
                        setShowAcknowledgement(false);
                        setShowForceReceive(false);
                        setShowToHoldZone(false);
                        setSelectedDoor(null);
                    }}
                />
            )}
            {payload && showInvalidUPC && <InvalidUPC door={payload} onClose={() => setShowInvalidUPC(false)} />}

            {payload && hasInvalidFootprint && (
                <>
                    <Footprint
                        DoorCode={selectedDoor?.DoorCode || ""}
                        ContainerNumber={payload.ContainerNumber}
                        reports={footprintReports}
                        onDismiss={() => console.log("dismiss")}
                        onSubmit={() => console.log("submit")}
                    />
                </>
            )}

            {selectedDoor &&
                !showForceReceive &&
                !showToHoldZone &&
                !showAcknowledgement &&
                !showInvalidUPC &&
                !selectedDoor.IsForDockout &&
                !hasInvalidFootprint && (
                    <Docking
                        door={selectedDoor}
                        team={teamOf(selectedDoor.DoorId)}
                        staging={stagingData}
                        onClose={() => setSelectedDoor(null)}
                        onRefresh={() => refreshDoors(selectedDoor.DoorId)}
                    />
                )}

            {selectedDoor &&
                !showForceReceive &&
                !showToHoldZone &&
                !showAcknowledgement &&
                !showInvalidUPC &&
                selectedDoor.IsForDockout && <DockNotification ContainerNumber={selectedDoor.ContainerNumber} />}
        </Stack>
    );
}
