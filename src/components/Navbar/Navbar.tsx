"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Heart, Menu, ShoppingCartIcon, User2Icon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "../ui/badge";
import { useEffect, useState } from "react";
import { getCartAction } from "@/actions/CartActions.action";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const [CartNumbers, setCartNumbers] = useState(0);
  async function getCartItems() {
    if (!session) return;
    try {
      const { data, ok } = await getCartAction();

      if (ok) {
        setCartNumbers(data?.numOfCartItems ?? 0);

        if (data?.data?._id) {
          localStorage.setItem("userId", data.data.cartOwner);
        }

        return;
      }
    } catch (error) {
      console.error("getting cart item error:", error);
    }
  }
  useEffect(() => {
    function handler(e: CustomEvent) {
      setCartNumbers(e.detail);
    }
    window.addEventListener("cartUpdated", handler as EventListener);
    getCartItems();

    return () => {
      window.removeEventListener("cartUpdated", handler as EventListener);
    };
  }, [session]);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/categories", label: "Categories" },
    { href: "/brands", label: "Brands" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b shadow-sm bg-background border-border">
      <div className="container flex items-center justify-between h-16 px-2 md:px-0">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/SC Icon 2.png"
              alt="SnapCart Logo"
              width={50}
              height={50}
              className="object-contain"
            />
            <h1 className="hidden text-lg font-bold tracking-widest text-foreground md:block drop-shadow-md">
              SnapCart
            </h1>
          </Link>
        </div>

        {/* Nav Links - Center */}
        <div className="absolute hidden gap-6 font-medium transform -translate-x-1/2 md:flex left-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                isActive(link.href)
                  ? "bg-card text-black font-medium"
                  : "hover:bg-card text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Icons - Right */}
        <div className="flex items-center gap-2 sm:gap-3">
          {session && (
            <>
              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2 transition-colors rounded-lg hover:bg-card"
                aria-label="Shopping Cart"
              >
                <ShoppingCartIcon className="w-5 h-5" />
                {CartNumbers > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 min-w-4 px-1 flex items-center justify-center text-[10px] rounded-full">
                    {CartNumbers}
                  </Badge>
                )}
              </Link>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative p-2 transition-colors rounded-lg hover:bg-card"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
              </Link>
            </>
          )}

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="p-2 transition-colors rounded-lg hover:bg-card"
                aria-label="User Menu"
              >
                <User2Icon className="w-5 h-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuGroup>
                {session ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/allorders" className="cursor-pointer">
                        Orders
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => {
                        localStorage.removeItem("userId");

                        signOut({
                          callbackUrl: "/",
                        });
                      }}
                    >
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/login" className="cursor-pointer">
                        Login
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/register" className="cursor-pointer">
                        Register
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="p-2 transition-colors rounded-lg md:hidden hover:bg-card"
                aria-label="Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48" align="end">
              <DropdownMenuGroup>
                {navLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link
                      href={link.href}
                      className={`cursor-pointer px-3 py-2 rounded-lg transition-colors ${
                        isActive(link.href)
                          ? "bg-accent text-black"
                          : "hover:bg-card text-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
