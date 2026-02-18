import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProductsResponse } from "@/interfaces/productInterfaces";
import { AlertCircle, ArrowRight, Star, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AddToCart from "@/components/AddToCart/AddToCart";
import AddToWishlist from "@/components/AddtoWishlist/AddtoWishlist";
import { formatPrice } from "@/Helpers/formatPrice";

export default async function FeaturedProducts() {
  const response = await fetch(
    `${process.env.API_URL}/api/v1/products?sort=ratingsAverage&limit=4`,
    { next: { revalidate: 600 } },
  );

  const data: ProductsResponse = await response.json();

  if (!data?.data?.length) return null;

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-0 mb-8 sm:mb-10">
          <div>
            <p className="text-xs sm:text-sm font-medium text-primary mb-1 uppercase tracking-widest">
              Hand Picked For You
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Featured Products
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">
              Top rated items our customers love
            </p>
          </div>

          <Link
            href="/products"
            className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors self-start sm:self-auto"
          >
            View All
            <span className="w-7 h-7 flex items-center justify-center transition">
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
          {data.data.map((product) => {
            const isOutOfStock = product.quantity === 0;

            return (
              <Card
                key={product.id}
                className={`relative pt-0 overflow-hidden transition-all group border-border bg-card hover:shadow-xl ${
                  isOutOfStock ? "opacity-80" : ""
                }`}
              >
                <div className="relative w-full overflow-hidden aspect-square">
                  <Link href={`/products/${product.id}`}>
                    <Image
                      src={product.imageCover}
                      alt={product.title}
                      fill
                      className={`object-cover transition-transform duration-500 group-hover:scale-103 ${
                        isOutOfStock ? "grayscale" : ""
                      }`}
                    />
                  </Link>

                  {/* Badges*/}
                  <div className="absolute z-10 flex flex-col gap-1 top-3 left-3">
                    {product.ratingsAverage >= 4 && (
                      <Badge className="text-white border-0 bg-amber-500 hover:bg-amber-600">
                        <Star size={12} className="mr-1" />
                        Top Rated
                      </Badge>
                    )}
                    {product.sold > 10000 && (
                      <Badge className="text-white bg-red-500 border-0 hover:bg-red-600">
                        <TrendingUp size={12} className="mr-1" />
                        Hot Sale
                      </Badge>
                    )}
                    {isOutOfStock && (
                      <Badge variant="destructive" className="border-0">
                        <AlertCircle size={12} className="mr-1" />
                        Out of Stock
                      </Badge>
                    )}
                  </div>

                  <div className="absolute z-10 top-3 right-3">
                    <AddToWishlist
                      productId={product.id}
                      className="w-8 h-8 shadow-md"
                    />
                  </div>

                  {/* Category Badge */}
                  <div className="absolute bottom-3 left-3">
                    <Badge
                      variant="outline"
                      className={`bg-white/90 backdrop-blur-sm ${
                        isOutOfStock ? "border-red-200 text-red-600" : ""
                      }`}
                    >
                      {product.category.name}
                    </Badge>
                  </div>
                </div>

                <Link href={`/products/${product.id}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-sm font-semibold sm:text-base line-clamp-1">
                        {product.title}
                      </CardTitle>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={
                              i < Math.round(product.ratingsAverage)
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-muted-foreground"
                            }
                          />
                        ))}
                      </span>
                      <span className="text-xs text-muted-foreground hidden sm:inline">
                        ({product.ratingsQuantity} reviews)
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="mt-2">
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold sm:text-xl text-foreground">
                        {formatPrice(product.price)}
                      </div>
                      <Badge
                        variant="secondary"
                        className="text-xs hidden sm:inline-flex"
                      >
                        {product.brand.name}
                      </Badge>
                    </div>
                  </CardContent>
                </Link>

                <CardFooter className="pt-0">
                  <AddToCart
                    productId={product.id}
                    disabled={isOutOfStock}
                    variant={isOutOfStock ? "destructive" : "default"}
                    className="w-full"
                  >
                    {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                  </AddToCart>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* View All Button for Mobile */}
        <div className="mt-10 text-center sm:hidden">
          <Button variant="outline" asChild className="gap-2">
            <Link href="/products">
              View All Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
