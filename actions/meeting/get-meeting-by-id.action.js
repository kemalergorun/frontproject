"use server";

import { auth } from "@/auth";
import { errorObject } from "@/utils/functions/error-object";

export const getMeetingById = async (id) => {
  const session = await auth();

  try {
    const response = await fetch(
      `${process.env.BASE_API_URL}/meet/getMeetById/${id}`,
      {
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
      }
    );

    if (!response.ok) return errorObject("Failed to get the meeting.");

    const data = await response.json();
    return data;
  } catch (error) {
    return errorObject("There was an error getting the meeting.");
  }
};
