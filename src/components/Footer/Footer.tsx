import {
  CreditCard,
  Facebook,
  Heart,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Shield,
  ShoppingBag,
  Tag,
  Truck,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-linear-to-b from-background to-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        {/* Main Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Brand & Social */}
          <div className="sm:col-span-3 lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center justify-center w-11 h-11 rounded-xl bg-linear-to-br from-primary to-primary/60 text-white shadow-md">
                <span className="text-lg font-bold">SC</span>
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  SnapCart
                </h2>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">
                  Your smart shopping destination
                </p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              Discover the best deals on fashion, electronics, and more. Shop
              with confidence with secure payments and fast delivery across
              Egypt.
            </p>

            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-secondary/40 hover:bg-primary/10 transition-all duration-300 group"
              >
                <Facebook className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-secondary/40 hover:bg-primary/10 transition-all duration-300 group"
              >
                <Instagram className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-secondary/40 hover:bg-primary/10 transition-all duration-300 group"
              >
                <Linkedin className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Shop
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/products"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition"
                >
                  <ShoppingBag className="w-4 h-4" />
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition"
                >
                  <Tag className="w-4 h-4" />
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/brands"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition"
                >
                  <Users className="w-4 h-4" />
                  Brands
                </Link>
              </li>
              <li>
                <Link
                  href="/wishlist"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition"
                >
                  <Heart className="w-4 h-4" />
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/contact"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition"
                >
                  <Mail className="w-4 h-4" />
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition"
                >
                  <Shield className="w-4 h-4" />
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition"
                >
                  <Truck className="w-4 h-4" />
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition"
                >
                  <CreditCard className="w-4 h-4" />
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/about"
                  className="block text-sm text-muted-foreground hover:text-primary transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="block text-sm text-muted-foreground hover:text-primary transition"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="block text-sm text-muted-foreground hover:text-primary transition"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/mission"
                  className="block text-sm text-muted-foreground hover:text-primary transition"
                >
                  Mission
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 border-t border-border pt-8">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 shrink-0">
                <Phone className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  Call Us
                </p>
                <p className="text-sm font-medium text-primary mt-1">
                  +20 10 2761 2644
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 shrink-0">
                <Mail className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  Email
                </p>
                <p className="text-sm font-medium text-primary mt-1 break-all">
                  support@snapcart.com
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 shrink-0">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  Address
                </p>
                <p className="text-sm font-medium text-primary mt-1">
                  123 Shop St, October City
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-xs text-muted-foreground">
            © {currentYear} SnapCart. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center md:justify-end gap-4 text-xs">
            <Link href="/privacy" className="hover:text-primary transition">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-primary transition">
              Terms
            </Link>
            <Link href="/cookies" className="hover:text-primary transition">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
