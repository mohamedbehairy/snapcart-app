import AddToCart from "@/components/AddToCart/AddToCart";
import AddToWishlist from "@/components/AddtoWishlist/AddtoWishlist";
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
import {
  AlertCircle,
  ArrowLeft,
  ShoppingCart as ShoppingCartIcon,
  Star,
  TrendingUp,
} from "lucide-react";
import { Params } from "next/dist/server/request/params";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/Helpers/formatPrice";

export default async function CategoryProductsPage({
  params,
}: {
  params: Params;
}) {
  const { categoryProducts } = await params;

  const response = await fetch(
    `${process.env.API_URL}/api/v1/products?category[in]=${categoryProducts}`,
    {
      next: { revalidate: 600 },
    },
  );

  const data: ProductsResponse = await response.json();

  return (
    <div className="px-4 py-8 md:py-12">
      {/* Header */}
      <div className="mb-6 md:mb-10">
        <div className="flex items-end justify-between mb-3">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
              {data?.data?.[0]?.category?.name || "Products"}
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Browse our collection of quality products
            </p>
          </div>
          <Badge variant="secondary" className="text-sm px-3 py-1">
            {data?.results} Items
          </Badge>
        </div>
        <div className="h-px bg-linear-to-r from-primary/50 via-primary/20 to-transparent" />
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
        {data?.data?.map((product) => {
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
          <div className="mx-auto w-24 h-24 bg-secondary/20 rounded-full flex items-center justify-center mb-6">
            <ShoppingCartIcon size={40} className="text-muted-foreground" />
          </div>
          <h3 className="text-2xl font-bold mb-2">No Products Available</h3>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            This category does not have any products at the moment. Please check
            back later or browse other categories.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="gap-2">
              <Link href="/categories">
                <ArrowLeft size={18} />
                Browse All Categories
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="gap-2">
              <Link href="/products">
                <ShoppingCartIcon size={18} />
                View All Products
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
