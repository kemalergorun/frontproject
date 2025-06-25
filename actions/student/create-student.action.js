"use server";

import { auth } from "@/auth";

export const createStudent = async (payload) => {
  const session = await auth();

  const response = await fetch(`${process.env.BASE_API_URL}/student/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.token}`,
    },
    body: JSON.stringify(payload),
  });

  return response;
};
