import { FaStar } from "react-icons/fa";
import React from "react";
import { PawPrint } from "lucide-react";
import Image from "next/image";

const TestimonialCard = () => {
  return (
    <div className="grid grid-cols-2 items-center w-full">
      <div className="bg-cyan-950 flex flex-col gap-5 rounded-l-xl px-5 py-8">
        <div className="flex gap-2">
          <FaStar className="text-yellow-500" />
          <FaStar className="text-yellow-500" />
          <FaStar className="text-yellow-500" />
          <FaStar className="text-yellow-500" />
          <FaStar className="text-yellow-500" />
        </div>
        <h1 className="text-2xl font-bold text-white">
          Quality at a great price
        </h1>
        <p className="text-white">
          I order regularly and have never had an issue. My cats seem to enjoy
          it and prefer it over some of the other brands in this price range.
        </p>

        <p className="font-bold flex gap-2 mt-5 text-white">
          <PawPrint className="text-red-700" /> Noemi Medina
        </p>
      </div>

      <div>
        <Image
          src="/Mask_group_10.png"
          width={231}
          height={310}
          className="max-w-full h-auto object-cover"
          alt="Mascota feliz"
        />
      </div>
    </div>
  );
};

export default TestimonialCard;
