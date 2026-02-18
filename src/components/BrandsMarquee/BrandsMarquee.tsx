"use client";

import Marquee from "react-fast-marquee";
import Image from "next/image";
import Link from "next/link";
import { BrandsResponse } from "@/interfaces/BrandsInterfaces";
import { ArrowRight } from "lucide-react";

export default function BrandsMarquee({ brands }: { brands: BrandsResponse }) {
  return (
    <section className="py-12 bg-background border-y border-border mb-10">
      {/* Header */}
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-0 mb-8 sm:mb-10">
          <div>
            <p className="text-xs sm:text-sm font-medium text-primary mb-1 uppercase tracking-widest">
              Our Partners
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Featured Brands
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">
              Explore our collection of premium brands
            </p>
          </div>

          <Link
            href="/brands"
            className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors self-start sm:self-auto"
          >
            View All
            <span className="w-7 h-7 flex items-center justify-center transition">
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        </div>
      </div>

      {/* Marquee */}
      <Marquee
        speed={100}
        loop={0}
        gradient
        gradientWidth={150}
        gradientColor="#f8f6f2"
      >
        {brands.data.map((brand) => (
          <Link key={brand._id} href={`/brands/${brand._id}`} className="mx-8">
            <div className="relative h-35 w-40">
              <Image
                src={brand.image}
                alt={brand.name}
                fill
                className="object-contain"
              />
            </div>
          </Link>
        ))}
      </Marquee>
    </section>
  );
}
