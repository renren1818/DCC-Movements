export interface Schedule {
  ScheduleId: number;
  Name: string;
  Type: number;

  StartTime: string;
  EndTime: string;
  FormatedStartTime: string;
  FormatedEndTime: string;

  Monday: boolean;
  Tuesday: boolean;
  Wednesday: boolean;
  Thursday: boolean;
  Friday: boolean;
  Saturday: boolean;
  Sunday: boolean;
}
