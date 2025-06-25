"use server";

import { auth } from "@/auth";

export const updateTeacher = async (payload, id) => {
  const session = await auth();

  const response = await fetch(
    `${process.env.BASE_API_URL}/teachers/update/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      },
      body: JSON.stringify(payload),
    }
  );

  return response;
};
