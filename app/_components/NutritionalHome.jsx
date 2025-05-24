import { Cat, PawPrint, Trophy } from "lucide-react";
import { Mr_Dafoe } from "next/font/google";
import React from "react";

const mrdafoe = Mr_Dafoe({
  weight: "400",
  subsets: ["latin"],
});

const NutritionalHome = () => {
  return (
    <div className="contenedor py-5 flex flex-col items-center gap-4">
      <PawPrint className="w-10 h-10 text-[#D32300]  " />
      <h1 className="text-3xl text-center font-bold">
        Core Nutritional Principles
      </h1>
      <h3
        className={`${mrdafoe.className} text-3xl text-red-700 flex gap-3 items-center `}
      >
        For pet season
      </h3>

      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-5">
        <div className="flex flex-col items-center gap-4 bg-amber-200 px-10 py-10 rounded-xl">
          <div className="p-5 bg-orange-400 rounded-full">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <p className="text-lg font-bold text-center">Healthy Weight</p>
          <p className="text-gray-500 text-center">
            We provide food, equipment, and we provide pets too.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 bg-green-200 px-10 py-10 rounded-xl">
          <div className="p-5 bg-green-400 rounded-full">
            <Cat className="w-10 h-10 text-white" />
          </div>
          <p className="text-lg font-bold text-center">Hairball Management</p>
          <p className="text-gray-500 text-center">
            We provide food, equipment, and we provide pets too.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 bg-rose-200 px-10 py-10 rounded-xl">
          <div className="p-5 bg-rose-400 rounded-full">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <p className="text-lg font-bold text-center">Limited Ingredient</p>
          <p className="text-gray-500 text-center">
            We provide food, equipment, and we provide pets too.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 bg-purple-200 px-10 py-10 rounded-xl">
          <div className="p-5 bg-purple-400 rounded-full">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <p className="text-lg font-bold text-center">Organic Grain</p>
          <p className="text-gray-500 text-center">
            We provide food, equipment, and we provide pets too.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NutritionalHome;
