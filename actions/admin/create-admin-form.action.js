"use server";

import { errorObject } from "@/utils/functions/error-object";
import { trimFormDataFields } from "@/utils/functions/trim-form-data-fields";
import { createAdminSchema } from "@/utils/validations/create-admin-schema";
import moment from "moment";
import { createAdmin } from "./create-admin.action";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createAdminFormAction = async (state, formData) => {
  const trimmedData = trimFormDataFields(formData);

  const validationResult = createAdminSchema.safeParse(trimmedData);

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const payload = {
    ...validationResult.data,
    birthDay: moment(validationResult.data.birthDay).format("YYYY-MM-DD"),
  };



  let check;

  try {
    const response = await createAdmin(payload);

    if (!response.ok) return errorObject("Failed to create admin.");

    check = true;

    const data = await response.json();

    return {
      status: "success",
      message: "Admin created successfully.",
    };
  } catch (error) {
    return errorObject("There was an error creating the admin.");
  } finally {
    if (!check) return;
    revalidatePath("/dashboard/manage/admin");
    redirect("/dashboard/manage/admin");
  }
};
