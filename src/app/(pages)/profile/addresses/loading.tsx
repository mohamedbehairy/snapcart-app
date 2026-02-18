import { Skeleton } from "@/components/ui/skeleton";

export default function AddressLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-6 sm:py-8 px-4 max-w-4xl">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48 sm:w-64" />
            <Skeleton className="h-4 w-40 sm:w-56" />
          </div>
          <Skeleton className="h-11 w-full sm:w-36" />
        </div>

        {/* Address Cards Skeleton */}
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="relative border border-accent rounded-xl p-4 sm:p-5 bg-card"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  {/* Icon Skeleton */}
                  <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg" />

                  {/* Name Skeleton */}
                  <div className="flex-1 min-w-0">
                    <Skeleton className="h-6 w-32 sm:w-40" />
                  </div>
                </div>

                {/* Delete Button Skeleton */}
                <Skeleton className="w-9 h-9 rounded-lg shrink-0" />
              </div>

              {/* Address Details Skeleton */}
              <div className="space-y-2.5 sm:space-y-3">
                {/* Address */}
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <Skeleton className="w-8 h-8 rounded-lg shrink-0" />
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-4 w-full max-w-md" />
                  </div>
                </div>

                {/* City */}
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <Skeleton className="w-8 h-8 rounded-lg shrink-0" />
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <Skeleton className="h-3 w-12" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <Skeleton className="w-8 h-8 rounded-lg shrink-0" />
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <Skeleton className="h-3 w-14" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
