import type {
  InboundDoor,
  IDoorWithTeam,
  IPopulateStaging,
  DoorTeam,
  IGetInboundReport,
  IInboundReportsLogs,
  AcknowledgementLogs,
} from "@/interfaces/Doors";
import { useFetcher } from "@/hooks/Fetcher";
import { useEffect, useState } from "react";
import { useSession } from "@/contexts/Session";
import { useSignalRContext } from "@/contexts/SignalR";

export default function useDoors() {
  const fetcher = useFetcher();
  const [doors, setDoors] = useState<DoorTeam[]>([]);
  const { user } = useSession();

  const retriveData = async (doors: DoorTeam) => {
    try {
      const response = await fetcher.POST("/doorteam/door-team", {
        DoorId: doors.DoorId,
        SealNumber: doors.SealNumber,
        StagingId: doors.StagingId,
        Status: doors.Status,
        TeamId: doors.TeamId,
        Asn: doors.Asn,
        ContainerNumber: doors.ContainerNumber,
      });
      const door = response.data.data ?? response.data;
      setDoors(door);
      return door;
    } catch (err) {
      console.error("❌ Failed to load doors data", err);
    }
  };

  const inboundreports = async (door: DoorTeam): Promise<IGetInboundReport[]> => {
    try {
      const { data } = await fetcher.POST("/InboundOutboundReport/GetInboundReport", {
        Asn: door.Asn,
        TeamId: door.TeamId,
      });
      console.log("📦 inbound report raw:", data);
      const reportsRaw = data?.data ?? data ?? [];
      const reports = Array.isArray(reportsRaw) ? reportsRaw : [reportsRaw];
      return reports.map((item: IGetInboundReport) => ({ ...item }));
    } catch (err) {
      console.error("❌ Failed to load inbound report data:", err);
      return [];
    }
  };

  const createreportlog = async (log: IInboundReportsLogs) => {
    try {
      const { data } = await fetcher.POST("InboundOutboundReportLog/CreateReportLogAsync", {
        Action: log.Action,
        CreatedBy: user?.UserId,
        InboundOutboundReportId: log.InboundOutboundReportId,
      });
      return data?.data ?? data;
    } catch (err) {
      console.error("❌ Failed to create report log", err);
    }
  };

  const acknowledgementlog = async (log: AcknowledgementLogs) => {
    try {
      const { data } = await fetcher.POST("InboundOutboundReport/UpdateInboundReport", {
        asnNumber: log.asnNumber,
        poNumber: log.poNumber,
        sku: log.sku,
        status: log.status,
        teamId: log.teamId,
        updateBy: log.updateBy,
      });
      return data?.data ?? data;
    } catch (err) {
      console.error("❌ Failed to create report log", err);
    }
  };

  return { retriveData, inboundreports, createreportlog, acknowledgementlog };
}

export interface IFetcher {
  GET: <T>(url: string) => Promise<{ data: { data: T } }>;
}

export interface IResponse {
  POST: <T>(url: string) => Promise<{ data: { data: T } }>;
}

const fetchInboundDoors = async (fetcher: IFetcher): Promise<InboundDoor[]> => {
  const response = await fetcher.GET<InboundDoor[]>("/Door/GetInboundDoors");
  return response?.data?.data || [];
};

const fetchDoorTeams = async (fetcher: IFetcher): Promise<IDoorWithTeam[]> => {
  const response = await fetcher.GET<IDoorWithTeam[]>("/doorteam/current-door-team");
  return response?.data?.data || [];
};

const fetchStagingData = async (fetcher: IFetcher): Promise<IPopulateStaging[]> => {
  const response = await fetcher.GET<IPopulateStaging[]>("/Staging/PopulateStaging");
  return response?.data?.data || [];
};

export { fetchInboundDoors, fetchDoorTeams, fetchStagingData, useDoors };
