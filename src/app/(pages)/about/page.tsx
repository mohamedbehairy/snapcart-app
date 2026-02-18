import { Award, Heart, ShoppingBag, Store, Target, Users } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-accent shadow-xl p-6 sm:p-8">
          {/* Header */}
          <div className="text-center space-y-2 mb-8">
            <div className="inline-flex p-3 bg-primary/10 rounded-full mb-2">
              <Store className="w-6 h-6 text-primary" />{" "}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold">About SnapCart</h1>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              Your trusted online shopping destination since 2023.
            </p>
          </div>

          {/* Story */}
          <div className="border border-border rounded-xl p-5 bg-background/50 mb-6">
            <h2 className="font-medium text-base mb-2">Our Story</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              SnapCart was founded with a simple mission: to make online
              shopping easy, secure, and affordable for everyone in Egypt. We
              curate the best fashion and electronics from trusted brands, so
              you can shop with confidence.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="border border-border rounded-xl p-3 text-center bg-background/50">
              <ShoppingBag className="w-5 h-5 text-primary mx-auto mb-1" />
              <div className="text-lg font-semibold">10k+</div>
              <div className="text-xs text-muted-foreground">Products</div>
            </div>
            <div className="border border-border rounded-xl p-3 text-center bg-background/50">
              <Users className="w-5 h-5 text-primary mx-auto mb-1" />
              <div className="text-lg font-semibold">50k+</div>
              <div className="text-xs text-muted-foreground">Customers</div>
            </div>
            <div className="border border-border rounded-xl p-3 text-center bg-background/50">
              <Award className="w-5 h-5 text-primary mx-auto mb-1" />
              <div className="text-lg font-semibold">4.8</div>
              <div className="text-xs text-muted-foreground">Rating</div>
            </div>
            <div className="border border-border rounded-xl p-3 text-center bg-background/50">
              <Target className="w-5 h-5 text-primary mx-auto mb-1" />
              <div className="text-lg font-semibold">2023</div>
              <div className="text-xs text-muted-foreground">Founded</div>
            </div>
          </div>

          {/* Values */}
          <div className="border border-border rounded-xl p-5 bg-background/50 mb-6">
            <h2 className="font-medium text-base mb-3">Our Values</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-primary/10 rounded-lg mt-0.5">
                  <Heart className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Customer First</h3>
                  <p className="text-xs text-muted-foreground">
                    We put our customers at the heart of everything we do.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-primary/10 rounded-lg mt-0.5">
                  <Target className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Quality & Trust</h3>
                  <p className="text-xs text-muted-foreground">
                    We partner with trusted brands to ensure premium quality.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-primary/10 rounded-lg mt-0.5">
                  <Award className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Secure Shopping</h3>
                  <p className="text-xs text-muted-foreground">
                    Your data and payments are always protected.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="text-xs text-center text-muted-foreground">
            Want to know more?{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}