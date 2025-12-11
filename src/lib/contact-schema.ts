import { z } from 'zod';
export const ContactSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  message: z.string().min(10).max(2000)
});
export type ContactInput = z.infer<typeof ContactSchema>;
