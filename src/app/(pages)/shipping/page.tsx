"use client";

import { Clock, CreditCard, MapPin, Package, Truck } from "lucide-react";
import Link from "next/link";

export default function ShippingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-accent shadow-xl p-6 sm:p-8">
          {/* Header */}
          <div className="text-center space-y-2 mb-8">
            <div className="inline-flex p-3 bg-primary/10 rounded-full mb-2">
              <Truck className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              Shipping Information
            </h1>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              Learn about our shipping methods, delivery times, and costs.
            </p>
          </div>

          {/* Shipping details grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* Delivery Time */}
            <div className="border border-border rounded-xl p-4 bg-background/50">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-sm sm:text-base mb-1">
                    Delivery Time
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Standard: 3–5 business days
                    <br />
                    Express: 1–2 business days
                  </p>
                </div>
              </div>
            </div>

            {/* Shipping Cost */}
            <div className="border border-border rounded-xl p-4 bg-background/50">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <CreditCard className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-sm sm:text-base mb-1">
                    Shipping Cost
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Standard: EGP 40
                    <br />
                    Express: EGP 80
                  </p>
                </div>
              </div>
            </div>

            {/* Free Shipping */}
            <div className="border border-border rounded-xl p-4 bg-background/50">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-sm sm:text-base mb-1">
                    Free Shipping
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    On orders over EGP 500
                  </p>
                </div>
              </div>
            </div>

            {/* Areas Served */}
            <div className="border border-border rounded-xl p-4 bg-background/50">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-sm sm:text-base mb-1">
                    Areas Served
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    All cities within Egypt
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="border border-border rounded-xl p-4 bg-background/50 mb-6">
            <h3 className="font-medium text-sm sm:text-base mb-2">
              Additional Information
            </h3>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Orders are processed within 24 hours.</li>
              <li>Tracking number will be sent via email once shipped.</li>
              <li>For remote areas, delivery may take 1–2 extra days.</li>
              <li>Cash on delivery available for all orders.</li>
            </ul>
          </div>

          {/* Footer Note */}
          <p className="text-xs text-center text-muted-foreground">
            Need help?{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
