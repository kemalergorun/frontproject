"use server";

import { signIn } from "@/auth";
import { trimFormDataFields } from "@/utils/functions/trim-form-data-fields";
import { loginSchema } from "@/utils/validations/login-schema";
import { AuthError } from "next-auth";

export const loginFormAction = async (state, formData) => {
  const trimmedData = trimFormDataFields(formData);
  const validationResult = loginSchema.safeParse(trimmedData);

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { password, username } = validationResult.data;

  try {
    await signIn("credentials", {
      password,
      username,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if (
        error.type === "CredentialsSignin" ||
        error.type === "CallbackRouteError"
      ) {
        return {
          errors: { common: "Invalid username or password" },
        };
      } else {
        return {
          errors: {
            common: "An error occurred! Please try again!",
          },
        };
      }
    }
    throw error;
  }
};
