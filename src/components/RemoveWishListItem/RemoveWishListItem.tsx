"use client";

import { RemoveWishListAction } from "@/actions/WishListActions.action";
import { WishListRes } from "@/interfaces/WishListInterfaces";
import { HeartOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function RemoveWishListItem({
  productId,
  setWishListData,
}: {
  productId: string;
  setWishListData: React.Dispatch<React.SetStateAction<WishListRes | null>>;
}) {
  const [isLoading, setIsLoading] = useState(false);

  async function removeProduct() {
    try {
      setIsLoading(true);

      const { ok, status } = await RemoveWishListAction(productId);

      if (ok) {
        toast.success("Item removed", {
          description: "The product has been removed from your wishlist.",
          position: "top-center",
        });

        //!@@@@@@ UPDATE UI STATE LOCALLY
        setWishListData((prev) => {
           if (!prev) return prev;

          return {
            ...prev,
            count: prev.count - 1,
            data: prev.data.filter((item) => item._id !== productId),
          };
        });

        return;
      }

      if (status === 401) {
        toast.error("Login required", {
          description: "Please log in to manage your wishlist items.",
          position: "top-center",
        });
        return;
      }

      toast.error("Unable to remove item", {
        description: "Something went wrong while removing the item.",
        position: "top-center",
      });
    } catch (error) {
      console.error(error);
      toast.error("Unexpected error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button onClick={removeProduct} className="text-red-500 cursor-pointer">
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <HeartOff className="h-5 w-5 hover:fill-red-300" />
      )}
    </button>
  );
}
