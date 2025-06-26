"use server";

import { auth } from "@/auth";

export const createManager = async (payload) => {
  const session = await auth();

  console.log(payload);

  const response = await fetch(`${process.env.BASE_API_URL}/dean/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.token}`,
    },
    body: JSON.stringify(payload),
  });

  console.log(response);
  console.log(response?.error, response?.message);

  return response;
};
