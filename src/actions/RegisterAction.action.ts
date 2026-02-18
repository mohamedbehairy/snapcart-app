"use server";

import { FailedResponse, SuccessResponse } from "@/interfaces/AuthInterfaces";
import { RegisterFormData } from "@/schemas/register.schema";

export async function RegisterAction(data: RegisterFormData) {
  const response = await fetch(`${process.env.API_URL}/api/v1/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const payload: SuccessResponse | FailedResponse = await response.json();
 
  return {
    ok: response.ok,
    status: response.status,
    payload,
  };
}
