import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function WishListLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-4 md:py-8 px-3 md:px-4">
        {/* Header Skeleton */}
        <div className="mb-4 md:mb-6 space-y-1">
          <Skeleton className="h-6 md:h-7 w-32 md:w-40" />
          <Skeleton className="h-3 md:h-4 w-24 md:w-32" />
        </div>

        <Separator className="mb-4 md:mb-6" />

        {/* Cards Skeleton */}
        <div className="space-y-3 md:space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="border-border">
              <CardContent className="p-3 md:p-4">
                <div className="flex flex-row gap-3 md:gap-4">
                  {/* Image Skeleton */}
                  <Skeleton className="w-22 sm:w-24 md:w-28 h-33 sm:h-35 md:h-28 rounded-md shrink-0" />

                  {/* Info Skeleton */}
                  <div className="flex-1 flex flex-col justify-between gap-3">
                    <div>
                      {/* Title & Remove Button */}
                      <div className="flex items-start justify-between gap-2">
                        <Skeleton className="h-4 md:h-5 w-40 md:w-48" />
                        <Skeleton className="h-5 w-5 rounded-full shrink-0" />
                      </div>

                      {/* Badges */}
                      <div className="flex gap-1.5 md:gap-2 mt-1.5 md:mt-1">
                        <Skeleton className="h-4 md:h-5 w-14 md:w-16 rounded-full" />
                        <Skeleton className="h-4 md:h-5 w-16 md:w-20 rounded-full" />
                      </div>

                      {/* Description - Hidden on mobile */}
                      <div className="hidden sm:block space-y-1.5 mt-2">
                        <Skeleton className="h-3.5 md:h-4 w-full" />
                        <Skeleton className="h-3.5 md:h-4 w-4/5" />
                      </div>
                    </div>

                    {/* Footer Skeleton */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-2">
                      {/* Price */}
                      <Skeleton className="h-5 md:h-6 w-20 md:w-24" />

                      {/* Buttons */}
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Skeleton className="h-8 md:h-9 flex-1 sm:flex-none sm:w-24 md:w-28 rounded-md" />
                        <Skeleton className="h-8 md:h-9 flex-1 sm:flex-none sm:w-16 md:w-20 rounded-md" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
