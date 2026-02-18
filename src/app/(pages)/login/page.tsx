import Link from "next/link";
import LoginForm from "@/components/LoginForm/LoginForm";
import { Separator } from "@/components/ui/separator";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-xl rounded-xl border border-border bg-accent-foreground p-8 shadow-lg">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Sign in to your account
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground my-2">
            Access your cart, orders, and wishlist
          </p>
        </div>

        {/*//& Form // */}
        <LoginForm />

        <Separator className="my-4" />

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            New to Snap Cart?
            <Link
              href="/register"
              className="ps-2 font-medium text-primary hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
