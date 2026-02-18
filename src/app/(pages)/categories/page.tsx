import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CategoriesRes } from "@/interfaces/CategoriesInterfaces";
import { ArrowRight, Grid3X3, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function CategoriesPage() {
  const response = await fetch(`${process.env.API_URL}/api/v1/categories`, {
    next: { revalidate: 600 },
  });
  const data: CategoriesRes = await response.json();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto text-center">
          <Badge className="mb-4 px-4 py-1 bg-primary/10 text-primary hover:bg-primary/20">
            <Sparkles className="mr-2 h-4 w-4" />
            Explore Our Collection
          </Badge>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Discover by{" "}
            <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Category
            </span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse through our carefully curated categories to find exactly what
            you need. From electronics to fashion, we've got you covered.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold">
            All Categories
            <Badge variant="secondary" className="ml-3">
              {data.results}
            </Badge>
          </h2>
          <p className="text-muted-foreground mt-2">
            Click on any category to explore products
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {data.data.map((category) => (
            <Link
              href={`/categories/${category._id}`}
              key={category._id}
              className="group"
            >
              <div className="bg-background rounded-2xl  border border-primary/30 overflow-hidden hover:shadow-2xl hover:shadow-primary/10 hover:border-accent transition-all duration-300 hover:-translate-y-1">
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 to-black/10" />
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-1">
                      {category.name}
                    </h3>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {data.data.length === 0 && (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-secondary/20 rounded-full flex items-center justify-center mb-6">
              <Grid3X3 className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              No Categories Available
            </h3>
            <p className="text-muted-foreground mb-6">
              Check back soon for new categories!
            </p>
            <Button asChild>
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        )}

        {/* CTA Section */}
        {data.data.length > 0 && (
          <div className="mt-16 text-center">
            <div className="inline-block p-8 bg-linear-to-r from-primary/5 to-primary/10 rounded-2xl border border-primary/20 max-w-2xl">
              <h3 className="text-2xl font-bold mb-3">
                Can't find what you're looking for?
              </h3>
              <p className="text-muted-foreground mb-6">
                Browse all products or use our advanced search
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
