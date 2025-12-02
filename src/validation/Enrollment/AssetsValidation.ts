import z from "zod";
import { Dayjs } from "dayjs";

export const AddUpdateAssetsSchema = z.object({
  EquipmentId: z.number().optional(),

  Code: z.string().min(1, "Equipment code is required"),

  Name: z.string().min(1, "Equipment name is required"),

  EquipmentTypeId: z.number().min(1, "Please select an equipment type"),

  BuildingId: z.number().min(1, "Please select a location"),

  PurchaseDate: z
    .custom<Dayjs>((val) => val === null || val instanceof Object, {
      message: "Purchase date is required",
    })
    .refine((val) => val !== null, { message: "Purchase date is required" }),

  EquipmentStatus: z.enum(["working", "defective"], {
    message: "Please select equipment status",
  }),
});

export type AddUpdateAssetsInput = z.infer<typeof AddUpdateAssetsSchema>;