import { z } from "zod";

export function schemasServer() {
  const askSchema = z.object({
    messages: z.string().trim().min(1).max(1000),
  });

  const contactSchema = z.object({
    clientGuidelines: z.string().trim().min(1).max(5000),
  });

  return { askSchema, contactSchema };
}
