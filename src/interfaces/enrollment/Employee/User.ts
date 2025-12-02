import { EmploymentDetails, RolesAndSkills } from "./UserDialog";

export interface AddUser {
  UserId?: number;
  EmployeeNumber: string;
  EmploymentStatus?: string;
  FirstName: string;
  LastName: string;
  MiddleName?: string;
  LocationId: number;
  RoleIds: number[];
  SkillIds: number[];
  TeamId: number;
  DesignationId: number;
  ActiveStatus: boolean;
  IsLogIn: boolean;
  IsPasswordReset: boolean;
}

export interface User {
  UserId: number;
  EmployeeNumber: string;
  FullName: string;
  Designation: string;
  Ranks: string;
  Location: string;
  Skills: string;
  Team: string;
  TeamColorCode: string;

  Shift: string;
  StartTime: string;
  EndTime: string;
}

export interface Equipment {
  EquipmentId: number;
  EquipmentStatus: string;
  EquipmentType: string;
  Code: string;

  IncidentDate: Date;
  PurchaseDate: Date;
  ReportedDate: Date;

  LastAssignment: string;
  Location: string;
  Age: number;
}

enum ShiftType {
  Day = "Day",
  Night = "Night",
  Swing = "Swing",
}

enum AreaType {
  Inbound = "Inbound",
  Outbound = "Outbound",
  Packing = "Packing",
}

type TimeString = `${number}:${number}:${number}`;
type HexColor = string & { __hexBrand: never };

type Weekday = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
export type UserPayload = Omit<
  AddUser,
  "ActiveStatus" | "IsLogIn" | "IsPasswordReset"
>;

type TeamMembers = {
  Manager: string;
  Secretary?: string;
};

export type TeamSchedule = {
  TeamId: number;
  Name: string;
  Area: AreaType;
  Location: string;
  ColorCode: HexColor;
  Shift: ShiftType;
  Schedule: string;
  StartTime: TimeString;
  EndTime: TimeString;
  Team: TeamMembers;
  DaysActive: Record<Weekday, boolean>;
};

export interface ActionProps {
  openModal: boolean;
  userData?: AddUser;
  designation: EmploymentDetails[];
  roles: RolesAndSkills[];
  closeModal: () => void;
  onSaved: (user: AddUser) => void | Promise<void>; 
  team: EmploymentDetails[];
  location: EmploymentDetails[];
  skills: RolesAndSkills[];
}
