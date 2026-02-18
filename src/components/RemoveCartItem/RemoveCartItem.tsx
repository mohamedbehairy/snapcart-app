"use client";

import { RemoveCartItemAction } from "@/actions/CartActions.action";
import { CartResponse } from "@/interfaces/CartInterfaces";
import { Loader2, Trash2 } from "lucide-react";
import { SetStateAction, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

export default function RemoveCartItem({
  setCartData,
  productId,
}: {
  setCartData: React.Dispatch<SetStateAction<CartResponse | null>>;
  productId: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  async function removeProduct() {
    try {
      setIsLoading(true);

      const { data, ok, status } = await RemoveCartItemAction(productId);
 
      if (ok) {
        dispatchEvent(
          new CustomEvent("cartUpdated", { detail: data.numOfCartItems }),
        );
        toast.success("Item removed", {
          description: "The product has been removed from your cart.",
          position: "top-center",
        });

        setCartData(data);

        return;
      }

      if (status === 401) {
        toast.error("Login required", {
          description: "Please log in to manage your cart items.",
          position: "top-center",
        });
        return;
      }

      toast.error("Unable to remove item", {
        description:
          data?.message || "Something went wrong while removing the item.",
        position: "top-center",
      });
    } catch (error) {
      console.error("Remove cart item error:", error);

      toast.error("Unexpected error", {
        description: "An unexpected error occurred. Please try again later.",
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="text-destructive hover:text-destructive hover:bg-destructive/10"
      onClick={() => {
        removeProduct();
      }}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-3 w-3 animate-spin" />
        </>
      ) : (
        <>
          <Trash2 className="h-3 w-3" />
        </>
      )}
    </Button>
  );
}
