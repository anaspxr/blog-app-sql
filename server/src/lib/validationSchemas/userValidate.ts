import { z } from "zod";

export const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const registerSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(4),
  image: z.string().optional(),
});
