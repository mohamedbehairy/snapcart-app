"use client";

import { AddressesResponse } from "@/interfaces/ProfileInterfaces";
import { useState } from "react";
import AddAddressForm from "../AddAddressForm/AddAddressForm";
import AddressCard from "../AddressCard/AddressCard";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { MapPinOff, Plus } from "lucide-react";

export default function Addresses({ data }: { data: AddressesResponse }) {
  const [addressesData, setAddressesData] = useState<AddressesResponse | null>(
    data,
  );

  const [open, setOpen] = useState(false);

  const addresses = addressesData?.data ?? [];

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-6 sm:py-8 px-4 max-w-4xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-1">
              My Addresses
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage your shipping addresses
            </p>
          </div>

          {addresses.length > 0 && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="gap-2 w-full sm:w-auto">
                  <Plus className="h-4 w-4" />
                  Add Address
                </Button>
              </DialogTrigger>

              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Add New Address</DialogTitle>
                  <DialogDescription>
                    Fill in the details below to save a new address.
                  </DialogDescription>
                </DialogHeader>

                <AddAddressForm
                  setAddressesData={(data) => {
                    setAddressesData(data);
                    setOpen(false);
                  }}
                />
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Addresses List or Empty State */}
        {addresses.length === 0 ? (
          <Card className="border-2 border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 sm:py-16 px-4">
              {/* Icon */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4 sm:mb-6">
                <MapPinOff className="h-10 w-10 sm:h-12 sm:w-12 text-primary/60" />
              </div>

              {/* Text */}
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-center">
                No Addresses Yet
              </h3>
              <p className="text-sm text-muted-foreground text-center mb-6 sm:mb-8 max-w-sm">
                You haven't added any shipping addresses yet. Add your first
                address to get started.
              </p>

              {/* Add Button */}
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="gap-2">
                    <Plus className="h-5 w-5" />
                    Add Your First Address
                  </Button>
                </DialogTrigger>

                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Add New Address</DialogTitle>
                    <DialogDescription>
                      Fill in the details below to save a new address.
                    </DialogDescription>
                  </DialogHeader>

                  <AddAddressForm
                    setAddressesData={(data) => {
                      setAddressesData(data);
                      setOpen(false);
                    }}
                  />
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {addresses.map((addr) => (
              <AddressCard
                key={addr._id}
                address={addr}
                setAddressesData={setAddressesData}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
