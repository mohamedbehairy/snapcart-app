"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CartResponse } from "@/interfaces/CartInterfaces";
import { ArrowLeft, CreditCard, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ClearCart from "../ClearCart/ClearCart";
import RemoveCartItem from "../RemoveCartItem/RemoveCartItem";
import UpdateCartItem from "../UpdateCartItem/UpdateCartItem";
import PaymentMethodDialog from "../PaymentMethodDialog/PaymentMethodDialog";
import { formatPrice } from "@/Helpers/formatPrice";

export default function Cart({ data }: { data: CartResponse }) {
  const [cartData, setCartData] = useState<CartResponse | null>(data);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  const cartItems = cartData?.data.products ?? [];
  const totalItems = cartData?.numOfCartItems ?? 0;
  const totalPrice = cartData?.data.totalCartPrice ?? 0;
  const cartId = cartData?.data._id ?? "";

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Shopping Cart
              </h1>
              {totalItems > 0 ? (
                <p className="text-sm text-muted-foreground mt-1">
                  {totalItems} {totalItems === 1 ? "item" : "items"} in your
                  cart
                </p>
              ) : (
                <p className="text-sm text-muted-foreground mt-1">
                  Your cart is empty
                </p>
              )}
            </div>

            {totalItems > 0 && <ClearCart setCartData={setCartData} />}
          </div>
        </div>

        <Separator className="mb-6" />

        {totalItems === 0 ? (
          <div className="text-center py-8">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-3" />
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Your cart is empty
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Add some products to get started!
            </p>
            <Button asChild size="sm">
              <Link href="/products">
                <ArrowLeft className="mr-2 h-3 w-3" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-5">
              {cartItems.map((item) => {
                const itemTotal = item.price * item.count;

                return (
                  <Card
                    key={item.product._id}
                    className="overflow-hidden border-border
                     hover:shadow-lg transition-shadow px-2 py-2 
                     sm:px-3 sm:py-3 md:px-4 md:py-4"
                  >
                    <div className="flex gap-2 sm:gap-3">
                      {/* IMAGE */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 shrink-0 relative">
                        <Image
                          src={item.product.imageCover}
                          alt={item.product.title}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>

                      {/* CONTENT */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col h-full">
                          {/* TOP */}
                          <div className="flex-1">
                            <h3
                              className="
                  font-medium text-foreground line-clamp-1
                  text-xs
                  sm:text-sm
                  md:text-md
                "
                            >
                              {item.product.title}
                            </h3>

                            <div className="flex flex-wrap justify-between items-center gap-1 mt-1">
                              <div className="flex flex-wrap gap-1">
                                <Badge
                                  variant="secondary"
                                  className="text-[10px] sm:text-xs px-1.5 py-0"
                                >
                                  {item.product.brand.name}
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className="text-[10px] sm:text-xs px-1.5 py-0"
                                >
                                  {item.product.category.name}
                                </Badge>
                              </div>

                              <p className="text-[10px] sm:text-xs text-muted-foreground">
                                {formatPrice(item.price)} × {item.count}
                              </p>
                            </div>
                          </div>

                          {/* BOTTOM */}
                          <div className="flex items-center justify-between mt-2 pt-2 border-t gap-2">
                            {/* Update Count */}
                            <div className="flex justify-between items-center">
                              <UpdateCartItem
                                productId={item.product._id}
                                setCartData={setCartData}
                                count={item.count}
                              />
                            </div>
                            <div className="flex items-center gap-2 sm:gap-4">
                              <p className="text-xs sm:text-sm font-bold">
                                {formatPrice(itemTotal)}
                              </p>

                              <RemoveCartItem
                                productId={item.product._id}
                                setCartData={setCartData}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="space-y-4">
              <Card className="sticky top-25 shadow-xl border border-accent">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Subtotal ({totalItems} items)
                      </span>
                      <span className="text-sm font-medium">
                        {formatPrice(totalPrice)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Shipping
                      </span>
                      <span className="text-sm text-green-600 font-medium">
                        Free
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold">Total</span>
                      <div className="text-right">
                        <p className="text-xl font-bold text-foreground">
                          {formatPrice(totalPrice)}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-3 flex flex-col gap-2">
                  <Button
                    className="w-full"
                    onClick={() => setShowPaymentDialog(true)}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Proceed to Checkout
                  </Button>

                  <Button variant="secondary" className="w-full" asChild>
                    <Link href="/products">Continue Shopping</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Payment Method Dialog */}
      <PaymentMethodDialog
        open={showPaymentDialog}
        onOpenChange={setShowPaymentDialog}
        cartId={cartId}
      />
    </div>
  );
}
