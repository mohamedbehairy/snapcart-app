import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .nonempty("Full name is required")
      .min(3, "Full name must be at least 3 characters long")
      .max(50, "Full name must not exceed 50 characters"),

    email: z
      .string()
      .trim()
      .nonempty("Email is required")
      .regex(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address (e.g. name@example.com)",
      ),

    phone: z
      .string()
      .trim()
      .nonempty("Phone number is required")
      .regex(
        /^01[0-2,5]\d{8}$/,
        "Please enter a valid Egyptian phone number (e.g. 01XXXXXXXXX)",
      ),

    password: z
      .string()
      .nonempty("Password is required")
      .min(6, "Password must be at least 6 characters long")
      .max(100, "Password must not exceed 100 characters"),

    rePassword: z.string().nonempty("Please confirm your password"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
