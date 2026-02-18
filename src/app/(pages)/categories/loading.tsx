import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function CategoriesLoading() {
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
            Just a moment, loading Categories...
          </p>
        </div>
      </div>
    </div>
  );
}
