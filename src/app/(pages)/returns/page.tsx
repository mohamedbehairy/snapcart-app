"use client";

import { Calendar, CheckCircle, RefreshCw, XCircle } from "lucide-react";
import Link from "next/link";

export default function ReturnsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-accent shadow-xl p-6 sm:p-8">
          {/* Header */}
          <div className="text-center space-y-2 mb-8">
            <div className="inline-flex p-3 bg-primary/10 rounded-full mb-2">
              <RefreshCw className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              Returns & Refunds
            </h1>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              Easy returns within 30 days. We're here to help.
            </p>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* Return Period */}
            <div className="border border-border rounded-xl p-4 bg-background/50">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-sm sm:text-base mb-1">
                    Return Period
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    You have 30 days from delivery date.
                  </p>
                </div>
              </div>
            </div>

            {/* Condition */}
            <div className="border border-border rounded-xl p-4 bg-background/50">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-sm sm:text-base mb-1">
                    Condition
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Items must be unused and in original packaging.
                  </p>
                </div>
              </div>
            </div>

            {/* Non-returnable */}
            <div className="border border-border rounded-xl p-4 bg-background/50">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <XCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-sm sm:text-base mb-1">
                    Non-returnable
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Perishable goods, intimate items, and gift cards.
                  </p>
                </div>
              </div>
            </div>

            {/* Process */}
            <div className="border border-border rounded-xl p-4 bg-background/50">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <RefreshCw className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-sm sm:text-base mb-1">
                    How to Return
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Contact support to initiate your return.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="border border-border rounded-xl p-5 bg-background/50 mb-6">
            <h3 className="font-medium text-base mb-3">
              Simple Return Process
            </h3>
            <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
              <li>
                Email us at{" "}
                <span className="text-primary">support@snapcart.com</span> with
                your order number and reason for return.
              </li>
              <li>We'll email you a return label within 24 hours.</li>
              <li>Pack the item securely and attach the label.</li>
              <li>Drop off the package at any courier location.</li>
              <li>
                Refund is processed within 5-7 business days after we receive
                the item.
              </li>
            </ol>
          </div>

          {/* Footer */}
          <p className="text-xs text-center text-muted-foreground">
            Questions?{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
