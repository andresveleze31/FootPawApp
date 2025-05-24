import { HomeIcon, ShoppingBagIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const SidebarLinks = () => {
  const links = [
    {
      id: 1,
      name: "Home",
      icon: <HomeIcon />,
      url: "/",
    },
    {
      id: 2,
      name: "Shop",
      icon: <ShoppingBagIcon />,
      url: "/shop",
    },
  ];

  return (
    <div className="flex flex-col gap-4 mt-5">
      {links.map((link, index) => (
        <Link href={link.url}>
          <div className="flex gap-3">
            {link.icon}
            {link.name}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SidebarLinks;
