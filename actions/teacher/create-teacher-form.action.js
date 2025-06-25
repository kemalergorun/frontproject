"use server";

import { errorObject } from "@/utils/functions/error-object";
import { trimFormDataFields } from "@/utils/functions/trim-form-data-fields";
import { createAdminSchema } from "@/utils/validations/create-admin-schema";
import moment from "moment";
import { createManager, createTeacher } from "./create-teacher.action";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createTeacherSchema } from "@/utils/validations/create-teacher-schema";

export const createTeacherFormAction = async (state, formData) => {
  const trimmedData = trimFormDataFields(formData);

  const updatedData = {
    ...trimmedData,
    isAdvisorTeacher: trimmedData.isAdvisorTeacher === "on" ? true : false,
    lessonsIdList: trimmedData.lessonsIdList
      ? trimmedData.lessonsIdList.split(",")
      : [],
  };

  const validationResult = createTeacherSchema.safeParse(trimmedData);

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { confirmPassword, birthDay, ...rest } = validationResult.data;

  const payload = {
    ...rest,
    birthDay: moment(validationResult.data.birthDay).format("YYYY-MM-DD"),
    isAdvisorTeacher: updatedData.isAdvisorTeacher,
  };

  let check;

  try {
    const response = await createTeacher(payload);

    console.log(response);
    if (!response.ok) return errorObject("Failed to create Teacher.");

    check = true;

    const data = await response.json();

    return {
      status: "success",
      message: "Teacher created successfully.",
    };
  } catch (error) {
    return errorObject("There was an error creating the teacher.");
  } finally {
    if (!check) return;
    revalidatePath("/dashboard/manage/teacher");
    redirect("/dashboard/manage/teacher");
  }
};
