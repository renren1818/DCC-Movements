import { Stack } from "@mui/material";
import {
  ErrorMessage,
  ErrorStack,
  ErrorTitle,
  MoveToHoldZoneButton,
  InvestigationLabel,
  OctagonIcon,
  DismissButton,
  ShipmentCard,
  ShipmentHeader,
  ShipmentLink,
  ShipmentSku,
  ShipmentTitle,
} from "@/styles/AssignContainer/StyledMovetoholdzone/StyledMovetoholdzone";
import { fetchDoorTeams, useDoors } from "@/hooks/Manager/AssignContainer/DoorsLogic";
import { useSession } from "@/contexts/Session";
import type { DoorTeam, IGetInboundReport } from "@/interfaces/Doors";
import { useEffect, useState } from "react";
import { useFetcher } from "@/hooks/Fetcher";

interface MoveToHoldZoneProps {
  door: DoorTeam;
  onClose: () => void; // <-- add onClose prop
}

export default function InvalidUPC({ door, onClose }: MoveToHoldZoneProps) {
  const { inboundreports, acknowledgementlog, createreportlog } = useDoors();
  const { user } = useSession();
  const fetcher = useFetcher();
  const [reports, setReports] = useState<IGetInboundReport[]>([]);

  useEffect(() => {
    if (!door) return;

    const fetchReports = async () => {
      try {
        const data = await inboundreports(door);
        setReports(data);
      } catch (err) {
        console.error("❌ Error fetching inbound reports:", err);
      }
    };

    fetchReports();
  }, []);

  const handleMoveToHoldZone = async () => {
  if (!user?.UserId) return;

  const report = reports[0];
  if (!report) return;

  // 1️⃣ Call createreportlog first (Action = 4)
  await createreportlog({
    Action: 4,
    CreatedBy: String(user.UserId),
    InboundOutboundReportId: report.Id,
  });

  // 2️⃣ Fetch latest inbound report
  const updatedReports = await inboundreports(door);
  const latestReport = updatedReports[0]; // assuming first one

  if (!latestReport) {
    console.error("No report returned from inboundreports");
    onClose();
    return;
  }

  // 3️⃣ Update inbound report status (status = 5)
  await acknowledgementlog({
    asnNumber: latestReport.AsnNumber ?? door.Asn,
    poNumber: latestReport.PurchaseOrderNumber,
    sku: latestReport.Sku,
    status: 5,
    teamId: door.TeamId,
    updateBy: String(user.UserId),
  });

  // 4️⃣ Close the panel
  onClose();
   const doorsWithTeams = await fetchDoorTeams(fetcher); // pass fetcher instance
    console.log("✅ Door teams updated:", doorsWithTeams);
};

const handleDismissOrMoveToHoldZone = async () => {
  if (!user?.UserId) return;
  const report = reports[0];
  if (!report) return;

  try {
    // 1️⃣ Create report log first (Action = 4)
    await createreportlog({
      Action: 4,
      CreatedBy: String(user.UserId),
      InboundOutboundReportId: report.Id,
    });

    // 2️⃣ Fetch latest inbound report
    const updatedReports = await inboundreports(door);
    const latestReport = updatedReports[0];
    if (!latestReport) {
      console.error("No report returned from inboundreports");
      onClose();
      return;
    }

    // 3️⃣ Update inbound report status (status = 5)
    await acknowledgementlog({
      asnNumber: latestReport.AsnNumber ?? door.Asn,
      poNumber: latestReport.PurchaseOrderNumber,
      sku: latestReport.Sku,
      status: 5,
      teamId: door.TeamId,
      updateBy: String(user.UserId),
    });

    // 4️⃣ Close the panel
    onClose();
     const doorsWithTeams = await fetchDoorTeams(fetcher); // pass fetcher instance
    console.log("✅ Door teams updated:", doorsWithTeams);

  } catch (err) {
    console.error("❌ Error processing MoveToHoldZone/Dismiss:", err);
  }
};


  return (
    <Stack sx={{ paddingBottom: "80px" }}>
      <Stack position="relative">
        <InvestigationLabel>For Investigation</InvestigationLabel>
      </Stack>

      <Stack mt={4} mb={1} position="relative">
        <ShipmentCard>
          <ShipmentHeader>
            <ShipmentTitle>Inbound Shipment No.</ShipmentTitle>
            <ShipmentLink href="#">{door.Asn}</ShipmentLink>
            <ShipmentSku>{reports[0]?.Sku || "N/A"}</ShipmentSku>
          </ShipmentHeader>

          <ErrorStack>
            <ErrorTitle>
              <OctagonIcon>×</OctagonIcon>Error 001
            </ErrorTitle>
            <ErrorMessage>Invalid UPC</ErrorMessage>
          </ErrorStack>

          <Stack direction="row" mt={2}>
            <MoveToHoldZoneButton
  onClick={handleMoveToHoldZone}
>
  MOVE TO HOLD ZONE
</MoveToHoldZoneButton>
            <DismissButton onClick={handleDismissOrMoveToHoldZone}>
  DISMISS
</DismissButton>
          </Stack>
        </ShipmentCard>
      </Stack>
    </Stack>
  );
}
