import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BrandsResponse } from "@/interfaces/BrandsInterfaces";
import { ArrowRight, Grid3X3, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function BrandsPage() {
  const response = await fetch(`${process.env.API_URL}/api/v1/brands`, {
    next: { revalidate: 600 },
  });
  const data: BrandsResponse = await response.json();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="container px-4 py-10">
        <div className="max-w-3xl mx-auto text-center">
          <Badge className="mb-4 px-4 py-1 bg-primary/10 text-primary hover:bg-primary/20">
            <Sparkles className="mr-2 h-4 w-4" />
            Explore Our Brands
          </Badge>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Shop by{" "}
            <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Brand
            </span>
          </h1>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover products from {data.metadata.limit} trusted brands. Quality
            and authenticity guaranteed.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container px-4 pb-16">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold">
            All Brands
            <Badge variant="secondary" className="ml-3">
              {data.metadata.limit}
            </Badge>
          </h2>
          <p className="text-muted-foreground mt-2">
            Click on any brand to explore products
          </p>
        </div>

        {/* Brands Grid */}
        {data.data && data.data.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {data.data.map((brand) => (
              <Link
                href={`/brands/${brand._id}`}
                key={brand._id}
                className="group"
              >
                <div className="bg-background rounded-xl border border-primary/30 overflow-hidden hover:shadow-lg hover:border-primary/40 transition-all duration-300 hover:-translate-y-1">
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden bg-secondary/10">
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      fill
                      className="object-contain group-hover:scale-110 transition-transform duration-500 p-3"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4 bg-secondary/5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-1">
                        {brand.name}
                      </h3>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                    </div>
                  </div>

                  {/* Hover Border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-xl transition-colors pointer-events-none" />
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {(!data.data || data.data.length === 0) && (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-secondary/20 rounded-full flex items-center justify-center mb-6">
              <Grid3X3 className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Brands Available</h3>
            <p className="text-muted-foreground mb-6">
              Check back soon for new brands!
            </p>
            <Button asChild>
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        )}

        {/* CTA Section */}
        {data.data && data.data.length > 0 && (
          <div className="mt-16 text-center">
            <div className="inline-block p-8 bg-linear-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/20 max-w-2xl">
              <h3 className="text-2xl font-bold mb-3">
                Can't find your favorite brand?
              </h3>
              <p className="text-muted-foreground mb-6">
                Browse all products or contact us for special requests
              </p>
              <Button size="lg" asChild className="gap-2">
                <Link href="/products">
                  View All Products
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
