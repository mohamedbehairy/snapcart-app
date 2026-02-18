// actions/UpdateProfileAction.ts
"use server";

import { authOptions } from "@/auth";
import { EditResponse } from "@/interfaces/ProfileInterfaces";
import { getServerSession } from "next-auth";

export async function UpdateProfileAction(
  name: string,
  email: string,
  phone: string,
) {
  const session = await getServerSession(authOptions);

  // User not logged in
  if (!session?.token) {
    return {
      data: {
        statusMsg: "fail",
        message: "You must be logged in.",
      } as EditResponse,
      ok: false,
      status: 401,
    };
  }

  const response = await fetch(`${process.env.API_URL}/api/v1/users/updateMe`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: session.token,
    },
    body: JSON.stringify({ name, email, phone }),
  });

  const data: EditResponse = await response.json();

  return {
    data,
    ok: response.ok,
    status: response.status,
  };
}

export async function ChangePasswordAction(
  currentPassword: string,
  password: string,
  rePassword: string,
) {
  const session = await getServerSession(authOptions);

  // User not logged in
  if (!session?.token) {
    return {
      data: {
        statusMsg: "fail",
        message: "You must be logged in.",
      } as EditResponse,
      ok: false,
      status: 401,
    };
  }

  const response = await fetch(
    `${process.env.API_URL}/api/v1/users/changeMyPassword`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: session.token,
      },
      body: JSON.stringify({
        currentPassword,
        password,
        rePassword,
      }),
    },
  );

  const data: EditResponse = await response.json();

  return {
    data,
    ok: response.ok,
    status: response.status,
  };
}

export async function AddAddressAction(
  name: string,
  details: string,
  phone: string,
  city: string,
) {
  const session = await getServerSession(authOptions);

  if (!session?.token) {
    return {
      ok: false,
      status: 401,
      data: { message: "You must be logged in." },
    };
  }

  const response = await fetch(`${process.env.API_URL}/api/v1/addresses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: session.token,
    },
    body: JSON.stringify({
      name,
      details,
      phone,
      city,
    }),
  });

  const data = await response.json();

  return {
    ok: response.ok,
    status: response.status,
    data,
  };
}

export async function DeleteAddressAction(addressId: string) {
  const session = await getServerSession(authOptions);

  if (!session?.token) {
    return {
      ok: false,
      status: 401,
      data: { message: "You must be logged in." },
    };
  }

  try {
    const response = await fetch(
      `${process.env.API_URL}/api/v1/addresses/${addressId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: session.token,
        },
      },
    );

    const data = await response.json();

    return {
      ok: response.ok,
      status: response.status,
      data,
    };
  } catch (error) {
    console.error("Delete address error:", error);
    return {
      ok: false,
      status: 500,
      data: { message: "Network error" },
    };
  }
}
