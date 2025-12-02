interface Teams {
  TeamId: number;
  Area: string;
  ColorCode: string;
  EndTime: string;
  Location: string;
  Manager: string;
  Name: string;
  Schedule: string;
  Secretary: string;
  Shift: string;
  StartTime: string;
  Mon: boolean;
  Tue: boolean;
  Wed: boolean;
  Thu: boolean;
  Fri: boolean;
  Sat: boolean;
  Sun: boolean;
}

interface CreateTeam {
  TeamId: number;
  ManagerId: number;
  SecretaryId: number;
  Name: string;
  ColorCode: string;
  Area: string;
  LocationId: number;
  ScheduleDateId: number;
  NumberOfUnloader: number;
  NumberOfPallerUnloader: number;
  NumberOfTransporter: number;
  NumberOfForkliftDriver: number;
}

export type { CreateTeam, Teams };
