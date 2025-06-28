"use server";

import { errorObject } from "@/utils/functions/error-object";
import { trimFormDataFields } from "@/utils/functions/trim-form-data-fields";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { updateStudentInformation } from "./update-student-information.action";
import { createStudentInformationSchema } from "@/utils/validations/create-student-information-schema";

export const updateStudentInformationFormAction = async (state, formData) => {
  const trimmedData = trimFormDataFields(formData);
  const { id } = trimmedData;

  const dataToValidate = {
    ...trimmedData,
    absentee: +trimmedData.absentee,
    finalExam: +trimmedData.finalExam,
    midtermExam: +trimmedData.midtermExam,
  };

  const validationResult =
    createStudentInformationSchema.safeParse(dataToValidate);

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  let check;

  try {
    const response = await updateStudentInformation(validationResult.data, id);

    if (!response.ok)
      return errorObject("Failed to update Student information.", data);

    check = true;

    return {
      status: "success",
      message: "Student information updated successfully!",
    };
  } catch (error) {
    return errorObject("There was an error updating the student information.");
  } finally {
    if (!check) return;
    revalidatePath("/dashboard/manage/student-information");
    redirect("/dashboard/manage/student-information");
  }
};
