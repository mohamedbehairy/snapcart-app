"use client";

import { fetchOrdersAction } from "@/actions/OrdersActions.action";
import OrdersList from "@/components/OrdersList/OrdersList";
import { Button } from "@/components/ui/button";
import { GetOrdersResponse } from "@/interfaces/OrdersInterfaces";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orderData, setOrderData] = useState<GetOrdersResponse | null>(null);
  const [ok, setOk] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      if (status === "loading") return;

      if (!session?.token) {
        router.push("/login");
        return;
      }

      const userId = localStorage.getItem("userId");

      if (!userId) {
        console.error("No userId found in localStorage");
        setHasError(true);
        setIsLoading(false);
        return;
      }

      const result = await fetchOrdersAction(userId, session.token);

      if (result.ok) {
        setOrderData(result.data);
        setOk(true);
      } else {
        setOrderData(result.data);
        setOk(false);
      }

      setIsLoading(false);
    }

    loadOrders();
  }, [session, status, router]);

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-sm w-full space-y-6">
          {/* Logo with Loading Animation */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-16 h-16">
              <Image
                src="/SC Icon 2.png"
                alt="SnapCart Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Loading your orders...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error State - No userId
  if (hasError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="flex flex-col items-center text-center max-w-md">
          <div className="w-24 h-24 flex items-center justify-center rounded-full bg-destructive/10 mb-6">
            <AlertTriangle className="h-12 w-12 text-destructive" />
          </div>

          <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>

          <p className="text-muted-foreground mb-6">
            We couldn't load your orders. Please try refreshing the page or
            contact support if the problem persists.
          </p>

          <div className="flex gap-3">
            <Button
              onClick={() => {
                setHasError(false);
                setIsLoading(true);
                window.location.reload();
              }}
            >
              Refresh Page
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Go Home</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-6 sm:py-8 px-4 max-w-6xl">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2">
            My Orders
          </h1>
          <p className="text-sm text-muted-foreground">
            Track and manage your orders
          </p>
        </div>

        <OrdersList orders={orderData} isSuccess={ok} />
      </div>
    </div>
  );
}
