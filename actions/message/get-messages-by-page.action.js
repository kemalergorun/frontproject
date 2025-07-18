"use server";

import { auth } from "@/auth";
import { errorObject } from "@/utils/functions/error-object";

export const getMessagesByPage = async ({
  page = 0,
  size = 20,
  sort = "date",
  type = "desc",
}) => {
  const session = await auth();

  try {
    const response = await fetch(
      `${process.env.BASE_API_URL}/contactMessages/getAll?page=${page}&size=${size}&sort=${sort}&type=${type}`,
      {
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
      }
    );

    if (!response.ok) return errorObject("Failed to get messages.");

    const data = await response.json();
    return data;
  } catch (error) {
    return errorObject("There was an error getting the messages.");
  }
};
