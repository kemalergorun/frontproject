"use server";

import { auth } from "@/auth";
import { errorObject } from "@/utils/functions/error-object";

export const getStudentInformationByPageAsAdmin = async ({
  page = 0,
  size = 20,
}) => {
  const session = await auth();

  try {
    const response = await fetch(
      `${process.env.BASE_API_URL}/studentInfo/getAllForAdmin?page=${page}&size=${size}`,
      {
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
      }
    );

    if (!response.ok) return errorObject("Failed to get student information.");

    const data = await response.json();
    return data;
  } catch (error) {
    return errorObject("There was an error getting the student information.");
  }
};
