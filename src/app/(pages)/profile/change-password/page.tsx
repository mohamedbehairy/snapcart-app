"use client";

import { ChangePasswordAction } from "@/actions/ProfileActions.action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound, Loader2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .nonempty("Password is required")
      .min(6, "Password must be at least 6 characters long")
      .max(100, "Password must not exceed 100 characters"),

    password: z
      .string()
      .nonempty("Password is required")
      .min(6, "Password must be at least 6 characters long")
      .max(100, "Password must not exceed 100 characters"),

    rePassword: z.string().nonempty("Please confirm your password"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export default function ChangePasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
  });

  async function onSubmit(data: ChangePasswordFormData) {
    setIsLoading(true);

    try {
      const { ok, data: payload } = await ChangePasswordAction(
        data.currentPassword,
        data.password,
        data.rePassword,
      );

      if (ok && payload.message === "success") {
        toast.success("Password Updated", {
          description: "Your password has been changed successfully.",
          position: "top-center",
        });

        router.push("/profile");
      } else {
        toast.error("Update Failed", {
          description:
            payload?.errors?.msg || "Something went wrong. Please try again.",
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Network Error", {
        description: "Please check your internet connection.",
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-4 sm:py-6 px-4 max-w-2xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2">
            Change Password
          </h1>
          <p className="text-sm text-muted-foreground">
            Update your account password
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>
              Make sure your new password is strong
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                {/* Current Password */}
                <Controller
                  name="currentPassword"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="currentPassword">
                        Current Password
                      </FieldLabel>

                      <div className="flex items-center bg-accent/20 rounded-lg overflow-hidden mt-2">
                        <div className="px-3 text-primary">
                          <KeyRound className="h-5 w-5" />
                        </div>
                        <input
                          {...field}
                          id="currentPassword"
                          type="password"
                          placeholder="Enter current password"
                          className="w-full bg-transparent px-3 py-3 outline-none text-foreground"
                        />
                      </div>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* New Password */}
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="password">New Password</FieldLabel>

                      <div className="flex items-center bg-accent/20 rounded-lg overflow-hidden mt-2">
                        <div className="px-3 text-primary">
                          <Lock className="h-5 w-5" />
                        </div>
                        <input
                          {...field}
                          id="password"
                          type="password"
                          placeholder="Enter new password"
                          className="w-full bg-transparent px-3 py-3 outline-none text-foreground"
                        />
                      </div>

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
                      <FieldLabel htmlFor="rePassword">
                        Confirm Password
                      </FieldLabel>

                      <div className="flex items-center bg-accent/20 rounded-lg overflow-hidden mt-2">
                        <div className="px-3 text-primary">
                          <Lock className="h-5 w-5" />
                        </div>
                        <input
                          {...field}
                          id="rePassword"
                          type="password"
                          placeholder="Confirm new password"
                          className="w-full bg-transparent px-3 py-3 outline-none text-foreground"
                        />
                      </div>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              <div className="flex gap-3 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => router.back()}
                  disabled={isLoading}
                >
                  Cancel
                </Button>

                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Password"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
