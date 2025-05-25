import { useUser } from "@clerk/nextjs";
import { BadgeDollarSign, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { user, isSignedIn } = useUser();

  return (
    <div className="hidden contenedor py-5 md:flex justify-between items-center border-y border-y-gray-300">
      <nav className=" flex items-center gap-20">
        <Link className="font-bold text-md hover:text-[#D32300]" href={"/"}>
          Home
        </Link>
        <Link
          className="font-bold text-md hover:text-[#D32300]"
          href={"/about"}
        >
          About
        </Link>
        <Link className="font-bold text-md hover:text-[#D32300]" href={"/shop"}>
          Shop
        </Link>
        <Link className="font-bold text-md hover:text-[#D32300]" href={"/blog"}>
          Blog
        </Link>
        {isSignedIn && (
          <Link
            className="font-bold text-md hover:text-[#D32300]"
            href={"/admin/orders"}
          >
            My Orders
          </Link>
        )}
      </nav>
      <div className="flex gap-5 items-center">
        <div className="flex items-center gap-3">
          <Phone className="text-[#D32300]" />
          <p className="font-bold">(877) 123 456 789</p>
        </div>

        <div className="flex items-center gap-3">
          <BadgeDollarSign className="text-[#D32300]" />
          <p className="font-bold">35% Off! Your first auto delivery</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
