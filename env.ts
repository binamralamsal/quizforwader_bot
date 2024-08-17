import { StringSession } from "telegram/sessions";
import { z } from "zod";

export const env = z
  .object({
    API_ID: z.coerce.number({ message: "API_ID is required" }),
    API_HASH: z.string().min(1, "API_HASH is required"),
    STRING_SESSION: z
      .string()
      .min(1, "STRING_SESSION is required")
      .transform((value) => new StringSession(value)),
    NODE_ENV: z.enum(["development", "production"]).default("development"),
  })
  .parse(process.env);
