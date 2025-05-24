"use client"
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Bone } from "lucide-react";
import { Mr_Dafoe } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import GridHome from "./_components/GridHome";
import TrendingHome from "./_components/TrendingHome";
import DealsHome from "./_components/DealsHome";
import SolutionsHome from "./_components/SolutionsHome";
import TestimonialsHome from "./_components/TestimonialsHome";
import NutritionalHome from "./_components/NutritionalHome";


const mrdafoe = Mr_Dafoe({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {

  return (
    <div>
      <Carousel className="w-full">
        <CarouselContent>
          <CarouselItem className={"w-full"}>
            <div className="bg-[url('/perrito.webp')] bg-cover bg-center  h-fit  pt-30 pb-50 ">
              <div className="">
                <div className="contenedor h-full flex flex-col justify-center">
                  <h3
                    className={`${mrdafoe.className} text-3xl text-red-700 flex gap-3 items-center `}
                  >
                    <Bone className="w-[40px] h-[40px] " />
                    Hight rated pet products!
                  </h3>
                  <h1 className="text-4xl md:text-[96px] mt-5 font-bold w-2/3 ">
                    Feed them Elite formulas
                  </h1>
                  <p className="text-gray-500 text-lg mt-10">
                    Fuel your dog with the gold standard of performance
                    nutrition.{" "}
                  </p>
                  <Link className="mt-10" href="/">
                    <Button>Comprar Ahora</Button>
                  </Link>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="p-1"></div>
          </CarouselItem>
          <CarouselItem>
            <div className="p-1"></div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <GridHome />
      <TrendingHome />
      <DealsHome />
      <SolutionsHome />
      <TestimonialsHome />
      <NutritionalHome />
    </div>
  );
}
