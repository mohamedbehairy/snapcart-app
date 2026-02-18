"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

export default function Slider({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  return (
    <>
      <Carousel
        plugins={[
          Autoplay({
            delay: 1500,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {images.map((img, i) => (
            <CarouselItem key={i}>
              <Image
                src={img}
                alt={title}
                width={200}
                height={400}
                className="w-full h-full object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
}
