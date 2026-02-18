"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { MapPin, Loader2, CreditCard, Banknote } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  createCashOrderAction,
  createVisaOrderAction,
} from "@/actions/OrdersActions.action";

interface AddressFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paymentMethod: "cash" | "visa" | null;
  cartId: string;
}

// Zod Schema
const addressSchema = z.object({
  details: z
    .string()
    .trim()
    .min(1, "Address details are required")
    .min(5, "Details must be at least 5 characters"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(
      /^01[0-2,5]\d{8}$/,
      "Please enter a valid Egyptian phone number (e.g. 01XXXXXXXXX)",
    ),
  city: z
    .string()
    .trim()
    .min(1, "City is required")
    .min(2, "City must be at least 2 characters"),
});

type AddressFormData = z.infer<typeof addressSchema>;

export default function AddressFormDialog({
  open,
  onOpenChange,
  paymentMethod,
  cartId,
}: AddressFormDialogProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
  });

  const onSubmit = async (formData: AddressFormData) => {
    try {
      setIsLoading(true);

      const shippingAddress = {
        details: formData.details,
        phone: formData.phone,
        city: formData.city,
      };

      if (paymentMethod === "cash") {
        // Cash Order
        const { data, ok } = await createCashOrderAction(
          cartId,
          shippingAddress,
        );

        if (ok && data.status === "success") {
          toast.success("Order placed successfully", {
            description: data.message || "Your order has been placed",
            position: "top-center",
          });
          onOpenChange(false);
          router.push(`/allorders`);
        } else {
          toast.error("Failed to place order", {
            description: data.message || "Please try again",
            position: "top-center",
          });
        }
      } else {
        // Visa Order
        const { data, ok } = await createVisaOrderAction(
          cartId,
          shippingAddress,
        );

        if (ok && data.status === "success" && data.session?.url) {
          toast.success("Redirecting to payment", {
            description: "Please wait while we redirect you...",
            position: "top-center",
          });
          window.location.href = data.session.url;
        } else {
          toast.error("Failed to initiate payment", {
            description: data.message || "Please try again",
            position: "top-center",
          });
        }
      }
    } catch (error) {
      console.error("Order submission error:", error);
      toast.error("Something went wrong", {
        description: "Please try again later",
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Shipping Address
          </DialogTitle>
          <DialogDescription className="flex items-center gap-2 mt-2">
            {paymentMethod === "cash" ? (
              <>
                <Banknote className="h-4 w-4" />
                Cash on Delivery
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4" />
                Credit/Debit Card Payment
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          {/* Address Details */}
          <Field>
            <FieldLabel htmlFor="details">Address Details</FieldLabel>
            <FieldGroup>
              <Controller
                name="details"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="details"
                    placeholder="Building number, street name, landmarks..."
                    disabled={isLoading}
                  />
                )}
              />
            </FieldGroup>
            {errors.details && (
              <FieldError>{errors.details.message}</FieldError>
            )}
          </Field>

          {/* City */}
          <Field>
            <FieldLabel htmlFor="city">City</FieldLabel>
            <FieldGroup>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="city"
                    placeholder="Cairo"
                    disabled={isLoading}
                  />
                )}
              />
            </FieldGroup>
            {errors.city && <FieldError>{errors.city.message}</FieldError>}
          </Field>

          {/* Phone Number */}
          <Field>
            <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
            <FieldGroup>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="phone"
                    type="tel"
                    placeholder="01010800921"
                    disabled={isLoading}
                  />
                )}
              />
            </FieldGroup>
            {errors.phone && <FieldError>{errors.phone.message}</FieldError>}
          </Field>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  {paymentMethod === "cash"
                    ? "Place Order"
                    : "Proceed to Payment"}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
