"use client";

import { RegisterAction } from "@/actions/RegisterAction.action";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RegisterFormData, registerSchema } from "@/schemas/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
  });

  async function onSubmit(data: RegisterFormData) {
    setIsLoading(true);

    try {
      const { ok, status, payload } = await RegisterAction(data);

      if (ok && payload.message === "success") {
        router.push("/login");
        toast.success("Account created successfully!", {
          description: "Welcome to Snap Cart",
          position: "top-center",
        });
      } else {
        // Handle all error cases based on status code
        let errorMessage = "Signup failed!";
        let errorDescription = "Please try again";

        if (status === 409) {
          // Conflict - Account exists
          errorMessage = payload.message || "Account Already Exists";
          errorDescription = "Please login or use a different email";
        } else if (status === 500) {
          // Server error
          errorMessage = "Server error occurred";
          errorDescription = "Please try again later";
        } else if ("errors" in payload) {
          // Validation errors
          errorMessage = payload.errors?.msg || "Invalid input";
          errorDescription = "Please check your information";
        } else if (payload.message) {
          // Any other error with message
          errorMessage = payload.message;
        }

        toast.error(errorMessage, {
          description: errorDescription,
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Network error:", error);
      toast.error("Network error!", {
        description: "Please check your internet connection and try again",
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          {/* Name */}
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name" className="text-sm">
                  Full name
                </FieldLabel>
                <Input
                  {...field}
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  className="h-10 "
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

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
                  className="h-10"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Phone */}
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="phone" className="text-sm">
                  Phone number
                </FieldLabel>
                <Input
                  {...field}
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  className="h-10"
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
                  placeholder="Create a strong password"
                  className="h-10"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Confirm Password */}
          <Controller
            name="rePassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="rePassword" className="text-sm">
                  Confirm password
                </FieldLabel>
                <Input
                  {...field}
                  id="rePassword"
                  type="password"
                  placeholder="Confirm your password"
                  className="h-10"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <Button type="submit" className="w-full h-10 mt-5" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Account...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>
    </>
  );
}
