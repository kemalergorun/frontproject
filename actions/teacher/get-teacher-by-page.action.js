"use server";

import { auth } from "@/auth";
import { errorObject } from "@/utils/functions/error-object";

export const getTeacherByPage = async ({
  page = 0,
  size = 6,
  sort = "name",
  type = "desc",
}) => {
  const session = await auth();

  try {
    const response = await fetch(
      `${process.env.BASE_API_URL}/teachers/search?page=${page}&size=${size}&sort=${sort}&type=${type}`,
      {
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
      }
    );

    if (!response.ok) return errorObject("Failed to get teachers.");

    const data = await response.json();
    return data;
  } catch (error) {
    return errorObject("There was an error getting the teachers.");
  }
};
