"use client";

import { WishListRes } from "@/interfaces/WishListInterfaces";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { addToCartAction } from "@/actions/CartActions.action";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Loader2,
  ShoppingCart,
} from "lucide-react";
import { toast } from "sonner";
import RemoveWishListItem from "../RemoveWishListItem/RemoveWishListItem";
import { formatPrice } from "@/Helpers/formatPrice";

export default function WishList({ data }: { data: WishListRes }) {
  const [wishListData, setWishListData] = useState<WishListRes | null>(data);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const wishListItems = wishListData?.data ?? [];
  const totalItems = wishListData?.count ?? 0;

  // Add To Cart function
  async function addToCart(productId: string) {
    try {
      setLoadingId(productId);

      const { data, ok, status } = await addToCartAction(productId);

      if (ok) {
        toast.success("Product added to cart", {
          description: data.message || "Item added successfully",
          position: "top-center",
        });
        return;
      }

      if (status === 401) {
        toast.error("Login required", {
          description: "Please login first to add products to your cart",
          position: "top-center",
        });
        return;
      }

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
      setLoadingId(null);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-4 md:py-8 px-3 md:px-4">
        {/* Header */}
        <div className="mb-4 md:mb-6">
          <h1 className="text-xl md:text-2xl font-bold">My Wishlist</h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            {totalItems ? (
              <>
                {totalItems} saved item{totalItems !== 1 && "s"}
              </>
            ) : (
              <>Your wishlist is empty</>
            )}
          </p>
        </div>

        <Separator className="mb-4 md:mb-6" />

        {/* Empty State */}
        {wishListItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 md:py-24 text-center px-4">
            <div className="w-16 h-16 md:w-22 md:h-22 flex items-center justify-center rounded-full bg-muted/40 mb-4 md:mb-6">
              <Heart className="h-10 w-10 md:h-14 md:w-14 text-muted-foreground" />
            </div>

            <h2 className="text-lg md:text-xl font-semibold mb-2">
              Your wishlist is empty
            </h2>

            <p className="text-sm md:text-base text-muted-foreground max-w-sm mb-4 md:mb-6">
              Looks like you haven't added any products yet. Start exploring and
              save your favorites here.
            </p>

            <Button asChild size="sm">
              <Link href="/products">
                <ArrowLeft className="mr-2 h-3 w-3" />
                Browse Products
              </Link>
            </Button>
          </div>
        )}

        {/* Wishlist Items */}
        {wishListItems.length > 0 && (
          <div className="space-y-3 md:space-y-4">
            {wishListItems.map((product) => (
              <Card
                key={product._id}
                className="group border-border hover:border-primary/40 hover:shadow-md transition-all"
              >
                <CardContent className="p-3 md:p-4">
                  <div className="flex flex-row gap-3 md:gap-4">
                    {/* Image */}
                    <div className="w-22 sm:w-24 md:w-28 h-33 sm:h-35 md:h-28 relative shrink-0 rounded-md overflow-hidden">
                      <Image
                        src={product.imageCover}
                        alt={product.title}
                        fill
                        className="object-contain"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between gap-3">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-medium text-sm md:text-base text-foreground line-clamp-2 sm:line-clamp-1">
                            {product.title}
                          </h3>

                          {/* Remove Product */}
                          <div className="">
                            <RemoveWishListItem
                              productId={product._id}
                              setWishListData={setWishListData}
                            />
                          </div>
                        </div>

                        <div className="flex gap-1.5 md:gap-2 mt-1.5 md:mt-1">
                          <Badge
                            variant="secondary"
                            className="text-[10px] md:text-xs px-1.5 md:px-2 py-0"
                          >
                            {product.brand?.name}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="text-[10px] md:text-xs px-1.5 md:px-2 py-0"
                          >
                            {product.category?.name}
                          </Badge>
                        </div>

                        <p className="hidden sm:block text-sm text-muted-foreground line-clamp-2 mt-2">
                          {product.description}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-2">
                        <p className="font-semibold text-base md:text-lg">
                          {formatPrice(
                            product.priceAfterDiscount ?? product.price,
                          )}
                        </p>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          {/* Add to cart */}
                          <Button
                            size="sm"
                            variant="secondary"
                            className="flex-1 sm:flex-none text-xs md:text-sm h-8 md:h-9"
                            disabled={loadingId === product._id}
                            onClick={() => addToCart(product._id)}
                          >
                            {loadingId === product._id ? (
                              <>
                                <Loader2 className="animate-spin h-4 w-4 mr-1" />
                                <span className="hidden sm:inline">
                                  Adding...
                                </span>
                                <span className="sm:hidden">Add</span>
                              </>
                            ) : (
                              <>
                                <ShoppingCart className="mr-1 h-3 w-3 md:h-4 md:w-4" />
                                <span className="hidden sm:inline">
                                  Add To Cart
                                </span>
                                <span className="sm:hidden">Add</span>
                              </>
                            )}
                          </Button>

                          {/* Details */}
                          <Button
                            size="sm"
                            variant="link"
                            asChild
                            className="flex-1 sm:flex-none text-xs md:text-sm h-8 md:h-9"
                          >
                            <Link href={`/products/${product._id}`}>
                              Details
                              <ArrowRight className="ml-1 h-3 w-3 md:h-4 md:w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
