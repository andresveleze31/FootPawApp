"use client"
import { BriefcaseBusiness } from "lucide-react";
import { Mr_Dafoe } from "next/font/google";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CardProduct from "./products/CardProduct";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import GlobalApi from "../_utils/GlobalApi";

const mrdafoe = Mr_Dafoe({
  weight: "400",
  subsets: ["latin"],
});

const SolutionsHome = () => {

const [productList, setProductList] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = () => {
    GlobalApi.GetProducts().then((resp) => {
      console.log(resp);
      setProductList(resp.products);
    });
  };


  return (
    <div className="contenedor py-5 flex flex-col items-center gap-4">
      <BriefcaseBusiness className="w-10 h-10 text-[#D32300]  " />
      <h1 className="text-3xl text-center font-bold">
        Top Flea & Tick Solutions
      </h1>
      <h3
        className={`${mrdafoe.className} text-3xl text-red-700 flex gap-3 items-center `}
      >
        Feed the good
      </h3>

      <Tabs defaultValue="items" className="w-full flex flex-col items-center">
        <TabsList className={"w-1/2"}>
          <TabsTrigger value="items">All Items</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="bestseller">Best Seller</TabsTrigger>
          <TabsTrigger value="toprated">Top Rated</TabsTrigger>
        </TabsList>
        <TabsContent className={"mt-8"} value="items">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {productList &&
              productList.map((product, index) => (
                <CardProduct key={index} product={product} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="sales">Change your password here.</TabsContent>
      </Tabs>

      <p className="mt-5 text-center">
        We specialize in providing a large assortment of pet food, supplies and
        services
      </p>

      <Link href={"/"}>
        <Button>View All Products</Button>
      </Link>
    </div>
  );
};

export default SolutionsHome;
