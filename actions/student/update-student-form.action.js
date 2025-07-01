"use server";

import { errorObject } from "@/utils/functions/error-object";
import { trimFormDataFields } from "@/utils/functions/trim-form-data-fields";
import moment from "moment";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { updateStudent, updateTeacher } from "./update-student.action";
import { createTeacherSchema } from "@/utils/validations/create-teacher-schema";
import { createStudentSchema } from "@/utils/validations/create-student-schema";

export const updateStudentFormAction = async (state, formData) => {
  const trimmedData = trimFormDataFields(formData);
  const { id } = trimmedData;

  const validationResult = createStudentSchema.safeParse(trimmedData);

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
    const response = await updateStudent(payload, id);

    
    if (!response.ok) return errorObject("Failed to update Student.", data);

    check = true;

    return {
      status: "success",
      message: "Student updated successfully!",
    };
  } catch (error) {
    return errorObject("There was an error updating the student.");
  } finally {
    if (!check) return;
    revalidatePath("/dashboard/manage/student");
    redirect("/dashboard/manage/student");
  }
};
