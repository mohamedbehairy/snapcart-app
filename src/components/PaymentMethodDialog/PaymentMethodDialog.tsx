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
import { Badge } from "@/components/ui/badge";
import { CreditCard, Banknote, CheckCircle2, ArrowRight } from "lucide-react";
import AddressFormDialog from "../AddressFormDialog/AddressFormDialog";

interface PaymentMethodDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cartId: string;
}

type PaymentMethod = "cash" | "visa" | null;

export default function PaymentMethodDialog({
  open,
  onOpenChange,
  cartId,
}: PaymentMethodDialogProps) {
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);

  const handleContinue = () => {
    if (selectedPayment) {
      onOpenChange(false);
      setShowAddressForm(true);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Choose Payment Method</DialogTitle>
            <DialogDescription>
              Select how you'd like to complete your purchase
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 mt-4">
            {/* Cash on Delivery */}
            <button
              onClick={() => setSelectedPayment("cash")}
              className={`
                w-full p-4 rounded-xl border-2 transition-all text-left
                ${
                  selectedPayment === "cash"
                    ? "border-primary bg-primary/5"
                    : "border-accent hover:border-primary/40 hover:bg-accent/5"
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`
                      w-12 h-12 rounded-lg flex items-center justify-center shrink-0
                      ${selectedPayment === "cash" ? "bg-green-500/10" : "bg-green-500/10"}
                    `}
                  >
                    <Banknote className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base">
                      Cash on Delivery
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Pay when you receive
                    </p>
                  </div>
                </div>
                {selectedPayment === "cash" && (
                  <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                )}
              </div>
            </button>

            {/* Credit/Debit Card */}
            <button
              onClick={() => setSelectedPayment("visa")}
              className={`
                w-full p-4 rounded-xl border-2 transition-all text-left
                ${
                  selectedPayment === "visa"
                    ? "border-primary bg-primary/5"
                    : "border-accent hover:border-primary/40 hover:bg-accent/5"
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`
                      w-12 h-12 rounded-lg flex items-center justify-center shrink-0
                      ${selectedPayment === "visa" ? "bg-blue-500/10" : "bg-blue-500/10"}
                    `}
                  >
                    <CreditCard className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base">
                      Credit/Debit Card
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Pay securely online
                    </p>
                    <div className="flex gap-1.5 mt-1.5">
                      <Badge
                        variant="outline"
                        className="text-[10px] px-1.5 py-0"
                      >
                        Visa
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-[10px] px-1.5 py-0"
                      >
                        Mastercard
                      </Badge>
                    </div>
                  </div>
                </div>
                {selectedPayment === "visa" && (
                  <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                )}
              </div>
            </button>
          </div>

          {/* Continue Button */}
          <Button
            onClick={handleContinue}
            disabled={!selectedPayment}
            size="lg"
            className="w-full gap-2 mt-6"
          >
            Continue to Shipping
            <ArrowRight className="h-4 w-4" />
          </Button>
        </DialogContent>
      </Dialog>

      {/* Address Form Dialog */}
      <AddressFormDialog
        open={showAddressForm}
        onOpenChange={setShowAddressForm}
        paymentMethod={selectedPayment}
        cartId={cartId}
      />
    </>
  );
}
