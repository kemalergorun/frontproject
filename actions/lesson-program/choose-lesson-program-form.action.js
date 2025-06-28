"use server";

import { errorObject } from "@/utils/functions/error-object";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { chooseLessonProgramSchema } from "@/utils/validations/choose-lesson-program-schema";
import { chooseLessonProgram } from "./choose-lesson-program.action";

export const chooseLessonProgramFormAction = async (state, formData) => {
  const dataToValidate = {
    lessonProgramId: formData.get("lessonProgramId")
      ? formData.getAll("lessonProgramId")
      : [],
  };
  const validationResult = chooseLessonProgramSchema.safeParse(dataToValidate);

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  let check;

  try {
    const response = await chooseLessonProgram(validationResult.data);

    const data = await response.json();

    if (!response.ok) {
      errorObject("There was an error choosing the lesson program!", data);
    }

    check = true;

    return {
      status: "success",
      message: "Lesson program chosen successfully!",
    };
  } catch (error) {
    console.log(error);
    return errorObject("There was an error choosing the lesson program!");
  } finally {
    if (!check) return;
    revalidatePath("/dashboard/choose-lesson");
    redirect("/dashboard/choose-lesson");
  }
};
