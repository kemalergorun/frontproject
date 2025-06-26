"use server";

import { auth } from "@/auth";
import { errorObject } from "@/utils/functions/error-object";

export const getEducationTermsByPage = async ({
  page = 0,
  size = 6,
  sort = "startDate",
  type = "desc",
}) => {
  const session = await auth();

  try {
    const response = await fetch(
      `${process.env.BASE_API_URL}/educationTerms/search?page=${page}&size=${size}&sort=${sort}&type=${type}`,
      {
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
      }
    );

    if (!response.ok) return errorObject("Failed to get education terms.");

    const data = await response.json();
    return data;
  } catch (error) {
    return errorObject("There was an error getting the education terms.");
  }
};
