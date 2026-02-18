"use client";

import { UpdateCartItemAction } from "@/actions/CartActions.action";
import { CartResponse } from "@/interfaces/CartInterfaces";
import { Loader2, Minus, Plus } from "lucide-react";
import { SetStateAction, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

export default function UpdateCartItem({
  setCartData,
  productId,
  count,
}: {
  setCartData: React.Dispatch<SetStateAction<CartResponse | null>>;
  productId: string;
  count: number;
}) {
  const [isLoading, setIsLoading] = useState(false);

  async function updateProduct(count: number) {
    try {
      setIsLoading(true);

      const { data, ok, status } = await UpdateCartItemAction(productId, count);
 
      if (ok) {
        toast.success("Quantity updated", {
          description: "Product quantity has been updated successfully.",
          position: "top-center",
        });

        setCartData(data);
        return;
      }

      if (status === 401) {
        toast.error("Authentication required", {
          description: "Please log in to update items in your cart.",
          position: "top-center",
        });
        return;
      }

      toast.error("Update failed", {
        description: data?.message || "Could not update the product quantity.",
        position: "top-center",
      });
    } catch (error) {
      console.error("Update cart item error:", error);

      toast.error("Something went wrong", {
        description: "Please try again in a moment.",
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Button
        size="icon"
        variant="outline"
        className="h-7 w-7"
        disabled={count <= 1 || isLoading}
        onClick={() => updateProduct(count - 1)}
      >
        <Minus />
      </Button>

      <span className="w-8 text-center text-sm font-medium">
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin mx-auto" />
        ) : (
          count
        )}
      </span>

      <Button
        size="icon"
        variant="outline"
        className="h-7 w-7"
        disabled={isLoading}
        onClick={() => updateProduct(count + 1)}
      >
        <Plus />
      </Button>
    </>
  );
}
