"use client";

import { addToCartAction } from "@/actions/CartActions.action";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2, ShoppingCartIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface AddToCartProps {
  productId: string;
  disabled?: boolean;
  className?: string;
  variant?: "default" | "destructive" | "secondary";
  size?: "default" | "sm" | "lg";
  children?: React.ReactNode;
}

export default function AddToCart({
  productId,
  disabled,
  className,
  variant = "default",
  size = "default",
  children,
}: AddToCartProps) {
  const [loading, setLoading] = useState(false);

  async function addToCart(productId: string) {
    try {
      setLoading(true);

      const { data, ok, status } = await addToCartAction(productId);
 
      if (ok) {
        dispatchEvent(
          new CustomEvent("cartUpdated", { detail: data.numOfCartItems }),
        );

        toast.success("Product added to cart", {
          description: data.message || "Item added successfully",
          position: "top-center",
        });
        return;
      }

      //  Not authenticated
      if (status === 401) {
        toast.error("Login required", {
          description: "Please login first to add products to your cart",
          position: "top-center",
        });
        return;
      }

      //  Any other error
      toast.error("Failed to add product", {
        description: data.message || "Something went wrong",
        position: "top-center",
      });
    } catch (error) {
      console.error("Add to cart error:", error);

      toast.error("Unexpected error", {
        description: "Please try again later",
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      onClick={() => addToCart(productId)}
      disabled={disabled || loading}
      variant={variant}
      size={size}
      className={cn("gap-2", className)}
    >
      {loading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <ShoppingCartIcon size={16} />
      )}

      {loading ? "Adding..." : (children ?? "Add to Cart")}
    </Button>
  );
}
