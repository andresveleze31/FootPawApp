import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const DealsComponent = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 w-full mt-10">
      <div className="bg-[url('/Mask_group_23.webp')] px-5 rounded-xl py-10 bg-cover bg-center flex flex-col gap-4">
        <p className="text-yellow-400 font-bold">FIVE DAY SALE!</p>
        <h1 className="text-4xl font-bold text-white">Save 50%</h1>
        <p className="text-white">Your first repeat delivery order!</p>
        <p className="text-white">Use code BIGSALE50 at checkout </p>
        <Link className="" href="/">
          <Button>Show Now</Button>
        </Link>
      </div>
      <div className="bg-[url('/Mask_54.webp')] px-5 rounded-xl py-10 bg-cover bg-center flex flex-col gap-4">
        <p className="text-yellow-400 font-bold">FIVE DAY SALE!</p>
        <h1 className="text-4xl font-bold text-white">Extra 20% on Supplies</h1>
        <p className="text-white">Your first repeat delivery order!</p>
        <p className="text-white">Use code BIGSALE50 at checkout </p>
        <Link className="" href="/">
          <Button>Show Now</Button>
        </Link>
      </div>
    </div>
  );
};

export default DealsComponent;
