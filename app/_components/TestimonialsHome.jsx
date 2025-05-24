import { Quote } from "lucide-react";
import { Mr_Dafoe } from "next/font/google";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import TestimonialCard from "./testimonials/TestimonialCard";
import BrandCard from "./brands/BrandCard";

const mrdafoe = Mr_Dafoe({
  weight: "400",
  subsets: ["latin"],
});

const TestimonialsHome = () => {
  return (
    <div class="bg-[url('/Mask_group_6.webp')] bg-cover  h-fit pt-30 pb-50 ">
      <div className="contenedor py-5 flex flex-col items-center gap-4 ">
        <Quote className="w-10 h-10 text-[#D32300]  " />
        <h1 className="text-3xl text-center font-bold text-white">
          What Pet Parents Are Saying
        </h1>
        <h3
          className={`${mrdafoe.className} text-3xl text-red-700 flex gap-3 items-center `}
        >
          Reviews and awards
        </h3>

        <Carousel className={"w-full mt-5"}>
          <CarouselContent>
            <CarouselItem className="md:basis-1/2">
              <TestimonialCard />
            </CarouselItem>
            <CarouselItem className="md:basis-1/2">
              <TestimonialCard />
            </CarouselItem>
            <CarouselItem className="md:basis-1/2">
              <TestimonialCard />
            </CarouselItem>
            <CarouselItem className="md:basis-1/2">
              <TestimonialCard />
            </CarouselItem>
            <CarouselItem className="md:basis-1/2">
              <TestimonialCard />
            </CarouselItem>
            <CarouselItem className="md:basis-1/2">
              <TestimonialCard />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div className="grid grid-cols-2 md:grid-cols-6 w-full gap-5 mt-10">
          <BrandCard />
          <BrandCard />
          <BrandCard />
          <BrandCard />
          <BrandCard />
          <BrandCard />
        </div>
      </div>
    </div>
  );
};

export default TestimonialsHome;
