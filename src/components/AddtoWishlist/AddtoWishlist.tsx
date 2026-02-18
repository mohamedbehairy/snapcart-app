"use client";

import {
  addToWishlistAction,
  getWishlistAction,
  RemoveWishListAction,
} from "@/actions/WishListActions.action";
import { Button } from "@/components/ui/button";
import { Heart, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Products } from "@/interfaces/WishListInterfaces";

// Global cache for wishlist data
let globalWishlistCache: Products[] = [];
let lastFetchTime = 0;
let isFetching = false;
const CACHE_DURATION = 30000; // 30 seconds

export default function AddToWishlist({
  productId,
  className = "",
}: {
  productId: string;
  className?: string;
}) {
  const [wishlistProducts, setWishlistProducts] = useState<Products[]>(globalWishlistCache);
  const [loading, setLoading] = useState(false);

  const isLiked = wishlistProducts.some(product => product._id === productId);

  // ✅ Fetch wishlist with caching mechanism
  async function fetchWishlist() {
    const now = Date.now();
    
    // Return cached data if still valid
    if (globalWishlistCache.length > 0 && (now - lastFetchTime) < CACHE_DURATION) {
      setWishlistProducts(globalWishlistCache);
      return;
    }

    // Prevent multiple simultaneous fetches
    if (isFetching) {
      return;
    }

    isFetching = true;
    try {
      const res = await getWishlistAction();
      if (res?.ok) {
        globalWishlistCache = res.data;
        lastFetchTime = now;
        setWishlistProducts(res.data);
      }
    } finally {
      isFetching = false;
    }
  }

  useEffect(() => {
    fetchWishlist();
  }, []);

  async function toggleWishlist() {
    try {
      setLoading(true);

      let res;

      if (isLiked) {
        //   remove
        res = await RemoveWishListAction(productId);
       } else {
        //   add
        res = await addToWishlistAction(productId);
       }

      if (res.ok) {
        // Invalidate cache and refresh
        globalWishlistCache = [];
        await fetchWishlist();

        // Determine action based on previous state
        const wasAdded = !isLiked;
        
        toast.success(
          wasAdded ? "Added to wishlist" : "Removed from wishlist",
          {
            description: wasAdded
              ? "Product has been added successfully to your wishlist"
              : "Product has been removed from your wishlist",
            position: "top-center",
          },
        );
      } else if (res.status === 401) {
        toast.error("Login required", {
          description: "Please login first to manage your wishlist",
          position: "top-center",
        });
      } else {
        toast.error("Action failed", {
          description: "Something went wrong while updating the wishlist",
          position: "top-center",
        });
      }
    } catch (err) {
      console.error("Wishlist toggle error:", err);
      toast.error("Server error", {
        description: "Unable to update wishlist due to server error",
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      size="icon"
      variant="secondary"
      onClick={toggleWishlist}
      disabled={loading}
      className={`rounded-full group ${className}`}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Heart
          className={`transition-all duration-200
    ${isLiked ? "fill-red-500 text-red-500" : "text-muted-foreground"}
  `}
        />
      )}
    </Button>
  );
}
