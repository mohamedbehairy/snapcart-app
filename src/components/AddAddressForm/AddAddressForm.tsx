"use client";

import { AddAddressAction } from "@/actions/ProfileActions.action";
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
import { AddressesResponse } from "@/interfaces/ProfileInterfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, MapPin, Phone, User, Home } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const addAddressSchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty("Address name is required")
    .min(3, "Address name must be at least 3 characters"),

  details: z
    .string()
    .trim()
    .nonempty("Address details are required")
    .min(5, "Details must be at least 5 characters"),

  phone: z
    .string()
    .trim()
    .nonempty("Phone number is required")
    .regex(
      /^01[0-2,5]\d{8}$/,
      "Please enter a valid Egyptian phone number (e.g. 01XXXXXXXXX)",
    ),

  city: z
    .string()
    .trim()
    .nonempty("City is required")
    .min(2, "City must be at least 2 characters"),
});

type AddAddressFormData = z.infer<typeof addAddressSchema>;

export default function AddAddressForm({
  setAddressesData,
}: {
  setAddressesData: React.Dispatch<
    React.SetStateAction<AddressesResponse | null>
  >;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<AddAddressFormData>({
    resolver: zodResolver(addAddressSchema),
    defaultValues: {
      name: "",
      details: "",
      phone: "",
      city: "",
    },
  });

  async function onSubmit(data: AddAddressFormData) {
    setIsLoading(true);

    try {
      const { ok, data: payload } = await AddAddressAction(
        data.name,
        data.details,
        data.phone,
        data.city,
      );

      if (ok && payload.status === "success") {
        toast.success("Address Added", {
          description: "Your address has been added successfully.",
          position: "top-center",
        });

        setAddressesData(payload);
        form.reset();
      } else {
        toast.error("Failed to Add Address", {
          description:
            payload?.message || "Something went wrong. Please try again.",
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
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Add New Address</CardTitle>
        <CardDescription>
          Save a new delivery address to your account
        </CardDescription>
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
                    Address Name
                  </FieldLabel>

                  <div className="flex items-center bg-accent/20 rounded-lg overflow-hidden mt-2">
                    <div className="px-3 text-primary">
                      <Home className="h-5 w-5" />
                    </div>
                    <input
                      {...field}
                      id="name"
                      type="text"
                      placeholder="Home, Work..."
                      className="w-full bg-transparent px-3 py-3 outline-none text-foreground placeholder:text-muted-foreground"
                    />
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Details */}
            <Controller
              name="details"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="details" className="text-sm">
                    Address Details
                  </FieldLabel>

                  <div className="flex items-center bg-accent/20 rounded-lg overflow-hidden mt-2">
                    <div className="px-3 text-primary">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <input
                      {...field}
                      id="details"
                      type="text"
                      placeholder="Street, building, apartment..."
                      className="w-full bg-transparent px-3 py-3 outline-none text-foreground placeholder:text-muted-foreground"
                    />
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* City */}
            <Controller
              name="city"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="city" className="text-sm">
                    City
                  </FieldLabel>

                  <div className="flex items-center bg-accent/20 rounded-lg overflow-hidden mt-2">
                    <div className="px-3 text-primary">
                      <User className="h-5 w-5" />
                    </div>
                    <input
                      {...field}
                      id="city"
                      type="text"
                      placeholder="Giza"
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

          <div className="mt-6">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Add Address"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
