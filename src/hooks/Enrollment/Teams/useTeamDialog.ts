import { useEffect, useMemo, useState } from "react";

import { AddUpdateTeamSchema } from "@/validation/Enrollment/TeamValidation";
import { CreateTeam } from "@/interfaces/enrollment/Teams/Teams";
import { Schedule } from "@/interfaces/enrollment/Teams/Schedule";


export const defaultTeam: CreateTeam = {
  TeamId: 0,
  ManagerId: 0,
  SecretaryId: 0,
  Name: "",
  ColorCode: "",
  Area: "",
  LocationId: 0,
  ScheduleDateId: 0, // sentinel = not chosen
  NumberOfUnloader: 0,
  NumberOfPallerUnloader: 0,
  NumberOfTransporter: 0,
  NumberOfForkliftDriver: 0,
};

export function useTeamDialog(teamData?: CreateTeam, scheduleData: Schedule[] = []) {
  const [data,  setData] = useState<CreateTeam>({ ...defaultTeam, ...(teamData || {}) });
  const [tempColor, setTempColor] = useState(data.ColorCode);
  const [colorDialogOpen, setColorDialogOpen] = useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number>(
    teamData?.ScheduleDateId ?? 0
  );
  const [fieldError, setFieldError] = useState<Record<string, string>>({});
  const [showToast, setShowToast] = useState(false)
   const [toastMessage, setToastMessage] = useState("")

  useEffect(() => {
    if (!teamData) return;
    setData({ ...defaultTeam, ...teamData });
    setTempColor(teamData.ColorCode || "");
    setSelectedScheduleId(teamData.ScheduleDateId ?? 0);
  }, [teamData]);

  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  const selectedSchedule = useMemo(
    () =>
      !scheduleData?.length || selectedScheduleId === 0
        ? undefined
        : scheduleData.find(s => s.ScheduleId === selectedScheduleId),
    [scheduleData, selectedScheduleId]
  );

  const uiSchedule = useMemo(
    () =>
      !selectedSchedule
        ? []
        : days.map(day => {
            const active = (selectedSchedule[day as keyof Schedule] as boolean) ?? false;
            return {
              day,
              active,
              start: active ? selectedSchedule.FormatedStartTime : "--",
              end: active ? selectedSchedule.FormatedEndTime : "--",
            };
          }),
    [selectedSchedule]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setData(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleReset = () => {
    setData({ ...defaultTeam });
    setTempColor("");
    setSelectedScheduleId(0);
    setColorDialogOpen(false);
    setFieldError({});
  };

  const validate = (): boolean => {
    const payload = {
      ...data,
      ColorCode: tempColor,
      ScheduleDateId: selectedScheduleId,
    };

    const result = AddUpdateTeamSchema.safeParse(payload);

    if (result.success) {
      setFieldError({});
      return true;
    }

    const errors = result.error.issues.reduce<Record<string, string>>((acc, issue) => {
      const field = issue.path[0];
      if (field) acc[String(field)] = issue.message;
      return acc;
    }, {});

    setFieldError(errors);
    return false;
  };

  const handleSave = async (onSave: (team: CreateTeam) => void | Promise<void>) => {
    const payload: CreateTeam = {
      ...defaultTeam,
      ...(teamData || {}),
      ...data,
      ColorCode: tempColor,
      ScheduleDateId: selectedScheduleId,
    };

    if (validate()) {
      await onSave(payload);
      setFieldError({});
    }

      setToastMessage(payload.TeamId === 0 ? "Saved Successfully" : "Updated Successfully ")
      setShowToast(true);
  };

  return {
    data, setData,
    tempColor, setTempColor,
    colorDialogOpen, setColorDialogOpen,
    selectedScheduleId, setSelectedScheduleId,
    uiSchedule,
    handleChange, handleReset, handleSave,
    fieldError,
    defaultTeam,
    showToast,setShowToast, toastMessage
  };
}