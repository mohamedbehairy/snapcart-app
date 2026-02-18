import Link from "next/link";
import RegisterForm from "@/components/RegisterForm/RegisterForm";
import { Separator } from "@/components/ui/separator";

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-xl rounded-xl border border-border bg-accent-foreground p-6 shadow-lg">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Create your account
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground my-2">
            Join Snap Cart to start shopping
          </p>
        </div>

        {/*//& Form // */}
        <RegisterForm />

        <Separator className="my-4" />

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Already have an account?
            <Link
              href="/login"
              className="ps-2 font-medium text-primary hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
