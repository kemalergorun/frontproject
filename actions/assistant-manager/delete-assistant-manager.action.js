"use server";

import { auth } from "@/auth";
import { errorObject } from "@/utils/functions/error-object";
import { revalidatePath } from "next/cache";

/**
 * Delete an assistant manager as a user with "ADMIN" role
 * @param {*} id
 * @returns
 */

export const deleteAssistantManager = async (id) => {
  if (!id) return errorObject("No ID provided");

  const session = await auth();

  let check = false;

  try {
    const response = await fetch(
      `${process.env.BASE_API_URL}/vicedean/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      }
    );

    if (!response.ok) return errorObject("Failed to delete admin.");

    check = true;

    return {
      status: "success",
      message: "Assistant Manager deleted successfully.",
    };
  } catch (error) {
    return errorObject("There was an error deleting the Assistant Manager.");
  } finally {
    if (!check) return;
    revalidatePath("/dashboard/manage/assistant-manager");
  }
};
