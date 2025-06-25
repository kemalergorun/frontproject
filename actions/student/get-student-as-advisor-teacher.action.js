"use server";

import { auth } from "@/auth";
import { errorObject } from "@/utils/functions/error-object";

/**
 *
 * Get your own students as a user with "TEACHER" role
 *
 * @returns {Promise<Response>} A promise that resolves to the Response object from the fetch API call
 *
 */

export const getStudentsAsAdvisorTeacher = async () => {
  const session = await auth();

  try {
    const response = await fetch(
      `${process.env.BASE_API_URL}/students/getAllByAdvisor`,
      {
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
      }
    );

    if (!response.ok)
      return errorObject(
        "Failed to get the the student information for advisor teacher"
      );

    const data = await response.json();
    return data;
  } catch (error) {
    return errorObject(
      "There was an error getting the the student information for advisor teacher"
    );
  }
};
