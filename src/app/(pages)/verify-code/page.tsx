"use client";

import { VerifyCodeAction } from "@/actions/ForgotPasswordActions.action";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  KeyRound,
  Loader2,
  Mail,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// Schema
const verifyCodeSchema = z.object({
  resetCode: z
    .string()
    .trim()
    .min(1, "Verification code is required")
    .regex(/^\d+$/, "Verification code must contain only numbers"),
});

type VerifyCodeFormData = z.infer<typeof verifyCodeSchema>;

export default function VerifyCode() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<VerifyCodeFormData>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      resetCode: "",
    },
  });

  async function onSubmit(data: VerifyCodeFormData) {
    setIsLoading(true);

    try {
      const { ok, payload } = await VerifyCodeAction(data.resetCode);
  
      if (ok && payload.message === "success") {
        toast.success("Code Verified Successfully", {
          description: "You can now reset your password.",
          position: "top-center",
        });

        router.push("/new-password");
      } else {
        toast.error("Verification Failed", {
          description: payload.message || "Invalid code. Please try again.",
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

          {/* Step 2 - Active */}
          <div className="flex flex-col items-center gap-1 sm:flex-row sm:gap-2">
            <div className="w-8 h-8 sm:w-auto sm:h-auto rounded-full bg-primary flex items-center justify-center sm:bg-transparent sm:rounded-none p-1 sm:p-0">
              <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground sm:text-foreground" />
            </div>
            <span className="text-[10px] sm:text-sm font-medium text-foreground text-center">
              Verify Code
            </span>
          </div>

          <div className="flex-1 h-px bg-border mx-2 sm:mx-4" />

          {/* Step 3 */}
          <div className="flex flex-col items-center gap-1 sm:flex-row sm:gap-2">
            <div className="w-8 h-8 sm:w-auto sm:h-auto rounded-full bg-secondary flex items-center justify-center sm:bg-transparent sm:rounded-none p-1 sm:p-0">
              <KeyRound className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
            </div>
            <span className="text-[10px] sm:text-sm font-medium text-muted-foreground text-center">
              Password
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-primary">
              Verification Code
            </label>

            <div className="flex items-center bg-accent/20 rounded-lg overflow-hidden">
              <div className="px-3 text-primary">
                <ShieldQuestion className="h-5 w-5" />
              </div>
              <input
                {...form.register("resetCode")}
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="Enter code sent to your email"
                className="w-full bg-transparent px-3 py-3 outline-none text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {form.formState.errors.resetCode && (
              <p className="text-sm text-destructive">
                {form.formState.errors.resetCode.message}
              </p>
            )}

            <div className="flex justify-center pt-10">
              <Button type="submit" size="lg" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify Code"
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
