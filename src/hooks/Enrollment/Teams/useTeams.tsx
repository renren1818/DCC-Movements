import { useEffect, useState } from "react";
import { useFetcher } from "../../Fetcher";
import { CreateTeam, Teams } from "@/interfaces/enrollment/Teams/Teams";
import { TimeConvertion } from "@/utils/TimeConvertion";
import { Schedule } from "@/interfaces/enrollment/Teams/Schedule";
import { SharedOption } from "@/interfaces/enrollment/Common/SharedOption";

export function useTeams() {
  const fetcher = useFetcher();

  const [data, setData] = useState<Teams[]>([]);
  const [secretary, setSecretary] = useState<SharedOption[]>([]);
  const [manager, setManager] = useState<SharedOption[]>([]);
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [distriCenter, setDistriCenter] = useState<SharedOption[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const fetchTeams = async (query: string = "", pageNumber: number = 0, pageSize: number = 10, tab?: string) => {
    try {
      const response = await fetcher.POST("/team/GetTeamsList", {
        searchQuery: query,
        pageNumber: pageNumber + 1,
        pageSize,
        pageCount: 0,
        columnToSort: tab ?? "",
        orderBy: "asc",
      });

      const teams = response.data.data.data ?? response.data;

      const teamData: Teams[] = teams.map((team: Teams) => ({
        id: team.TeamId,
        TeamId: team.TeamId,
        Area: team.Area,
        ColorCode: team.ColorCode,
        EndTime: team.EndTime,
        Location: team.Location,
        Manager: team.Manager,
        Name: team.Name,
        Schedule: team.Schedule,
        Secretary: team.Secretary,
        Shift: `${TimeConvertion(team.StartTime)} - ${TimeConvertion(team.EndTime)}`,
        StartTime: team.StartTime,
        Mon: team.Mon,
        Tue: team.Tue,
        Wed: team.Wed,
        Thu: team.Thu,
        Fri: team.Fri,
        Sat: team.Sat,
        Sun: team.Sun,
      }));
      setData(teamData);
      setTotalCount(response.data.data.count);
    } catch (error) {
      console.log("The Data Cannot be loaded", error);
    }
  };
  const fetchSecretary = async () => {
    try {
      const response = await fetcher.GET("/User/PopulateSecretary");

      const data = response.data.data ?? response.data;

      const secretaryData: SharedOption[] = data.map((emp: SharedOption, index: number) => ({
        Value: emp.Value || index,
        Label: emp.Label,
        Disabled: emp.Disabled,
      }));

      setSecretary(secretaryData);
    } catch (error) {
      console.error();
    }
  };

  const fetchManager = async () => {
    try {
      const response = await fetcher.GET("/User/PopulateManager");

      const data = response.data.data ?? response.data;

      const managerData: SharedOption[] = data.map((emp: SharedOption, index: number) => ({
        Value: emp.Value || index,
        Label: emp.Label,
        Disabled: emp.Disabled,
      }));

      setManager(managerData);
    } catch (error) {
      console.error();
    }
  };

  const fetchSchedule = async () => {
    try {
      const response = await fetcher.GET("/schedule/GetAllSchedule");

      const data = response.data.data ?? response.data;

      const scheduleData: Schedule[] = data.map((sched: Schedule, index: number) => ({
        id: sched.ScheduleId || index,
        ScheduleId: sched.ScheduleId,
        Name: sched.Name,
        Type: sched.Type,
        StartTime: sched.StartTime,
        EndTime: sched.EndTime,
        FormatedStartTime: sched.FormatedStartTime,
        FormatedEndTime: sched.FormatedEndTime,
        Monday: sched.Monday,
        Tuesday: sched.Tuesday,
        Wednesday: sched.Wednesday,
        Thursday: sched.Thursday,
        Friday: sched.Friday,
        Saturday: sched.Saturday,
        Sunday: sched.Sunday,
      }));

      setSchedule(scheduleData);
    } catch (error) {
      console.error();
    }
  };

  const fetchCenter = async () => {
    try {
      const response = await fetcher.GET("/dc/SelectDc");

      const data = response.data.data ?? response.data;
      const centerData: SharedOption[] = data.map((center: SharedOption, index: number) => ({
        Value: center.Value || index,
        Label: center.Label,
        Disabled: center.Disabled,
      }));

      setDistriCenter(centerData);
    } catch (error) {
      console.error("There are only one distribution center");
    }
  };
  const fetchTeamId = async (teamId: number): Promise<CreateTeam | null> => {
    try {
      // Notice: query string, not body
      const response = await fetcher.POST(`/team/GetTeamById?id=${teamId}`, {});

      const team = response.data?.data ?? response.data?.Data;
      if (!team) {
        console.warn("No team object found:", response.data);
        return null;
      }

      return {
        TeamId: team.TeamId ?? 0,
        ManagerId: team.ManagerId ?? 0,
        SecretaryId: team.SecretaryId ?? 0,
        Name: team.Name ?? "",
        ColorCode: team.ColorCode ?? "#ffffff",
        Area: team.Area ?? "",
        LocationId: team.LocationId ?? 0,
        ScheduleDateId: team.ScheduleDateId ?? 0,
        NumberOfUnloader: team.NumberOfUnloader ?? 0,
        NumberOfPallerUnloader: team.NumberOfPallerUnloader ?? 0,
        NumberOfTransporter: team.NumberOfTransporter ?? 0,
        NumberOfForkliftDriver: team.NumberOfForkliftDriver ?? 0,
      };
    } catch (error) {
      console.error("Failed to fetch team by id", error);
      return null;
    }
  };

  const addTeams = async (team: CreateTeam) => {
    const tempManagerId = 76;
    const tempSecretaryId = 76;

    const tempUnloader = 1;
    const tempPalletUnloader = 1;
    const tempNumberOfTransporter = 1;
    const tempNumberOfForkLiftDriver = 1;

    try {
      const response = await fetcher.POST("/team/CreateTeamAsync", {
        TeamId: team.TeamId,
        ManagerId: tempManagerId,
        SecretaryId: tempSecretaryId,
        Name: team.Name,
        ColorCode: team.ColorCode,
        Area: team.Area,
        LocationId: team.LocationId,
        ScheduleDateId: team.ScheduleDateId,
        NumberOfUnloader: tempUnloader,
        NumberOfPallerUnloader: tempPalletUnloader,
        NumberOfTransporter: tempNumberOfTransporter,
        NumberOfForkliftDriver: tempNumberOfForkLiftDriver,
      });

      return response.data.data ?? response.data;
    } catch (error) {
      console.error("Failed to create team", error);
      return null;
    }
  };

  const updateTeam = async (team: CreateTeam) => {
    const tempManagerId = 76;
    const tempSecretaryId = 76;
    const tempUnloader = 1;
    const tempPalletUnloader = 1;
    const tempNumberOfTransporter = 1;
    const tempNumberOfForkLiftDriver = 1;

    const response = await fetcher.PUT("/team/UpdateTeamAsync", {
      TeamId: team.TeamId,
      ManagerId: tempManagerId,
      SecretaryId: tempSecretaryId,
      Name: team.Name,
      ColorCode: team.ColorCode,
      Area: team.Area,
      LocationId: team.LocationId,
      ScheduleDateId: team.ScheduleDateId,
      NumberOfUnloader: tempUnloader,
      NumberOfPallerUnloader: tempPalletUnloader,
      NumberOfTransporter: tempNumberOfTransporter,
      NumberOfForkliftDriver: tempNumberOfForkLiftDriver,
    });

    return response.data.data ?? response.data;
  };

  const removeTeam = async (id: number) => {
    try {
      const response = await fetcher.POST("/team/DeleteTeamAsync", id);

      return response.data.data;
    } catch (error) {
      console.error("The team doesn't exist", error);
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      await Promise.all([fetchTeams(), fetchSecretary(), fetchManager(), fetchSchedule(), fetchCenter()]);
    };

    fetchAll();
  }, []);

  return {
    data,
    secretary,
    manager,
    schedule,
    distriCenter,
    addTeams,
    fetchTeamId,
    updateTeam,
    removeTeam,
    fetchTeams,
    setData,
    totalCount,
  };
}
