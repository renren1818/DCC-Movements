interface EmploymentDetails{
  Disabled: boolean;
  Label: string;
  Value: string;
}

interface RolesAndSkills {
  Id: number;
  Name: string;
}

interface UserData {
  employeeNumber: string;
  firstName: string;
  middleName: string;
  lastName: string;
  location: string;
}

export type { EmploymentDetails, UserData, RolesAndSkills};
