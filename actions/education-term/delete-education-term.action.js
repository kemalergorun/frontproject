"use server";

import { auth } from "@/auth";
import { errorObject } from "@/utils/functions/error-object";
import { revalidatePath } from "next/cache";

export const deleteEducationTerm = async (id) => {
  if (!id) return errorObject("No ID provided");

  const session = await auth();

  let check = false;

  try {
    const response = await fetch(
      `${process.env.BASE_API_URL}/educationTerms/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      }
    );

    if (!response.ok) return errorObject("Failed to delete Education Term.");

    check = true;

    return {
      status: "success",
      message: "Education Term deleted successfully.",
    };
  } catch (error) {
    return errorObject("There was an error deleting the education-term.");
  } finally {
    if (!check) return;
    revalidatePath("/dashboard/manage/education-term");
  }
};
