"use server";

import { errorObject } from "@/utils/functions/error-object";
import { trimFormDataFields } from "@/utils/functions/trim-form-data-fields";
import moment from "moment";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { updateTeacher } from "./update-teacher.action";
import { createTeacherSchema } from "@/utils/validations/create-teacher-schema";

export const updateTeacherFormAction = async (state, formData) => {
  const trimmedData = trimFormDataFields(formData);
  console.log(trimmedData);
  const { id } = trimmedData;

  const updatedData = {
    ...trimmedData,
    isAdvisorTeacher: trimmedData.isAdvisorTeacher === "on" ? true : false,
    lessonsIdList: trimmedData.lessonsIdList
      ? trimmedData.lessonsIdList.split(",")
      : [],
  };

  const validationResult = createTeacherSchema.safeParse(updatedData);

  console.log(validationResult);

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
    const response = await updateTeacher(payload, id);

    console.log(response);
    if (!response.ok) return errorObject("Failed to update Teacher.", data);

    check = true;

    return {
      status: "success",
      message: "Teacher updated successfully!",
    };
  } catch (error) {
    return errorObject("There was an error updating the teacher.");
  } finally {
    if (!check) return;
    revalidatePath("/dashboard/manage/teacher");
    redirect("/dashboard/manage/teacher");
  }
};
