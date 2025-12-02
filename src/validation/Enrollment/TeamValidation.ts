import { z } from "zod";

export const AddUpdateTeamSchema = z.object({
  TeamId: z.number().optional(), // not required

  Name: z.string().min(1, { message: "Please enter a team name" }),

  ColorCode: z
    .string()
    .regex(/^#([0-9A-Fa-f]{6})$/, {
      message: "Color must be a valid hex code (e.g. #FF0000)",
    }),

  Area: z.string().min(1, { message: "Please enter an area" }),

  LocationId: z.number().min(1, { message: "Please select a location" }),

  ScheduleDateId: z.number().min(1, { message: "Please select a schedule" }),

  SecretaryId: z.number().optional(), // not required
});

export type AddUpdateTeamInput = z.infer<typeof AddUpdateTeamSchema>;