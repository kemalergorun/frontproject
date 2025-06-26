"use server";

import { errorObject } from "@/utils/functions/error-object";
import { trimFormDataFields } from "@/utils/functions/trim-form-data-fields";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createLessonProgramSchema } from "@/utils/validations/create-lesson-program-schema";
import { createLessonProgram } from "./create-lesson-program.action";

export const createLessonProgramFormAction = async (state, formData) => {
  const trimmedData = trimFormDataFields(formData);

  const updatedFormData = {
    ...trimmedData,
    lessonIdList: trimmedData.lessonIdList
      ? [...trimmedData.lessonIdList.split(",")]
      : [],
  };

  const validationResult = createLessonProgramSchema.safeParse(updatedFormData);

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  console.log(validationResult);

  let check;

  try {
    const response = await createLessonProgram(validationResult.data);

    const data = await response.json();

    if (!response.ok) {
      errorObject("There was an error creating the lesson program!", data);
    }

    check = true;

    return {
      status: "success",
      message: "Lesson program created successfully!",
    };
  } catch (error) {
    console.log(error);
    return errorObject("There was an error creating the lesson program!");
  } finally {
    if (!check) return;
    revalidatePath("/dashboard/manage/lesson-program");
    redirect("/dashboard/manage/lesson-program");
  }
};
