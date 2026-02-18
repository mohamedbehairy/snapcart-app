"use client";

import { ForgotPassAction } from "@/actions/ForgotPasswordActions.action";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound, Loader2, Mail, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const verifyEmailSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty("Email is required")
    .regex(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please enter a valid email address (e.g. name@example.com)",
    ),
});

type VerifyEmailFormData = z.infer<typeof verifyEmailSchema>;

export default function VerifyEmail() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<VerifyEmailFormData>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: VerifyEmailFormData) {
    setIsLoading(true);

    try {
      const { ok, payload } = await ForgotPassAction(data.email);

      if (ok && payload.message === "success") {
        localStorage.setItem("resetEmail", data.email);

        toast.success("Code Sent Successfully", {
          description: "Please check your email for the verification code.",
          position: "top-center",
        });

        router.push("/verify-code");
      } else {
        toast.error("Verification Failed", {
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
            <div className="w-8 h-8 sm:w-auto sm:h-auto rounded-full bg-primary flex items-center justify-center sm:bg-transparent sm:rounded-none p-1 sm:p-0">
              <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground sm:text-foreground" />
            </div>
            <span className="text-[10px] sm:text-sm font-medium text-foreground text-center">
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
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email" className="text-sm">
                    Email address
                  </FieldLabel>

                  <div className="flex items-center bg-accent/20 rounded-lg overflow-hidden">
                    <div className="px-3 text-primary">
                      <Mail className="h-5 w-5" />
                    </div>
                    <input
                      {...field}
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full bg-transparent px-3 py-3 outline-none text-foreground placeholder:text-muted-foreground"
                    />
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <div className="flex justify-center pt-10">
            <Button type="submit" size={"lg"} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Verify Email"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
