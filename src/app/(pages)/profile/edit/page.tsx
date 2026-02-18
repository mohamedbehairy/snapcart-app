"use client";

import { UpdateProfileAction } from "@/actions/ProfileActions.action";
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
import { Loader2, Mail, Phone, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const editProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty("Full name is required")
    .min(3, "Full name must be at least 3 characters long")
    .max(50, "Full name must not exceed 50 characters"),

  email: z
    .string()
    .trim()
    .nonempty("Email is required")
    .regex(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please enter a valid email address (e.g. name@example.com)",
    ),

  phone: z
    .string()
    .trim()
    .nonempty("Phone number is required")
    .regex(
      /^01[0-2,5]\d{8}$/,
      "Please enter a valid Egyptian phone number (e.g. 01XXXXXXXXX)",
    ),
});

type EditProfileFormData = z.infer<typeof editProfileSchema>;

export default function EditProfilePage() {
  const router = useRouter();
  const { data: session, update } = useSession();
   const [isLoading, setIsLoading] = useState(false);

  const form = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });
  useEffect(() => {
    if (session?.user) {
      form.reset({
        name: session.user.name || "",
        email: session.user.email || "",
        phone: "",
      });
    }
  }, [session, form]);

  async function onSubmit(data: EditProfileFormData) {
    setIsLoading(true);

    try {
      const { ok, data: payload } = await UpdateProfileAction(
        data.name,
        data.email,
        data.phone,
      );

      if (ok && payload.message === "success") {
        // Update session with new data
        await update({
          ...session,
          user: {
            ...session?.user,
            name: data.name,
            email: data.email,
          },
        });

        toast.success("Profile Updated", {
          description: "Your profile has been updated successfully.",
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
    <div className="min-h-screen bg-background">
      <div className="container py-4 sm:py-6 px-4 max-w-2xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2">
            Edit Profile
          </h1>
          <p className="text-sm text-muted-foreground">
            Update your personal information
          </p>
        </div>

        {/* Form Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Make changes to your profile here</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                {/* Name */}
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="name" className="text-sm">
                        Full Name
                      </FieldLabel>

                      <div className="flex items-center bg-accent/20 rounded-lg overflow-hidden mt-2">
                        <div className="px-3 text-primary">
                          <User className="h-5 w-5" />
                        </div>
                        <input
                          {...field}
                          id="name"
                          type="text"
                          placeholder="Enter your full name"
                          className="w-full bg-transparent px-3 py-3 outline-none text-foreground placeholder:text-muted-foreground"
                        />
                      </div>

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
                        Email Address
                      </FieldLabel>

                      <div className="flex items-center bg-accent/20 rounded-lg overflow-hidden mt-2">
                        <div className="px-3 text-primary">
                          <Mail className="h-5 w-5" />
                        </div>
                        <input
                          {...field}
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          className="w-full bg-transparent px-3 py-3 outline-none text-foreground placeholder:text-muted-foreground"
                        />
                      </div>

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
                        Phone Number
                      </FieldLabel>

                      <div className="flex items-center bg-accent/20 rounded-lg overflow-hidden mt-2">
                        <div className="px-3 text-primary">
                          <Phone className="h-5 w-5" />
                        </div>
                        <input
                          {...field}
                          id="phone"
                          type="tel"
                          placeholder="01012345678"
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
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
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
