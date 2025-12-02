import { useState, useEffect } from "react";
import { useFetcher } from "@/hooks/Fetcher";
import useDoors from "@/hooks/Manager/AssignContainer/DoorsLogic";

import type {
  DoorTeam,
  IDoorWithTeam,
  InboundDoor,
  IPopulateStaging,
  ITeamColor,
  IUpdateDoorTeamRequest,
} from "@/interfaces/Doors";

export function useDockingLogic(
  door: InboundDoor,
  team?: IDoorWithTeam,
  
) {
  const fetcher = useFetcher();
  const doorsData = useDoors();

  const [teamOptions, setTeamOptions] = useState<ITeamColor[]>([]);
  const [stagingOptions, setStagingOptions] = useState<IPopulateStaging[]>([]);
  const [sealNumber, setSealNumber] = useState<string>(door?.SealNumber || "");
  const [selectedTeam, setSelectedTeam] = useState<number | "">("");
  const [selectedStaging, setSelectedStaging] = useState<number | "">("");
  const [isDelegated, setIsDelegated] = useState(false);
  const [isDoorOpen, setIsDoorOpen] = useState<boolean>(team?.IsOpen ?? false);
  const [doors, setDoors] = useState<DoorTeam[]>([]);
  const [isDelegating, setIsDelegating] = useState(false);
  const [isSealed, setIsSealed] = useState(false);

  const isAllDisabled =
    (!!team?.TeamId || isDelegated) &&
    (!!team?.StagingId || isDelegated) &&
    (!team?.IsOpen || !!door.SealNumber || isDelegated);

  // ───────────────────────────────
  // ⚙️ Handle Delegate
  // ───────────────────────────────
  const handleDelegate = async () => {
    if (selectedTeam === "" || selectedStaging === "") {
      alert("Please select team and staging area.");
      return;
    }

    try {
      setIsDelegating(true);

      const payload = {
        Asn: door.Asn,
        ContainerNumber: door.ContainerNumber,
        DoorId: door.DoorId,
        SealNumber: sealNumber,
        StagingId: selectedStaging,
        Status: 1,
        TeamId: selectedTeam,
      };

      const response = await doorsData.retriveData(payload);
      console.log("✅ Delegation success:", response);
 
      setIsDelegated(true);
      setIsSealed(true); // ✅ mark as sealed
      setIsDoorOpen(true);

      // ❌ Removed onUpdateDoorColor(door.DoorId)
    } catch (err) {
      console.error("❌ Failed to delegate:", err);
    } finally {
      setIsDelegating(false);
    }
  };

  // ───────────────────────────────
  // 💾 Handle Save (PUT update)
  // ───────────────────────────────
  const handleSaveDocking = async () => {
    if (!sealNumber.trim()) {
      alert("Please enter a seal number before saving.");
      return;
    }

    try {
      const constPayload: IUpdateDoorTeamRequest = {
        DoorTeamId: team?.DoorTeamId ?? 0,
        DoorId: door.DoorId,
        ContainerNumber: door.ContainerNumber,
        Asn: door.Asn,
        TeamId: selectedTeam !== "" ? Number(selectedTeam) : team?.TeamId ?? 0,
        SealNumber: sealNumber.trim(),
        StagingId:
          selectedStaging !== "" ? Number(selectedStaging) : team?.StagingId ?? 0,
        Status: 2,
      };

      const response = await fetcher.PUT(
        "/doorteam/update-door-team",
        constPayload
      );
      const updated = response?.data?.data ?? response?.data;

      setDoors((prev) =>
        prev.map((d) => (d.DoorId === updated.DoorId ? updated : d))
      );

      console.log("✅ Docking data saved:", updated);
      setIsDelegated(true); // ✅ lock the form after saving

      // ❌ Removed onUpdateDoorColor(door.DoorId)
    } catch (err) {
      console.error("❌ Failed to update docking data:", err);
    }
  };

  useEffect(() => {
    setSelectedTeam("");
    setSelectedStaging("");
    setSealNumber(door?.SealNumber || "");
    setIsDelegated(false);
    setIsDoorOpen(team?.IsOpen ?? false);
  }, [door.DoorId, door?.SealNumber, team?.IsOpen]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamRes, stagingRes] = await Promise.all([
          fetcher.GET("/team/unassigned-teams-select"),
          fetcher.GET("/Staging/PopulateStaging"),
        ]);
        setTeamOptions(teamRes?.data?.data || []);
        setStagingOptions(stagingRes?.data?.data || []);
      } catch (error) {
        console.error("❌ Failed to fetch dropdown data:", error);
      }
    };
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const resetFields = () => {
    setSelectedTeam("");
    setSelectedStaging("");
    setSealNumber("");
    setIsDelegated(false);
  };

  return {
    teamOptions,
    stagingOptions,
    sealNumber,
    setSealNumber,
    selectedTeam,
    setSelectedTeam,
    selectedStaging,
    setSelectedStaging,
    isDelegated,
    setIsDelegated,
    isDoorOpen,
    isAllDisabled,
    isSealed, // ✅ new
    isDelegating,
    handleDelegate,
    handleSaveDocking,
    resetFields,
    
  };
}
