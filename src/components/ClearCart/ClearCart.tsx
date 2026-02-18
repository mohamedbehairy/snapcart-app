"use client";
import { ClearCartAction } from "@/actions/CartActions.action";
import { CartResponse, ClearCartRes } from "@/interfaces/CartInterfaces";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { SetStateAction, useState } from "react";

export default function ClearCart({
  setCartData,
}: {
  setCartData: React.Dispatch<SetStateAction<CartResponse | null>>;
}) {
  const [isLoading, setIsLoading] = useState(false);

  async function clearBtn() {
    try {
      setIsLoading(true);
      const response = (await ClearCartAction()) as ClearCartRes;
      if (response.message === "success") {
        dispatchEvent(new CustomEvent("cartUpdated", { detail: 0 }));

        toast.success("Cart cleared successfully", {
          description: "All items have been removed from your cart.",
          position: "top-center",
        });
        setCartData(null);
      } else {
        toast.error("Failed to clear cart", {
          description:
            response.message || "Something went wrong. Please try again.",
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Failed to clear cart", {
        description: "Something went wrong. Please try again.",
        position: "top-center",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="text-destructive hover:text-destructive hover:bg-destructive/10"
        onClick={() => {
          clearBtn();
        }}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-3 w-3 animate-spin" />
            Clearing...
          </>
        ) : (
          <>
            <Trash2 className="mr-2 h-3 w-3" />
            Clear Cart
          </>
        )}
      </Button>
    </>
  );
}
