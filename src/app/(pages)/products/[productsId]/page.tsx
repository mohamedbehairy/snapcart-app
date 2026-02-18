import NotFound from "@/app/not-found";
import AddToCart from "@/components/AddToCart/AddToCart";
import AddToWishlist from "@/components/AddtoWishlist/AddtoWishlist";
import Slider from "@/components/Slider/Slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product } from "@/interfaces/productInterfaces";
import {
  AlertCircle,
  Heart,
  RefreshCw,
  Shield,
  Star,
  Truck,
} from "lucide-react";
import { Params } from "next/dist/server/request/params";
import { formatPrice } from "@/Helpers/formatPrice";

export default async function ProductDetails({ params }: { params: Params }) {
  const { productsId } = await params;

  const response = await fetch(
    `${process.env.API_URL}/api/v1/products/${productsId}`,
  );
  const data: { data: Product } = await response.json();
  const product = data.data;

  // Check if product data exists
  if (!data || !data.data) {
    return NotFound(); // Redirect to 404 page
  }

  // Check if product is out of stock
  const isOutOfStock = product?.quantity === 0;

  return (
    <section className="min-h-screen bg-background">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section - Improved for mobile */}
          <div className="flex justify-center relative">
            <div className="w-full max-w-md sm:max-w-lg aspect-square overflow-hidden rounded-lg mx-0 sm:mx-4">
              {/* slider */}
              <Slider images={product.images} title={product.title} />
            </div>

            {/* Out of Stock Badge on Image */}
            {isOutOfStock && (
              <div className="absolute top-4 left-4 sm:left-6">
                <Badge
                  variant="destructive"
                  className="px-3 py-1 text-xs sm:text-sm"
                >
                  <AlertCircle size={12} className="mr-1" />
                  Out of Stock
                </Badge>
              </div>
            )}
          </div>

          {/* Details Section - Improved padding for mobile */}
          <div className="space-y-5 px-4 sm:px-0">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <h1 className="text-xl sm:text-2xl font-semibold text-foreground">
                  {product.title}
                </h1>

                {/* Out of Stock Badge near Title */}
                {isOutOfStock && (
                  <Badge variant="destructive" className="text-xs">
                    Sold Out
                  </Badge>
                )}
              </div>

              <div className="space-y-1 mb-4">
                <p className="text-sm text-muted-foreground">
                  Brand:
                  <span className="font-medium ml-0.5">
                    {product.brand.name}
                  </span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Category:
                  <span className="font-medium ml-0.5">
                    {product.category.name}
                  </span>
                </p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex">
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
              </div>
              <span className="text-sm text-muted-foreground">
                ({product.ratingsQuantity} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="text-2xl sm:text-3xl font-bold text-foreground">
              {formatPrice(product.price)}
            </div>

            {/* Stock Information with Badge */}
            <div className="flex items-center gap-3">
              {isOutOfStock ? (
                <Badge variant="destructive" className="gap-1 py-1 px-3">
                  <AlertCircle size={12} />
                  <span className="text-xs sm:text-sm">
                    Currently Unavailable
                  </span>
                </Badge>
              ) : (
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 hover:bg-green-100 py-1 px-3"
                >
                  <span className="text-xs sm:text-sm">
                    {product.quantity} items available
                  </span>
                </Badge>
              )}
            </div>

            {/* Description */}
            <div className="pt-3">
              <h3 className="text-sm font-medium text-foreground mb-2">
                Description
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-4">
              <AddToCart
                productId={product.id}
                disabled={isOutOfStock}
                variant={isOutOfStock ? "destructive" : "default"}
                size="lg"
                className="flex-1 h-11 sm:h-12"
              >
                {isOutOfStock ? "Out of Stock" : "Add to Cart"}
              
              {/* //& Add To Cart */}
              </AddToCart>


              {/* //& Add To Wishlist */}
              <AddToWishlist
                productId={product.id}
                className="w-10 h-10 sm:w-11 sm:h-11 shadow-md"
              />
              
            </div>

            {/* Stock Alert Message */}
            {isOutOfStock && (
              <div className="p-3 sm:p-4 bg-red-50 border border-red-200 rounded-md">
                <div className="flex items-start gap-2 text-sm text-red-700">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  <span>
                    This product is currently out of stock. Check back later or
                    add to wishlist.
                  </span>
                </div>
              </div>
            )}

            {/* Features */}
            <div className="space-y-3 pt-5 border-t border-border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Truck size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Free Shipping
                  </p>
                  <p className="text-xs text-muted-foreground">
                    On orders over EGP 500
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <RefreshCw size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Easy Returns
                  </p>
                  <p className="text-xs text-muted-foreground">
                    30-day return policy
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Shield size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Secure Payment
                  </p>
                  <p className="text-xs text-muted-foreground">
                    100% secure transactions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
