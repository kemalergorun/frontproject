"use server";

import { errorObject } from "@/utils/functions/error-object";
import { trimFormDataFields } from "@/utils/functions/trim-form-data-fields";
import { createAdminSchema } from "@/utils/validations/create-admin-schema";
import moment from "moment";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { updateManager } from "./update-manager.action";

export const updateManagerFormAction = async (state, formData) => {
  const trimmedData = trimFormDataFields(formData);
  const { userId } = trimmedData;
  const validationResult = createAdminSchema.safeParse(trimmedData);

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { confirmPassword, ...rest } = validationResult.data;

  const payload = {
    ...rest,
    birthDay: moment(validationResult.data.birthDay).format("YYYY-MM-DD"),
  };

  let check;

  try {
    const response = await updateManager(payload, userId);

    const data = await response.json();
    if (!response.ok) return errorObject("Failed to update manager.", data);

    check = true;

    return {
      status: "success",
      message: "manager updated successfully!",
    };
  } catch (error) {
    return errorObject("There was an error updating the manager.");
  } finally {
    if (!check) return;
    revalidatePath("/dashboard/manage/manager");
    redirect("/dashboard/manage/manager");
  }
};
