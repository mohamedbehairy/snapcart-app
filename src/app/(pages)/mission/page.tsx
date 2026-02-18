import { Target, Heart, Shield, Zap, Globe } from "lucide-react";
import Link from "next/link";

export default function MissionPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-accent shadow-xl p-6 sm:p-8">
          {/* Header */}
          <div className="text-center space-y-2 mb-8">
            <div className="inline-flex p-3 bg-primary/10 rounded-full mb-2">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              Our Mission & Values
            </h1>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              What drives us every day to serve you better.
            </p>
          </div>

          {/* Mission Statement */}
          <div className="border border-border rounded-xl p-5 bg-background/50 mb-6">
            <h2 className="font-medium text-base mb-2">Our Mission</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              To make online shopping accessible, trustworthy, and delightful
              for everyone in Egypt by offering quality products at fair prices
              with exceptional service.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="border border-border rounded-xl p-4 bg-background/50">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-sm mb-1">Customer First</h3>
                  <p className="text-xs text-muted-foreground">
                    We put our customers at the heart of every decision.
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-border rounded-xl p-4 bg-background/50">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-sm mb-1">Trust & Security</h3>
                  <p className="text-xs text-muted-foreground">
                    Your privacy and data are always protected.
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-border rounded-xl p-4 bg-background/50">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-sm mb-1">Innovation</h3>
                  <p className="text-xs text-muted-foreground">
                    Constantly improving to make your experience better.
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-border rounded-xl p-4 bg-background/50">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-sm mb-1">Community</h3>
                  <p className="text-xs text-muted-foreground">
                    Building a positive impact in Egypt and beyond.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="text-xs text-center text-muted-foreground">
            Want to learn more?{" "}
            <Link href="/about" className="text-primary hover:underline">
              Read our story
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
