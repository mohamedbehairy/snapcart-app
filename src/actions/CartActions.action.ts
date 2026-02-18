"use server";

import { authOptions } from "@/auth";
import { CartResponse, ClearCartRes } from "@/interfaces/CartInterfaces";
import { getServerSession } from "next-auth";

export async function addToCartAction(productId: string) {
  const session = await getServerSession(authOptions);

  //  User not logged in
  if (!session || !session.token) {
    return {
      data: {
        status: "fail",
        message: "You must be logged in to add items to the cart.",
      } as CartResponse,
      ok: false,
      status: 401,
    };
  }

  try {
    const response = await fetch(`${process.env.API_URL}/api/v1/cart`, {
      method: "POST",
      body: JSON.stringify({ productId }),
      headers: {
        token: session.token,
        "Content-Type": "application/json",
      },
    });

    const data: CartResponse = await response.json();

    return {
      data,
      ok: response.ok,
      status: response.status,
    };
  } catch (error) {
    return {
      data: {
        status: "error",
        message: "Server error while adding product to cart.",
      } as CartResponse,
      ok: false,
      status: 500,
    };
  }
}
export async function ClearCartAction() {
  const session = await getServerSession(authOptions);

  // User not logged in
  if (!session || !session.token) {
    return {
      message: "You must be logged in to clear your cart.",
      success: false,
    } as ClearCartRes;
  }

  try {
    const response = await fetch(`${process.env.API_URL}/api/v1/cart`, {
      method: "DELETE",
      headers: {
        token: session.token,
        "Content-Type": "application/json",
      },
    });

    const data: ClearCartRes = await response.json();
    return data;
  } catch (error) {
    console.error("ClearCart error:", error);
    return error;
  }
}
export async function RemoveCartItemAction(productId: string) {
  const session = await getServerSession(authOptions);

  //  User not logged in
  if (!session || !session.token) {
    return {
      data: {
        status: "fail",
        message: "You must be logged in to add items to the cart.",
      } as CartResponse,
      ok: false,
      status: 401,
    };
  }

  try {
    const response = await fetch(
      `${process.env.API_URL}/api/v1/cart/${productId}`,
      {
        method: "DELETE",
        headers: {
          token: session.token,
          "Content-Type": "application/json",
        },
      },
    );

    const data: CartResponse = await response.json();

    return {
      data,
      ok: response.ok,
      status: response.status,
    };
  } catch (error) {
    return {
      data: {
        status: "error",
        message: "Server error while adding product to cart.",
      } as CartResponse,
      ok: false,
      status: 500,
    };
  }
}
export async function UpdateCartItemAction(productId: string, count: number) {
  const session = await getServerSession(authOptions);

  //  User not logged in
  if (!session || !session.token) {
    return {
      data: {
        status: "fail",
        message: "You must be logged in to add items to the cart.",
      } as CartResponse,
      ok: false,
      status: 401,
    };
  }

  try {
    const response = await fetch(
      `${process.env.API_URL}/api/v1/cart/${productId}`,
      {
        method: "PUT",
        body: JSON.stringify({ count }),
        headers: {
          token: session.token,
          "Content-Type": "application/json",
        },
      },
    );

    const data: CartResponse = await response.json();

    return {
      data,
      ok: response.ok,
      status: response.status,
    };
  } catch (error) {
    return {
      data: {
        status: "error",
        message: "Server error while updating count product.",
      } as CartResponse,
      ok: false,
      status: 500,
    };
  }
}

export async function getCartAction() {
  const session = await getServerSession(authOptions);

  //  User not logged in
  if (!session || !session.token) {
    return {
      data: {
        status: "fail",
        message: "You must be logged in to get cart items.",
      } as CartResponse,
      ok: false,
      status: 401,
    };
  }

  try {
    const response = await fetch(`${process.env.API_URL}/api/v1/cart`, {
      method: "GET",
      headers: {
        token: session.token,
        "Content-Type": "application/json",
      },
    });

    const data: CartResponse = await response.json();

    return {
      data,
      ok: response.ok,
      status: response.status,
    };
  } catch (error) {
    return {
      data: {
        status: "error",
        message: "Server error while getting cart items.",
      } as CartResponse,
      ok: false,
      status: 500,
    };
  }
}
