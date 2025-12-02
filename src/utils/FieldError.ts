import { z } from "zod";

export const FieldError = (issues: z.core.$ZodIssue[]) => {
  const errorMap: Record<string, string> = {};

  for (const issue of issues) {
    const key = issue.path.join(".");
    errorMap[key] = issue.message;
  }

  return errorMap;
};
