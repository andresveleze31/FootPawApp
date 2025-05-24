import Image from "next/image";
import React from "react";

const GridHome = () => {
  return (
    <div className="contenedor ">
      <div className="grid md:grid-cols-3 gap-4 my-12">
        <div className="bg-orange-100 flex justify-between items-center px-8 py-8 rounded-3xl gap-4">
          <div className="flex flex-col gap-4">
            <p className="font-bold text-xl">Save 35%</p>
            <p className="text-gray-500">On you first repeat delivery order</p>
          </div>
          <Image src={"/car.webp"} alt="car" width={90} height={90} />
        </div>
        <div className="bg-purple-100 flex justify-between items-center px-8 py-8 rounded-3xl gap-4">
          <div className="flex flex-col gap-4">
            <p className="font-bold text-xl">Latest Deals</p>
            <p className="text-gray-500">Save up to $399/year</p>
          </div>
          <Image src={"/caticon.webp"} alt="car" width={90} height={90} />
        </div>
        <div className="bg-blue-100 flex justify-between items-center px-8 py-8 rounded-3xl gap-4">
          <div className="flex flex-col gap-4">
            <p className="font-bold text-xl">Top Rate Products</p>
            <p className="text-gray-500">Recommended pet favourites</p>
          </div>
          <Image src={"/plateicon.webp"} alt="car" width={90} height={90} />
        </div>
      </div>
      <div className="grid md:grid-cols-4 gap-8">
        <div className="relative">
          <Image
            src={"/gato1.webp"}
            alt="gato"
            width={300}
            height={400}
            className="w-full h-full"
          />
          <div className="absolute inset-0 px-4">
            <div className="flex flex-col items-center mt-8">
              <h3 className="text-2xl text-center text-white font-bold">
                Top Quality Cat Food Here
              </h3>
              <p className="text-white text-center">
                Save up to <span className="text-orange-600">$199</span> on dry
                food!
              </p>
            </div>
          </div>
        </div>
        <div className="relative">
          <Image
            src={"/perro1.webp"}
            alt="gato"
            width={3000}
            height={4000}
            className="w-full h-full"
          />
          <div className="absolute inset-0 px-4">
            <div className="flex flex-col items-center mt-8">
              <p className="uppercase font-bold text-yellow-500">
                up to 20% OFF
              </p>
              <h3 className="text-2xl text-center text-white font-bold">
                Focus On The Right Nutrition
              </h3>
              <p className="text-white text-center">
                Premium dry food for pets
              </p>
            </div>
          </div>
        </div>
        <div className="relative">
          <Image
            src={"/gato2.webp"}
            alt="gato"
            width={300}
            height={400}
            className="w-full h-full"
          />
          <div className="absolute inset-0 px-4">
            <div className="flex flex-col items-center mt-8">
              <h3 className="text-2xl text-center text-white font-bold">
                Save On These Monthly Must Haves
              </h3>
              <p className="text-white text-center">Up to 15% on supplies.</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <Image
            src={"/hamster1.webp"}
            alt="gato"
            width={300}
            height={400}
            className="w-full h-full"
          />
          <div className="absolute inset-0 px-4">
            <div className="flex flex-col items-center mt-8">
              <p className="uppercase font-bold text-red-500">
                buy big, save big
              </p>
              <h3 className="text-2xl text-center text-white font-bold">
                Nutrition Tailored to their need
              </h3>
              <p className="text-white text-center">Premium pet dry food </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridHome;
