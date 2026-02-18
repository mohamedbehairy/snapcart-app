// app/not-found.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, ShoppingBag } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-foreground">404</h1>
          <h2 className="text-2xl font-semibold text-muted-foreground">
            Page Not Found
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/products">
              <ShoppingBag className=" h-4 w-4" />
              View All Products
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
