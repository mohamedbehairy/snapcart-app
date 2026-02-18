import { authOptions } from "@/auth";
import Cart from "@/components/Cart/Cart";
import { Button } from "@/components/ui/button";
import { CartResponse } from "@/interfaces/CartInterfaces";
import { AlertTriangle } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function CartPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.token) {
    redirect("/login");
  }
  let cartData: CartResponse | null = null;

  try {
    const response = await fetch(`${process.env.API_URL}/api/v1/cart`, {
      headers: {
        token: session?.token,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (response.ok) {
      cartData = await response.json();
     }
  } catch (error) {
    console.error("Error fetching cart data:", error);
  }

  return (
    <>
      {cartData ? (
        <Cart data={cartData} />
      ) : (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="flex flex-col items-center text-center max-w-md">
            {/* Error Icon */}
            <div className="w-24 h-24 flex items-center justify-center rounded-full bg-destructive/10 mb-6">
              <AlertTriangle className="h-12 w-12 text-destructive" />
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>

            {/* Message */}
            <p className="text-muted-foreground mb-6">
              Failed to load your cart. Please check your connection or try
              again later.
            </p>

            {/* Optional Action */}
            <Button asChild>
              <a href="/cart">Try Again</a>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
