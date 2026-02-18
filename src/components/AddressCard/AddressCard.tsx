"use client";

import { DeleteAddressAction } from "@/actions/ProfileActions.action";
import { Address, AddressesResponse } from "@/interfaces/ProfileInterfaces";
import { Building2, Home, Loader2, MapPin, Phone, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

export default function AddressCard({
  address,
  setAddressesData,
}: {
  address: Address;
  setAddressesData: React.Dispatch<
    React.SetStateAction<AddressesResponse | null>
  >;
}) {
  const [isLoading, setIsLoading] = useState(false);

  async function removeAddress() {
    try {
      setIsLoading(true);

      const { data, ok } = await DeleteAddressAction(address._id);

      if (ok) {
        toast.success("Address removed", {
          position: "top-center",
        });

        setAddressesData(data);

        return;
      }

      toast.error(data?.message || "Failed to delete address");
    } catch (error) {
      toast.error("Unexpected error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="group relative border border-accent rounded-xl p-4 sm:p-5 hover:border-accent/40 hover:shadow-lg transition-all duration-300 bg-card">
      {/* Header with Icon and Delete Button */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {/* Icon */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
            <Home className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>

          {/* Name and Badge */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="font-bold text-base sm:text-lg text-foreground truncate">
                {address.name}
              </h3>
            </div>
          </div>
        </div>

        {/* Delete Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={removeAddress}
          disabled={isLoading}
          className="shrink-0 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/40 transition-all"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Address Details */}
      <div className="space-y-2.5 sm:space-y-3">
        {/* Details */}
        <div className="flex items-start gap-2.5 sm:gap-3">
          <div className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center shrink-0">
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground mb-0.5">Address</p>
            <p className="text-sm font-medium text-foreground break-words">
              {address.details}
            </p>
          </div>
        </div>

        {/* City */}
        <div className="flex items-start gap-2.5 sm:gap-3">
          <div className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center shrink-0">
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground mb-0.5">City</p>
            <p className="text-sm font-medium text-foreground">
              {address.city}
            </p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-2.5 sm:gap-3">
          <div className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center shrink-0">
            <Phone className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground mb-0.5">Phone</p>
            <p className="text-sm font-medium text-foreground direction-ltr">
              {address.phone}
            </p>
          </div>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
}
