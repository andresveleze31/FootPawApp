"use client";
import React from "react";
import Header from "./_components/Header";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import { useCart } from "./_context/CartContext";
import CrispProvider from "./_components/CrispProvider";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Loader } from "lucide-react";

const Provider = ({ children }) => {
  const { isInitialized } = useCart();

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div>
      <PayPalScriptProvider
        options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}
      >
        <CrispProvider />
        <Header />
        <Navbar />
        {children}
        <Footer />
      </PayPalScriptProvider>
    </div>
  );
};

export default Provider;
