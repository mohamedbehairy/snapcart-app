import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function CartLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        {/* Header Skeleton */}
        <div className="mb-6">
          <div className="flex justify-between items-start">
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-8 w-24 rounded-md" />
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-5">
            {[1, 2, 3].map((item) => (
              <Card
                key={item}
                className="overflow-hidden border-border px-2 py-2 sm:px-3 sm:py-3 md:px-4 md:py-4"
              >
                <div className="flex gap-2 sm:gap-3">
                  {/* Image Skeleton */}
                  <Skeleton className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 shrink-0 rounded-md" />

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col h-full">
                      <div className="flex-1">
                        {/* Title */}
                        <Skeleton className="h-4 sm:h-5 w-3/4 mb-2" />

                        {/* Badges & Price */}
                        <div className="flex flex-wrap justify-between items-center gap-1 mt-1">
                          <div className="flex gap-1">
                            <Skeleton className="h-4 w-14 sm:w-16 rounded-full" />
                            <Skeleton className="h-4 w-16 sm:w-20 rounded-full" />
                          </div>
                          <Skeleton className="h-3 w-20 sm:w-24" />
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between mt-2 pt-2 border-t gap-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-7 w-7 rounded-md" />
                          <Skeleton className="h-5 w-8" />
                          <Skeleton className="h-7 w-7 rounded-md" />
                        </div>

                        {/* Price & Remove */}
                        <div className="flex items-center gap-2 sm:gap-4">
                          <Skeleton className="h-4 sm:h-5 w-16 sm:w-20" />
                          <Skeleton className="h-7 w-7 rounded-md" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-4">
            <Card className="sticky top-25 shadow-xl border border-accent">
              <CardHeader className="pb-3">
                <Skeleton className="h-5 w-32" />
              </CardHeader>

              <CardContent className="pb-3">
                <div className="space-y-3">
                  {/* Subtotal */}
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-16" />
                  </div>

                  {/* Shipping */}
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-12" />
                  </div>

                  <Separator />

                  {/* Total */}
                  <div className="flex justify-between items-baseline">
                    <Skeleton className="h-5 w-12" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-3 flex flex-col gap-2">
                <Skeleton className="h-10 w-full rounded-md" />
                <Skeleton className="h-10 w-full rounded-md" />
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
