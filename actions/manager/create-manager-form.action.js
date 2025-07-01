"use server";

import { errorObject } from "@/utils/functions/error-object";
import { trimFormDataFields } from "@/utils/functions/trim-form-data-fields";
import { createAdminSchema } from "@/utils/validations/create-admin-schema";
import moment from "moment";
import { createManager } from "./create-manager.action";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createManagerFormAction = async (state, formData) => {
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
    const response = await createManager(payload);

    if (!response.ok) return errorObject("Failed to create Manager.");

    check = true;

    const data = await response.json();

    return {
      status: "success",
      message: "Manager created successfully.",
    };
  } catch (error) {
    return errorObject("There was an error creating the manager.");
  } finally {
    if (!check) return;
    revalidatePath("/dashboard/manage/manager");
    redirect("/dashboard/manage/manager");
  }
};
