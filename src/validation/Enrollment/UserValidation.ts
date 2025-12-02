import z from "zod";

export const AddUpdateUserSchema = z.object({
  UserId: z.coerce.number().int().nonnegative().optional(),

  EmployeeNumber: z.string().min(1, "Employee Number is required"),

  FirstName: z.string().min(1, "First Name is required"),
  LastName: z.string().min(1, "Last Name is required"),
  MiddleName: z.string().optional(),

  LocationId: z.coerce.number().int().min(1, "Location is required"),
  TeamId: z.coerce.number().int().min(1, "Team is required"),
  DesignationId: z.coerce.number().int().min(1, "Designation is required"),

  SkillIds: z.array(z.coerce.number().int()).min(1, "At least one skill must be selected"),
  RoleIds: z.array(z.coerce.number().int()).min(1, "At least one role must be selected"),

  ActiveStatus: z.boolean().default(true),
  IsLogIn: z.boolean().default(false),
  IsPasswordReset: z.boolean().default(false),
});
