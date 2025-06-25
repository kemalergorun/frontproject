"use server";

import { errorObject } from "@/utils/functions/error-object";
import { trimFormDataFields } from "@/utils/functions/trim-form-data-fields";
import moment from "moment";
import { createStudent, createTeacher } from "./create-student.action";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createTeacherSchema } from "@/utils/validations/create-teacher-schema";
import { createStudentSchema } from "@/utils/validations/create-student-schema";

export const createStudentFormAction = async (state, formData) => {
  const trimmedData = trimFormDataFields(formData);

  const validationResult = createStudentSchema.safeParse(trimmedData);

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const payload = {
    ...validationResult.data,
    birthDay: moment(validationResult.data.birthDay).format("YYYY-MM-DD"),
    isAdvisorTeacher: updatedData.isAdvisorTeacher,
  };

  let check;

  try {
    const response = await createStudent(payload);

    console.log(response);
    if (!response.ok) return errorObject("Failed to create Student.");

    check = true;

    const data = await response.json();

    return {
      status: "success",
      message: "Student created successfully.",
    };
  } catch (error) {
    return errorObject("There was an error creating the student.");
  } finally {
    if (!check) return;
    revalidatePath("/dashboard/manage/student");
    redirect("/dashboard/manage/student");
  }
};
