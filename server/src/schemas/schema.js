import { z } from "zod";

export function schemasServer() {
  const askSchema = z.object({
    messages: z.string().trim().min(1).max(1000),
  });

  const contactSchema = z.object({
    clientGuidelines: z.string().trim().min(1).max(5000),
  });

  const hexColor = z.string().regex(/^#[0-9a-fA-F]{6}$/);

  const chatStyleSchema = z.object({
    backgroundChat: hexColor,
    backgroundInsideChat: hexColor,
    chatTextColor: hexColor,
    chatWelcomeText: z.string().trim().min(1).max(500),
    chatTitle: z.string().trim().min(1).max(60),
  });

  return { askSchema, contactSchema, chatStyleSchema };
}
