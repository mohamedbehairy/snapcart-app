"use server";

import { authOptions } from "@/auth";
import {
  CashOrderResponse,
  ShippingAddress,
  VisaOrderResponse,
} from "@/interfaces/OrdersInterfaces";

import { getServerSession } from "next-auth";

export async function createCashOrderAction(
  cartId: string,
  shippingAddress: ShippingAddress,
) {
  const session = await getServerSession(authOptions);

  // User not logged in
  if (!session || !session.token) {
    return {
      data: {
        status: "fail",
        message: "You must be logged in to place an order.",
      } as CashOrderResponse,
      ok: false,
      status: 401,
    };
  }

  try {
    const response = await fetch(
      `${process.env.API_URL}/api/v1/orders/${cartId}`,
      {
        method: "POST",
        headers: {
          token: session.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shippingAddress }),
        cache: "no-store",
      },
    );

    const data: CashOrderResponse = await response.json();

    return {
      data,
      ok: response.ok,
      status: response.status,
    };
  } catch (error) {
    console.error("Cash order error:", error);
    return {
      data: {
        status: "error",
        message: "Server error while creating cash order.",
      } as CashOrderResponse,
      ok: false,
      status: 500,
    };
  }
}

export async function createVisaOrderAction(
  cartId: string,
  shippingAddress: ShippingAddress,
) {
  const session = await getServerSession(authOptions);

  // User not logged in
  if (!session || !session.token) {
    return {
      data: {
        status: "fail",
        message: "You must be logged in to place an order.",
      } as VisaOrderResponse,
      ok: false,
      status: 401,
    };
  }

  try {
    const response = await fetch(
      `${process.env.API_URL}/api/v1/orders/checkout-session/${cartId}?url=https://snapcart-omega.vercel.app`,
      {
        method: "POST",
        headers: {
          token: session.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shippingAddress }),
        cache: "no-store",
      },
    );

    const data: VisaOrderResponse = await response.json();

    return {
      data,
      ok: response.ok,
      status: response.status,
    };
  } catch (error) {
    console.error("Visa order error:", error);
    return {
      data: {
        status: "error",
        message: "Server error while creating visa order.",
      } as VisaOrderResponse,
      ok: false,
      status: 500,
    };
  }
}

export async function fetchOrdersAction(userId: string, token: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/orders/user/${userId}`,
      {
        method: "GET",
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      },
    );

    if (response.ok) {
      const data = await response.json();
      return {
        data: { data },
        ok: true,
        status: response.status,
      };
    } else {
      const errorData = await response.json();
      return {
        data: errorData,
        ok: false,
        status: response.status,
      };
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    return {
      data: { status: "error", message: "Server error while fetching orders." },
      ok: false,
      status: 500,
    };
  }
}
