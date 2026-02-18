"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/Helpers/formatPrice";
import {
  DetailedCartItem,
  GetOrdersResponse,
  Order,
} from "@/interfaces/OrdersInterfaces";
import {
  Banknote,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  MapPin,
  Package,
  PackageOpen,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/Helpers/formatDate";

interface OrdersListProps {
  orders: GetOrdersResponse | null;
  isSuccess: boolean;
}

export default function OrdersList({ orders, isSuccess }: OrdersListProps) {
  if (!isSuccess || !orders?.data) {
    return (
      <Card className="border border-accent">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <PackageOpen className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Error Loading Orders</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Unable to load your orders. Please try again.
          </p>
          <Button asChild>
            <a href="/allorders">Try again</a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (orders.data.length === 0) {
    return (
      <Card className="border border-accent">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <PackageOpen className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Orders Yet</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Start shopping to see your orders here
          </p>
          <Button asChild>
            <Link href="/products">Start Shopping</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const ordersList = orders.data;

  return (
    <div className="space-y-4">
      {ordersList.map((order: Order) => (
        <Card
          key={order._id}
          className="border border-accent hover:shadow-lg transition-shadow"
        >
          <CardContent className="p-4 sm:p-6">
            {/* Order Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 pb-4 border-b">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Package className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-base sm:text-lg">
                    Order #{order.id}
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {formatDate(order.createdAt)}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {/* Payment Status */}
                <Badge
                  variant={order.isPaid ? "default" : "secondary"}
                  className={`gap-1 ${
                    order.isPaid
                      ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-950 dark:text-emerald-400"
                      : "bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-950 dark:text-amber-400"
                  }`}
                >
                  {order.isPaid ? (
                    <>
                      <CheckCircle2 className="h-3 w-3" />
                      Paid
                    </>
                  ) : (
                    <>
                      <Clock className="h-3 w-3" />
                      Pending
                    </>
                  )}
                </Badge>

                {/* Delivery Status */}
                <Badge
                  variant={order.isDelivered ? "default" : "outline"}
                  className={`gap-1 ${
                    order.isDelivered
                      ? "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-950 dark:text-blue-400"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400"
                  }`}
                >
                  {order.isDelivered ? (
                    <>
                      <CheckCircle2 className="h-3 w-3" />
                      Delivered
                    </>
                  ) : (
                    <>
                      <Package className="h-3 w-3" />
                      Processing
                    </>
                  )}
                </Badge>
              </div>
            </div>

            {/* Order Details Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              {/* Payment Method */}
              <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
                {order.paymentMethodType === "cash" ? (
                  <Banknote className="h-5 w-5 text-green-600 shrink-0" />
                ) : (
                  <CreditCard className="h-5 w-5 text-blue-600 shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">
                    Payment Method
                  </p>
                  <p className="text-sm font-medium">
                    {order.paymentMethodType === "cash"
                      ? "Cash on Delivery"
                      : "Credit/Debit Card"}
                  </p>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">Shipping To</p>
                  <p className="text-sm font-medium line-clamp-1">
                    {order.shippingAddress.city}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {order.shippingAddress.details}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-2 mb-4">
              <p className="text-sm font-medium">
                Items ({order.cartItems.length})
              </p>
              <div className="space-y-2">
                {order.cartItems.map((item: DetailedCartItem) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-secondary/20"
                  >
                    {/* Product Image */}
                    <div className="relative w-12 h-12 rounded-md overflow-hidden shrink-0">
                      <Image
                        src={item.product.imageCover}
                        alt={item.product.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-1">
                        {item.product.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">
                          Qty: {item.count}
                        </span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">
                          {formatPrice(item.price)}
                        </span>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="text-sm font-semibold shrink-0">
                      {formatPrice(item.price * item.count)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Total */}
            <div className="flex items-center justify-between pt-4 border-t">
              <span className="font-semibold">Total</span>
              <span className="text-xl font-bold text-primary">
                {formatPrice(order.totalOrderPrice)}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
