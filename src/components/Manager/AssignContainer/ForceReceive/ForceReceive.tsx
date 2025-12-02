'use client';

import { Stack } from "@mui/material";
import { 
  ErrorMessage, ErrorStack, ErrorTitle, ForceReceivedButton, 
  InvestigationLabel, OctagonIcon, ReceivedButton, 
  ShipmentCard, ShipmentHeader, ShipmentLink, ShipmentSku, ShipmentTitle 
} from "@/styles/AssignContainer/StyledForceReceive/StyledForceReceive";

import { fetchDoorTeams, useDoors } from "@/hooks/Manager/AssignContainer/DoorsLogic";
import type { DoorTeam, IGetInboundReport, IInboundReportsLogs, InboundDoor } from "@/interfaces/Doors";
import { useEffect, useState } from "react";
import Acknowledgement from "../../../Manager/AssignContainer/ForceReceive/Acknowledgement";
import { useSession } from "@/contexts/Session";
import { useFetcher } from "@/hooks/Fetcher";
import { CustomTitleLabel } from "@/styles/AssignContainer/StyledDocking/StyledDocking";

interface ForceReceiveProps {
  door: DoorTeam;
  disabledCard?: boolean;
  onClose: () => void;   // 👈 add this
}

function mapGetInboundReportToInboundReportsLogs(report: IGetInboundReport, userId: string): IInboundReportsLogs {
  return {
    Action: 0,
    CreatedBy: userId,
    InboundOutboundReportId: report.Id,
  };
}

export default function ForceReceive({ door, disabledCard, onClose}: ForceReceiveProps) {
  const fetcher = useFetcher();
  const { inboundreports, createreportlog, acknowledgementlog } = useDoors();
  const { user } = useSession();
  const [disabled, setDisabled] = useState(false);
  const [reports, setReports] = useState<IGetInboundReport[]>([]);
  const [hasCaseCountError, setHasCaseCountError] = useState(false);
  const [showAcknowledgement, setShowAcknowledgement] = useState(false);
  

  useEffect(() => {
    if (!door) return;

    const fetchReports = async () => {
      try {
        const data = await inboundreports(door);

        setReports(data);
        

        setHasCaseCountError(
          data.some(r => r.Description?.toLowerCase().includes("case count does not match"))
        );

       
      } catch (err) {
        console.error("❌ Error fetching inbound reports:", err);
      }
    };

    fetchReports();
  }, []);

  const handleForceReceived = async (report: IGetInboundReport) => {
    if (!user?.UserId) return;

    const logMapped = mapGetInboundReportToInboundReportsLogs(report, String(user.UserId));
    console.log(logMapped)
    await createreportlog(logMapped);
    setDisabled(true);
    setShowAcknowledgement(true);
    onClose(); // Close ForceReceive
  }; 

  const handleReceived = async (report: IGetInboundReport) => {
  if (!user?.UserId) return;

  // 1️⃣ Call acknowledgementlog()
  await acknowledgementlog({
    asnNumber: report.AsnNumber ?? door.Asn,
    poNumber: report.PurchaseOrderNumber,
    sku: report.Sku,
    status: 7,     // change this if your backend uses numeric values
    teamId: door.TeamId,
    updateBy: String(user.UserId),
  });

  // 2️⃣ Call createreportlog() with Action = 1
  await createreportlog({
    Action: 1, // 👈 RECEIVED action
    CreatedBy: String(user.UserId),
    InboundOutboundReportId: report.Id,
  });

   // 3️⃣ Close ForceReceive
  onClose();
  const doorsWithTeams = await fetchDoorTeams(fetcher); // pass fetcher instance
  console.log("✅ Door teams updated:", doorsWithTeams);
};

  return (
    <Stack sx={{ paddingBottom: "10px", opacity: disabledCard ? 0.5 : 1 }}>
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

          {hasCaseCountError && (
            <ErrorStack>
              <ErrorTitle>
                <OctagonIcon>×</OctagonIcon>Error 002
              </ErrorTitle>
              <ErrorMessage>Case count does not match</ErrorMessage>
            </ErrorStack>
          )}

          <Stack direction="row" mt={2} spacing={0}>
            {hasCaseCountError && (
              <ForceReceivedButton
                onClick={() => {
                  const log = reports.find(r =>
                    r.Description?.toLowerCase().includes("case count does not match")
                  );
                  if (log) handleForceReceived(log);
                }}
                disabled={disabledCard || disabled}
                forceReceived={disabledCard || disabled}
              >
                FORCE RECEIVED
              </ForceReceivedButton>
            )}
           <ReceivedButton
  disabled={disabledCard || disabled}
  onClick={() => {
    const report = reports[0];
    if (report) handleReceived(report);
  }}
>
  RECEIVED
</ReceivedButton>
          </Stack>
        </ShipmentCard>
      </Stack>

     
    </Stack>
  );
}
