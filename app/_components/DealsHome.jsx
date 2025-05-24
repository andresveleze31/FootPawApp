"use client";
import { Dog } from "lucide-react";
import { Mr_Dafoe } from "next/font/google";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CategoryCard from "./products/CategoryCard";

import GlobalApi from "../_utils/GlobalApi";
import DealsComponent from "./DealsComponent";

const mrdafoe = Mr_Dafoe({
  weight: "400",
  subsets: ["latin"],
});

const DealsHome = () => {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = () => {
    GlobalApi.GetCategory().then((resp) => {
      console.log(resp);
      setCategoryList(resp.categories);
    });
  };

  return (
    <div class="bg-[url('/mask.webp')] bg-cover bg-center h-fit pt-30 pb-50 ">
      <div className="contenedor py-5 flex flex-col items-center gap-4 ">
        <Dog className="w-10 h-10 text-[#D32300]  " />
        <h1 className="text-3xl text-center font-bold text-white">
          Deals by Pet Type
        </h1>
        <h3
          className={`${mrdafoe.className} text-3xl text-red-700 flex gap-3 items-center `}
        >
          Best for your pet
        </h3>

        <Carousel className={"w-full mt-5"}>
          <CarouselContent>
            {categoryList &&
              categoryList.map((category, index) => (
                <CarouselItem key={index} className="md:basis-1/6">
                  <CategoryCard category={category} />
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <DealsComponent />
      </div>
    </div>
  );
};

export default DealsHome;
