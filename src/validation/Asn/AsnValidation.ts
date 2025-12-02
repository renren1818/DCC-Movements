import { z } from "zod";

const PurchaseOrderValidation = z.object({
  PODetailIds: z.union([z.string(), z.number()]),
  PurchaseOrderNumber: z.number().min(1, "Purchase Order Number is required"),
  SKU: z.string().min(1, "SKU is required"),
  ItemName: z.string().min(1, "Item name is required"),
});

export const AsnValidation = z.object({
  AsnNumber: z.string().min(3, "Asn Number is required"),
  ContainerNumber: z.string().min(3, "Container Number is required"),
  PurchaseOrder: z
    .array(PurchaseOrderValidation)
    .min(1, "At least one Purchase Order is required"),
  filteredItems: z.array(PurchaseOrderValidation).optional(),
  selected: z.array(z.string()).optional(),
});
