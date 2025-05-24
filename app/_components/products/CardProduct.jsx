import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

import React from "react";

const CardProduct = ({product}) => {
  return (
    <Card className={"py-0 rounded-3xl"}>
      <Image
        src={product?.image?.url}
        alt="imgProduct"
        width={500}
        height={500}
      />

      <div className="px-5 pb-5 flex flex-col gap-2">
        <Link href={"/shop/"+product?.id} className="font-semibold hover:text-[#D32300] hover:cursor-pointer">
          {product?.name}
        </Link>
        <div className="flex gap-2 items-center">
          <p className="text-[#D32300]  font-bold text-xl">${product?.price}</p>
          <p className="text-gray-300 text-sm">
            <s>$509.60</s>
          </p>
        </div>
      </div>
    </Card>
  );
};

export default CardProduct;
