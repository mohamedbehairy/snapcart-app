"use server";

import { ForgotPassRes } from "@/interfaces/ForgotPasswordInterfaces";

export async function ForgotPassAction(email: string) {
  const response = await fetch(
    `${process.env.API_URL}/api/v1/auth/forgotPasswords`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    },
  );
  const payload: ForgotPassRes = await response.json();

  return {
    ok: response.ok,
    payload,
  };
}

export async function VerifyCodeAction(resetCode: string) {
  const response = await fetch(
    `${process.env.API_URL}/api/v1/auth/verifyResetCode`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resetCode }),
    },
  );
  const payload: ForgotPassRes = await response.json();

  return {
    ok: response.ok,
    payload,
  };
}

export async function ResetPassAction(email: string, newPassword: string) {
  const response = await fetch(
    `${process.env.API_URL}/api/v1/auth/resetPassword`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, newPassword }),
    },
  );
  const payload: ForgotPassRes = await response.json();

  return {
    ok: response.ok,
    payload,
  };
}
