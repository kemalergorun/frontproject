"use server";

import { auth } from "@/auth";

export const updateAssistantManager = async (payload, id) => {
  const session = await auth();

  const response = await fetch(
    `${process.env.BASE_API_URL}/vicedean/update/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },
      body: JSON.stringify(payload),
    }
  );

  return response;
};
