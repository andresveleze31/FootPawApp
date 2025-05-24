import { Clipboard, Mail, Phone } from "lucide-react";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-[url('/footermask.webp')] bg-cover  h-fit pt-30 pb-50 mt-20">
      <div className="contenedor grid md:grid-cols-4 gap-5">
        <Image
          src={"/logowhite.webp"}
          width={200}
          height={50}
          alt="Logo white"
        />
        <div className="flex gap-4 items-center">
          <div className="flex items-center justify-center bg-white rounded-full p-3">
            <Phone className="w-7 h-7 text-red-600" />
          </div>
          <div>
            <p className="text-white">Hotline Order</p>
            <h3 className="text-xl text-white font-bold">(877) 123 456 789</h3>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex items-center justify-center bg-white rounded-full p-3">
            <Mail className="w-7 h-7 text-red-600" />
          </div>
          <div>
            <p className="text-white">Email us</p>
            <h3 className="text-xl text-white font-bold">
              support@example.com
            </h3>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex items-center justify-center bg-white rounded-full p-3">
            <Clipboard className="w-7 h-7 text-red-600" />
          </div>
          <div>
            <p className="text-white">Follow us</p>
            <h3 className="text-xl text-white font-bold">(877) 123 456 789</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
