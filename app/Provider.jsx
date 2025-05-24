"use client";
import React from "react";
import Header from "./_components/Header";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import { useCart } from "./_context/CartContext";
import CrispProvider from "./_components/CrispProvider";

const Provider = ({ children }) => {
  const { isInitialized } = useCart();

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <CrispProvider />
      <Header />
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Provider;
