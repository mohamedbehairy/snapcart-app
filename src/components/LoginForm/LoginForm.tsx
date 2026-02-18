"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().trim().nonempty("Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 8 characters.")
    .max(100, "Password must be at most 100 characters.")
    .nonempty("Password is required"),
});
type FormData = z.infer<typeof formSchema>;
export default function LoginForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("url");
  const [isLoading, setIsLoading] = useState(false);
  async function onSubmit(data: FormData) {
    setIsLoading(true);
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      //! redirect: true, by default
    });
     if (response?.ok) {
      toast.success("Logged in successfully!", {
        description: "Welcome back to Snap Cart",
        position: "top-center",
      });
      router.push(redirect || "/");
    } else {
      toast.error(response?.error || "Login failed", {
        description: "Something went wrong, please try again",
        position: "top-center",
      });
    }

    setIsLoading(false);
  }

  return (
    <>
      <form
        id="login-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2"
      >
        <FieldGroup>
          {/* Email */}
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email" className="text-sm">
                  Email address
                </FieldLabel>
                <Input
                  {...field}
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="h-9 mt-1"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Password */}
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="password" className="text-sm">
                  Password
                </FieldLabel>
                <Input
                  {...field}
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="h-9 mt-1"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
                <div className="flex justify-end mt-1">
                  <Link
                    href="/forgot-password"
                    className="text-xs sm:text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              </Field>
            )}
          />
        </FieldGroup>

        <Button type="submit" className="w-full h-10 mt-5" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logging in...
            </>
          ) : (
            "Log In"
          )}
        </Button>
      </form>
    </>
  );
}
