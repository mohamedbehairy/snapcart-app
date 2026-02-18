"use server";
import { authOptions } from "@/auth";
import { UpdateWishList } from "@/interfaces/WishListInterfaces";
import { getServerSession } from "next-auth";

export async function RemoveWishListAction(productId: string) {
  const session = await getServerSession(authOptions);

  //  User not logged in
  if (!session || !session.token) {
    return {
      data: {
        status: "fail",
        message: "You must be logged in to remove items to the wishlist.",
      } as UpdateWishList,
      ok: false,
      status: 401,
    };
  }

  try {
    const response = await fetch(
      `${process.env.API_URL}/api/v1/wishlist/${productId}`,
      {
        method: "DELETE",
        headers: {
          token: session.token,
          "Content-Type": "application/json",
        },
      },
    );

    const data: UpdateWishList = await response.json();

    return {
      data: data.data,
      ok: response.ok,
      status: response.status,
    };
  } catch (error) {
    return {
      data: {
        status: "error",
        message: "Server error while removing product to wishlist.",
      } as UpdateWishList,
      ok: false,
      status: 500,
    };
  }
}
export async function addToWishlistAction(productId: string) {
  const session = await getServerSession(authOptions);

  if (!session || !session.token) {
    return {
      data: [],
      message: "You must be logged in to add items to the wishlist.",
      ok: false,
      status: 401,
    };
  }

  try {
    const response = await fetch(`${process.env.API_URL}/api/v1/wishlist`, {
      method: "POST",
      body: JSON.stringify({ productId }),
      headers: {
        token: session.token,
        "Content-Type": "application/json",
      },
    });

    const result: UpdateWishList = await response.json();

    return {
      data: result.data,
      message: result.message,
      ok: response.ok,
      status: response.status,
    };
  } catch {
    return {
      data: [],
      message: "Server error while adding product to wishlist.",
      ok: false,
      status: 500,
    };
  }
}
export async function getWishlistAction() {
  const session = await getServerSession(authOptions);

  // User not logged in
  if (!session || !session.token) {
    return {
      data: [],
      ok: false,
      status: 401,
    };
  }

  try {
    const response = await fetch(`${process.env.API_URL}/api/v1/wishlist`, {
      headers: {
        token: session.token,
        "Content-Type": "application/json",
      },
      cache: "no-store",  
    });

    const result = await response.json();

    return {
      data: result?.data || [],
      ok: response.ok,
      status: response.status,
    };
  } catch (error) {
    return {
      data: [],
      ok: false,
      status: 500,
    };
  }
}
