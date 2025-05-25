"use client";
import StarsComponent from "@/app/_components/products/StarsComponent";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BadgeCheck,
  Calendar,
  Check,
  MapPinCheckInside,
  ShoppingCart,
  Truck,
  Undo2,
  Minus,
  Plus,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TrendingHome from "@/app/_components/TrendingHome";
import Link from "next/link";
import { useCart } from "@/app/_context/CartContext";

const ProductPage = () => {
  const param = usePathname();
  const [quantity, setQuantity] = useState(1);
  const [productDetails, setProductDetails] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    getProductDetails(param.split("/")[2]);
  }, [param]);

  const getProductDetails = (productId) => {
    GlobalApi.GetProductDetails(productId).then((resp) => {
      console.log(resp);
      setProductDetails(resp.product);
    });
  };

  const handleAddToCart = () => {
    if (!productDetails) return;
    console.log(productDetails);

    addToCart({
      id: productDetails.id,
      name: productDetails.name,
      price: productDetails.price,
      image: productDetails.image?.url,
      quantity: quantity,
    });
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(Math.max(1, newQuantity));
  };

  if (!productDetails) {
    return (
      <div className="contenedor flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="contenedor">
      <div className="grid md:grid-cols-2 gap-5 mt-10">
        <div className="relative aspect-square">
          <Image
            src={productDetails.image?.url}
            alt={productDetails.name}
            fill
            className="object-contain"
          />
        </div>

        <div>
          <h1 className="text-5xl font-bold">{productDetails.name}</h1>

          <div className="mt-5 flex gap-4 items-center">
            <StarsComponent reviews={2} />
            <p className="text-green-500 flex gap-1 items-center">
              <Check /> In Stock
            </p>
          </div>

          <hr className="mt-7" />

          <div className="flex gap-4 items-center mt-5">
            <div className="flex gap-2 items-center">
              <h2 className="text-2xl font-bold text-red-600">
                ${productDetails.price}.00
              </h2>
              <h4 className="text-gray-400">
                <s>${productDetails.price * 2}</s>
              </h4>
            </div>
            <div className="bg-red-600 font-bold text-white px-4 py-1">
              You save $100.00
            </div>
          </div>

          <p className="mt-5 text-gray-500 text-sm">
            {productDetails.shortDesc}
          </p>

          <hr className="mt-7" />

          <div className="flex items-center gap-4 mt-7">
            <div className="flex items-center border rounded-md overflow-hidden">
              <button
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
                onClick={() => handleQuantityChange(quantity - 1)}
              >
                <Minus size={16} />
              </button>
              <span className="px-4 w-12 text-center">{quantity}</span>
              <button
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                <Plus size={16} />
              </button>
            </div>

            <Button
              onClick={handleAddToCart}
              className="flex-1 bg-[#0a4253] hover:bg-[#0a4253]/90"
            >
              <ShoppingCart className="mr-2" />
              Add to Cart
            </Button>
          </div>

          <hr className="mt-7" />

          <div className="flex flex-col gap-4 mt-7">
            <p className="flex items-center text-sm gap-2 text-gray-400">
              <Calendar /> 2 years warranty
            </p>
            <p className="flex items-center text-sm gap-2 text-gray-400">
              <Truck /> Delivery time: 1-2 business days
            </p>
            <p className="flex items-center text-sm gap-2 text-gray-400">
              <Undo2 /> Free 90 days return
            </p>
          </div>

          <div className="mt-7 bg-gray-200 py-4 rounded-lg flex flex-col items-center gap-3">
            <p className="text-md uppercase font-bold">PAYMENT OPTIONS</p>
            <Image
              src="/payment.webp"
              width={300}
              height={25}
              alt="Payment Badges"
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="description" className="w-full items-center mt-20">
        <TabsList className="w-full md:w-2/3">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="tracking">Tracking</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="nutritional">Nutritional Information</TabsTrigger>
        </TabsList>

        <TabsContent className="mt-10 md:w-2/3" value="description">
          <div
            className="prose"
            dangerouslySetInnerHTML={{
              __html: productDetails.longDescription?.html,
            }}
          />
        </TabsContent>

        <TabsContent className="mt-10 w-full md:w-2/3" value="certifications">
          {productDetails.certifications?.map((cert, index) => (
            <Link
              key={index}
              className="w-full block mb-2"
              target="_blank"
              href={cert?.document?.url}
            >
              <Button className="w-full">
                <BadgeCheck className="mr-2" />
                {cert.name}
              </Button>
            </Link>
          ))}
        </TabsContent>

        <TabsContent className="mt-10 w-full md:w-2/3" value="tracking">
          <h1 className="text-center font-bold text-2xl">Tracking Points</h1>
          <Accordion
            className="w-full mt-5 flex flex-col gap-4"
            type="single"
            collapsible
          >
            {productDetails.tracking?.map((trackpoint, index) => (
              <AccordionItem
                key={index}
                className="w-full bg-blue-200 px-5 rounded-lg"
                value={`item-${index}`}
              >
                <AccordionTrigger className="w-full text-lg">
                  <MapPinCheckInside className="mr-2" /> {trackpoint.name}
                </AccordionTrigger>
                <AccordionContent>
                  <p>{trackpoint.description}</p>
                  <Image
                    className="py-5 rounded-xl"
                    src={trackpoint.imagePlace?.url}
                    width={500}
                    height={500}
                    alt={trackpoint.name}
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>

        <TabsContent className="mt-10" value="reviews">
          <div className="text-center py-10">
            <p>No reviews yet</p>
          </div>
        </TabsContent>

        <TabsContent className="mt-10" value="nutritional">
          <Image 
            src={productDetails.nutritionalInfo?.url}
            height={600}
            width={600}
            alt="Nutritional Info"
            className="w-full h-full"
          />
        </TabsContent>
      </Tabs>

      <TrendingHome />
    </div>
  );
};

export default ProductPage;
