import { z } from "zod";

export function schemasServer() {
  const askSchema = z.object({
    messages: z.string().trim().min(1).max(1000),
  });

  const contactSchema = z.object({
    clientGuidelines: z.string().trim().min(1).max(5000),
  });

  const hexColor = z.string().regex(/^#[0-9a-fA-F]{6}$/);

  // Logos are resized in the browser before upload, so 150k characters
  // (about 110 KB) is plenty for a chat header image.
  const logoDataUrl = z
    .string()
    .max(150_000)
    .regex(/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/]+={0,2}$/);

  const chatStyleSchema = z
    .object({
      backgroundChat: hexColor,
      backgroundInsideChat: hexColor,
      chatTextColor: hexColor,
      chatWelcomeText: z.string().trim().min(1).max(500),
      chatTitle: z.string().trim().min(1).max(60),
      chatHeaderType: z.enum(["text", "logo"]),
      chatLogo: z.union([z.literal(""), logoDataUrl]),
    })
    .refine((style) => style.chatHeaderType === "text" || style.chatLogo, {
      message: "Logo is required when the header shows a logo",
      path: ["chatLogo"],
    });

  return { askSchema, contactSchema, chatStyleSchema };
}
