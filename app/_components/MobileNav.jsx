import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import SidebarLinks from "../_utils/SidebarLinks";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Button className={"px-10"}>
          <Menu />
        </Button>{" "}
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          
          <SidebarLinks />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
