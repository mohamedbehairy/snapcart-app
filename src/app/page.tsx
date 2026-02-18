import BrandsSlider from "@/components/BrandsSlider/BrandsSlider";
import FeaturedProducts from "@/components/FeaturedProducts/FeaturedProducts";
import StatsSection from "@/components/StatsSection/StatsSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Shield,
  ShoppingBag,
  Sparkles,
  Tag,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 md:py-35 lg:py-15 md:mb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left space-y-6">
              <Badge className="w-fit mx-auto lg:mx-0 px-4 py-1 bg-primary/10 text-primary hover:bg-primary/20">
                <Sparkles className="mr-2 h-4 w-4" />
                New Arrivals {typeof window !== 'undefined' ? new Date().getFullYear() : 2024}
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                Everything You Need
                <span className="block text-primary mt-2">
                  In One Smart Place
                </span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                Shop the latest fashion trends and cutting-edge electronics.
                Premium quality, great prices, and products you can trust.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                <Button size="lg" asChild className="gap-2">
                  <Link href="/products">
                    <ShoppingBag className="h-5 w-5" />
                    Shop Now
                  </Link>
                </Button>
                <Button size="lg" variant="secondary" asChild className="gap-2">
                  <Link href="/categories">
                    <Tag className="h-5 w-5" />
                    Browse Categories
                  </Link>
                </Button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="flex-1">
              <div className="relative mx-auto w-full max-w-xl aspect-square overflow-hidden rounded-2xl shadow-xl group">
                <Image
                  src="/home3.jpg"
                  alt="Shopping Collection"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Features Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Choose SnapCart
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We&apos;re committed to providing the best shopping experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-background rounded-xl border border-border hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Free Shipping
              </h3>
              <p className="text-muted-foreground">
                Free delivery on all orders over EGP 500. Fast and reliable
                shipping across Egypt.
              </p>
            </div>

            <div className="text-center p-6 bg-background rounded-xl border border-border hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Secure Shopping
              </h3>
              <p className="text-muted-foreground">
                100% secure payment with SSL encryption. Your data is always
                protected.
              </p>
            </div>

            <div className="text-center p-6 bg-background rounded-xl border border-border hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Quality Guarantee
              </h3>
              <p className="text-muted-foreground">
                30-day return policy. We stand behind the quality of every
                product.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Brands Slider */}
      <BrandsSlider />

      {/* CTA Section */}
      <section className="py-16 my-10 bg-linear-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us for their
            shopping needs.
          </p>
          <Button size="lg" asChild className="gap-2">
            <Link href="/products">
              Start Shopping
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
