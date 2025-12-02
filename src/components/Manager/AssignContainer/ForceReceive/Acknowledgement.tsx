'use client';

import { Stack } from "@mui/material";
import {
  AcknowledgeButton,
  ErrorAcknowledgeTitle,
  ErrorStack,
  ShipmentCard,
  ShipmentHeader,
  ShipmentLink,
  ShipmentSku,
  ShipmentTitle,
  TriangleIcon,
  TriangleMark,
} from "@/styles/AssignContainer/StyledAcknowledgement/StyledAcknowledgement";

import { fetchDoorTeams, useDoors } from "@/hooks/Manager/AssignContainer/DoorsLogic";
import type { DoorTeam, IGetInboundReport, AcknowledgementLogs, IInboundReportsLogs } from "@/interfaces/Doors";
import { useEffect, useState } from "react";
import { useSession } from "@/contexts/Session";
import { useFetcher } from "@/hooks/Fetcher";


interface ForceReceiveProps {
  door: DoorTeam;
  onClose: () => void;
  onRefresh?: () => void;   // 👈 ADD THIS
}

function mapReportToAcknowledgementLog(report: IGetInboundReport, userId: string): AcknowledgementLogs {
  return {
    asnNumber: report.AsnNumber,
    poNumber: report.PurchaseOrderNumber,
    sku: report.Sku,
    status: 6,
    teamId: report.TeamId,
    updateBy: userId,
  };
}

export default function Acknowledgement({ door,onClose,onRefresh }: ForceReceiveProps) {
  const { user } = useSession();
  const fetcher = useFetcher();
  const { inboundreports, acknowledgementlog, createreportlog } = useDoors();
  const [reports, setReports] = useState<IGetInboundReport[]>([]);
  const [hasIncidentReport, setHasIncidentReport] = useState(false);


  useEffect(() => {
    if (!door) return;

    const fetchReports = async () => {
      try {
        const data = await inboundreports(door);

        const uniqueReports = Array.from(
          new Map(data.map(item => [item.Id, item])).values()
        );

        setReports(uniqueReports);

        const incident = data.some(
          (r) => r.Description?.toLowerCase() === "file an incident report"
        );
        setHasIncidentReport(incident);
      } catch (err) {
        console.error("❌ Error fetching inbound reports:", err);
      }
    };

    fetchReports();
  }, []);

  const handleAcknowledge = async (report: IGetInboundReport, ackLog: AcknowledgementLogs) => {
    if (!user?.UserId) {
      console.error("No user in session!");
      return;
    }

    try {

      console.log(ackLog,"ackLog")

      const historyLog: IInboundReportsLogs = {
        Action: 6,
        CreatedBy: String(user.UserId),
        InboundOutboundReportId: report.Id,
      };

      await createreportlog(historyLog);
      await acknowledgementlog(ackLog);

      // ⚡ Trigger badge refresh via SignalR
    onRefresh?.();   // 👈 refresh the UI
      
onClose();
      
    } catch (err) {
      console.error("❌ Error acknowledging report:", err);
    }
  };

  return (
    <Stack sx={{ paddingBottom: "80px" }}>
      <Stack mt={1} mb={1} position="relative">
        <ShipmentCard>
          <ShipmentHeader>
            <ShipmentTitle>Inbound Shipment No.</ShipmentTitle>
            <ShipmentLink href="#">{door.Asn}</ShipmentLink>
            <ShipmentSku>{reports[0]?.Sku || "N/A"}</ShipmentSku>
          </ShipmentHeader>

          {hasIncidentReport && (
            <ErrorStack>
              <ErrorAcknowledgeTitle>
                <TriangleIcon>
                  <TriangleMark>!</TriangleMark>
                </TriangleIcon>
                File an incident report
              </ErrorAcknowledgeTitle>
            </ErrorStack>
          )}

          <Stack direction="row" mt={2} spacing={1}>
            {reports.map((report, index) => (
              <AcknowledgeButton
                key={`${report.Id}-${index}`}
                onClick={() => {
                  if (!user?.UserId) return;
                  const ackLog = mapReportToAcknowledgementLog(report, String(user.UserId));
                  handleAcknowledge(report, ackLog);
                }}
              >
                ACKNOWLEDGE
              </AcknowledgeButton>
            ))}
          </Stack>
        </ShipmentCard>
      </Stack>
    </Stack>
  );
}
