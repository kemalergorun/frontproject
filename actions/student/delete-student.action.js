"use server";

import { auth } from "@/auth";
import { errorObject } from "@/utils/functions/error-object";
import { revalidatePath } from "next/cache";

export const deleteStudent = async (id) => {
  if (!id) return errorObject("No ID provided");

  const session = await auth();

  let check = false;

  try {
    const response = await fetch(
      `${process.env.BASE_API_URL}/students/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      }
    );

    if (!response.ok) return errorObject("Failed to delete Student.");

    check = true;

    return {
      status: "success",
      message: "Student deleted successfully.",
    };
  } catch (error) {
    return errorObject("There was an error deleting the student.");
  } finally {
    if (!check) return;
    revalidatePath("/dashboard/manage/student");
  }
};
