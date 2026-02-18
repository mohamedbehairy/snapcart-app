import AddToCart from "@/components/AddToCart/AddToCart";
import AddToWishlist from "@/components/AddtoWishlist/AddtoWishlist";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatPrice } from "@/Helpers/formatPrice";
import { ProductsResponse } from "@/interfaces/productInterfaces";
import { AlertCircle, ShoppingCartIcon, Star, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default async function ProductsPage() {
  const response = await fetch(`${process.env.API_URL}/api/v1/products`, {
    next: { revalidate: 600 },
  });
  const data: ProductsResponse = await response.json();

  return (
    <section className="container min-h-screen bg-background">
      {/* Page Header */}
      <div className="overflow-hidden">
        <div className="container px-4 pt-10">
          <div className="max-w-2xl mx-auto text-center">
            {/* Badge */}
            <Badge className="mb-4 px-4 py-1 bg-primary/10 text-primary hover:bg-primary/20">
              <ShoppingCartIcon size={14} />
              Our Collection
            </Badge>

            <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-6xl text-foreground">
              Premium{" "}
              <span className="text-primary relative">
                Products
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-primary/40 rounded-full" />
              </span>
            </h1>

            <p className="mb-8 text-lg text-muted-foreground max-w-md mx-auto">
              Discover{" "}
              <span className="font-semibold text-foreground">
                {data.metadata.limit}
              </span>{" "}
              carefully curated items just for you
            </p>

            {/* Stats row */}
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Star size={15} className="text-amber-400 fill-amber-400" />
                <span>Top Rated</span>
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-1.5">
                <TrendingUp size={15} className="text-red-500" />
                <span>Best Sellers</span>
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-1.5">
                <ShoppingCartIcon size={15} className="text-accent" />
                <span>Free Shipping</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-12 ">
        {/* Showing items */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-foreground">All Products</h2>
          <p className="text-muted-foreground">
            Showing {data.metadata.limit} items
          </p>
        </div>
        {/* Product Cards */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
          {data?.data?.map((product) => {
            // Check if product is out of stock
            const isOutOfStock = product.quantity === 0;

            return (
              <Card
                key={product.id}
                className={`relative pt-0 overflow-hidden transition-all group border-border bg-card hover:shadow-xl ${
                  isOutOfStock ? "opacity-80" : ""
                }`}
              >
                <div className="relative w-full overflow-hidden aspect-square">
                  <Link href={`/products/` + product.id}>
                    <Image
                      src={product.imageCover}
                      alt={product.title}
                      fill
                      className={`object-cover transition-transform duration-500 group-hover:scale-103 ${
                        isOutOfStock ? "grayscale" : ""
                      }`}
                    />
                  </Link>

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
                    {/* //& Add To Wishlist */}

                    <AddToWishlist
                      productId={product.id}
                      className="w-8 h-8 shadow-md"
                    />
                  </div>

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
                <Link href={`/products/` + product.id}>
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

                  <CardContent className=" mt-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-bold sm:text-xl text-foreground">
                          {formatPrice(product.price)}
                        </div>
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

        {/* if No products found */}
        {data?.data?.length === 0 && (
          <div className="py-16 text-center">
            <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-card">
              <ShoppingCartIcon size={32} className="text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-foreground">
              No products found
            </h3>
            <p className="text-muted-foreground">
              Try refreshing the page or check back later.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
