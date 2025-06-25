import { z } from "zod";
import { lowercaseRegex } from "@/utils/regex/lowercase-regex";
import { uppercaseRegex } from "@/utils/regex/uppercase-regex";
import { numbersRegex } from "@/utils/regex/numbers-regex";
import { phoneRegex } from "@/utils/regex/phone-regex";
import { ssnRegex } from "@/utils/regex/ssn-regex";

export const createTeacherSchema = z
  .object({
    birthDay: z.coerce
      .date()
      .min(new Date(1925, 1, 1), {
        message: "You have to be younger than 100 years old to register.",
      })
      .max(new Date(2004, 1, 1), {
        message: "You have to be older than 20 years old to register.",
      }),
    birthPlace: z
      .string()
      .min(1, { message: "Birth place is required." })
      .max(16, { message: "Birth place is too long." }),
    gender: z.string().min(1, { message: "Please select a gender." }),
    name: z.string().min(1, { message: "First name is required." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 character." })
      .max(60, { message: "Password is too long." })
      .regex(lowercaseRegex, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(uppercaseRegex, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(numbersRegex, {
        message: "Password must contain at least one number.",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required." }),
    phoneNumber: z
      .string()
      .min(1, { message: "Phone number is required." })
      .regex(phoneRegex, { message: "Invalid phone number" }),
    ssn: z
      .string()
      .min(1, { message: "SSN is required." })
      .regex(ssnRegex, { message: "Invalid SSN" }),
    surname: z.string().min(1, { message: "Last name is required." }),
    username: z
      .string()
      .min(4, { message: "Username must be at least 4 characters long." })
      .max(16, { message: "Username is too long" }),
    email: z
      .string()
      .email({ message: "Invalid e-mail" })
      .min(1, { message: "E-mail is required." }),
    lessonsIdList: z
      .string()
      .array()
      .nonempty({ message: "Select at least one lesson program" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords are not matched",
    path: ["confirmPassword"],
  });
