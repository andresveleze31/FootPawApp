"use client";

import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { Menu, PawPrint, Search, ShoppingBag, Trash, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import MobileNav from "./MobileNav";
import { useCart } from "@/app/_context/CartContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";


const Header = () => {
  const { user, isSignedIn } = useUser();
  const { cart, removeFromCart, updateQuantity, isInitialized } = useCart();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Lógica de búsqueda aquí
    console.log("Buscando:", searchQuery);
  };

  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotalPrice = cart
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  if (!isInitialized) {
    return (
      <div className="py-6 shadow-sm">
        <div className="contenedor flex justify-between items-center">
          <div className="h-12 w-32 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-10 w-10 bg-gray-200 animate-pulse rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 shadow-sm sticky top-0 z-50 bg-white">
      <div className="contenedor flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image src="/logo.webp" alt="Logo" width={200} height={50} priority />
        </Link>

        {/* Menú de categorías (Desktop) */}
        <div className="hidden md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">
                <Menu className="mr-2" />
                Todas las Categorías
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Categorías</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <PawPrint className="mr-2" /> Juguetes
              </DropdownMenuItem>
              <DropdownMenuItem>
                <PawPrint className="mr-2" /> Ropa
              </DropdownMenuItem>
              <DropdownMenuItem>
                <PawPrint className="mr-2" /> Alimentos
              </DropdownMenuItem>
              <DropdownMenuItem>
                <PawPrint className="mr-2" /> Accesorios
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Barra de búsqueda (Desktop) */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex border px-5 py-3 rounded-lg w-120"
        >
          <input
            type="text"
            className="bg-transparent w-full outline-none"
            placeholder="Busca en nuestra tienda..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">
            <Search className="text-gray-500" />
          </button>
        </form>

        {/* User actions */}
        {isSignedIn ? (
          <div className="flex gap-4 items-center">
            {/* Carrito */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="relative"
                  aria-label="Carrito de compras"
                >
                  <ShoppingBag className="mr-2" />({cartTotalItems})
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-96 max-h-[80vh] overflow-y-auto"
                align="end"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <h3 className="font-bold">Tu Carrito</h3>
                    <span className="text-sm">{cartTotalItems} items</span>
                  </div>

                  {cart.length === 0 ? (
                    <div className="text-center py-8">
                      <ShoppingBag className="mx-auto mb-4" size={48} />
                      <p>Tu carrito está vacío</p>
                      <Button className="mt-4" asChild>
                        <Link href="/products">Ver productos</Link>
                      </Button>
                    </div>
                  ) : (
                    <>
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between gap-4 border-b pb-4"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={60}
                            height={60}
                            className="rounded border"
                          />
                          <div className="flex-1">
                            <Link
                              href={`/products/${item.id}`}
                              className="font-medium hover:underline"
                            >
                              {item.name}
                            </Link>
                            <p className="text-muted-foreground">
                              ${item.price.toFixed(2)}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                disabled={item.quantity <= 1}
                              >
                                -
                              </Button>
                              <span className="w-8 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                              >
                                +
                              </Button>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                            aria-label="Eliminar del carrito"
                          >
                            <Trash className="text-red-500 w-4 h-4" />
                          </Button>
                        </div>
                      ))}

                      <div className="space-y-4 pt-4">
                        <div className="flex justify-between font-semibold text-lg">
                          <span>Total:</span>
                          <span>${cartTotalPrice}</span>
                        </div>
                        <Button className="w-full" asChild>
                          <Link href="/checkout">Proceder al pago</Link>
                        </Button>
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="/cart">Ver carrito</Link>
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </PopoverContent>
            </Popover>

            {/* User button */}
            <UserButton afterSignOutUrl="/" />
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            <SignInButton mode="modal">
              <Button variant="outline" className="hidden md:flex">
                Iniciar Sesión
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button className="hidden md:flex">Registrarse</Button>
            </SignUpButton>
            <MobileNav />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
