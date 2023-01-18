import { z } from "zod";

export const userSchema = z.object({
  userName: z.string(),
  userId: z.string(),
  access_token: z.string(),
});

export type TUser = z.infer<typeof userSchema>;
