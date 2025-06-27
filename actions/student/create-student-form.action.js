"use server";

import { errorObject } from "@/utils/functions/error-object";
import { trimFormDataFields } from "@/utils/functions/trim-form-data-fields";
import moment from "moment";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createStudentSchema } from "@/utils/validations/create-student-schema";
import { createStudent } from "./create-student.action";

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
  };

  let check;

  try {
    const response = await createStudent(payload);

    const data = await response.json();

    if (!response.ok) return errorObject("Failed to create student.", data);

    check = true;

    return {
      status: "success",
      message: "Student created successfully!",
    };
  } catch (error) {
    return errorObject("There was an error creating the student.");
  } finally {
    if (!check) return;
    revalidatePath("/dashboard/manage/student");
    redirect("/dashboard/manage/student");
  }
};
