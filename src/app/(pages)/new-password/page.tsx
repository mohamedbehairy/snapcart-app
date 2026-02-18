"use client";

import { ResetPassAction } from "@/actions/ForgotPasswordActions.action";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound, Loader2, Mail, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const resetPasswordSchema = z.object({
  newPassword: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters long")
    .max(100, "Password must not exceed 100 characters"),
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function NewPassword() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("resetEmail");
    if (savedEmail) {
      setEmail(savedEmail);
    } else {
      //   toast.error("Session expired", {
      //     description: "Please start the password reset process again.",
      //     position: "top-center",
      //   });
      //   router.push("/forgot-password");
    }
  }, [router]);

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
    },
  });
  async function onSubmit(data: ResetPasswordFormData) {
    setIsLoading(true);

    try {
      const { ok, payload } = await ResetPassAction(email, data.newPassword);

      if (ok) {
        localStorage.removeItem("resetEmail");

        toast.success("Password Reset Successfully", {
          description: "You can now login with your new password.",
          position: "top-center",
        });

        router.push("/login");
      } else {
        toast.error("Reset Failed", {
          description:
            payload.message || "Something went wrong. Please try again.",
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Network error:", error);

      toast.error("Network Error", {
        description:
          "Unable to connect to the server. Please check your internet connection.",
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-3xl bg-card border border-primary/40 rounded-xl p-4 sm:p-8 shadow-lg">
        {/* Stepper */}
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          {/* Step 1 */}
          <div className="flex flex-col items-center gap-1 sm:flex-row sm:gap-2">
            <div className="w-8 h-8 sm:w-auto sm:h-auto rounded-full bg-secondary flex items-center justify-center sm:bg-transparent sm:rounded-none p-1 sm:p-0">
              <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
            </div>
            <span className="text-[10px] sm:text-sm font-medium text-muted-foreground text-center">
              Verify Email
            </span>
          </div>

          <div className="flex-1 h-px bg-border mx-2 sm:mx-4" />

          {/* Step 2 */}
          <div className="flex flex-col items-center gap-1 sm:flex-row sm:gap-2">
            <div className="w-8 h-8 sm:w-auto sm:h-auto rounded-full bg-secondary flex items-center justify-center sm:bg-transparent sm:rounded-none p-1 sm:p-0">
              <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
            </div>
            <span className="text-[10px] sm:text-sm font-medium text-muted-foreground text-center">
              Verify Code
            </span>
          </div>

          <div className="flex-1 h-px bg-border mx-2 sm:mx-4" />

          {/* Step 3 - Active */}
          <div className="flex flex-col items-center gap-1 sm:flex-row sm:gap-2">
            <div className="w-8 h-8 sm:w-auto sm:h-auto rounded-full bg-primary flex items-center justify-center sm:bg-transparent sm:rounded-none p-1 sm:p-0">
              <KeyRound className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground sm:text-foreground" />
            </div>
            <span className="text-[10px] sm:text-sm font-medium text-foreground text-center">
              Password
            </span>
          </div>
        </div>

        {/* Display Email (Read-only) */}
        {email && (
          <div className="mb-6 p-3 bg-secondary/20 rounded-lg border border-border/50">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Resetting password for:{" "}
              <span className="font-medium text-foreground break-all">
                {email}
              </span>
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-primary">
                New Password
              </label>
              <div className="flex items-center bg-accent/20 rounded-lg overflow-hidden mt-2">
                <div className="px-3 text-primary">
                  <KeyRound className="h-5 w-5" />
                </div>
                <input
                  {...form.register("newPassword")}
                  type="password"
                  placeholder="Enter new password"
                  className="w-full bg-transparent px-3 py-3 outline-none text-foreground placeholder:text-muted-foreground"
                />
              </div>
              {form.formState.errors.newPassword && (
                <p className="text-sm text-destructive mt-1">
                  {form.formState.errors.newPassword.message}
                </p>
              )}
            </div>

            <div className="flex justify-center pt-10">
              <Button type="submit" size="lg" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Password"
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
