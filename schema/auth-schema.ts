import * as z from "zod";

export const signup_validation_schema = z.object({
  name: z
    .string("name is required")
    .trim()
    .min(1, "Too short!")
    .max(255, "Too song!"),
  email: z
    .email("email is required")
    .toLowerCase()
    .min(1, "Too short!")
    .max(255, "Too long!"),
  password: z
    .string("password is required")
    .trim()
    .min(5, "Minimum of 5 characters")
    .max(255, "Too long!"),
});

export type TSignUpValidatonSchema = z.infer<typeof signup_validation_schema>;

export const login_validation_schema = z.object({
  email: z
    .email("email is required")
    .toLowerCase()
    .min(1, "Too short!")
    .max(255, "Too long!"),
  password: z
    .string("password is required")
    .trim()
    .min(5, "Minimum of 5 characters")
    .max(255, "Too long!"),
});

export type TLoginValidationSchema = z.infer<typeof login_validation_schema>;
