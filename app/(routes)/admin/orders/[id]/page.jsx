"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const OrderPageId = () => {
  const pathname = usePathname();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const orderId = pathname.split("/").pop(); // Obtiene el último segmento de la URL
    if (orderId) {
      getProductDetails(orderId);
    }
  }, [pathname]);

  const getProductDetails = (orderId) => {
    setLoading(true);
    setError(null);

    GlobalApi.GetOrderById(orderId)
      .then((resp) => {
        setOrder(resp.order); // Asume que la API devuelve {order: {...}}
        console.log("Order details:", resp);
      })
      .catch((err) => {
        console.error("Error fetching order:", err);
        setError("Failed to load order details");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">{error}</p>
        <Button onClick={() => getProductDetails(pathname.split("/").pop())}>
          Retry
        </Button>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>No order found</p>
      </div>
    );
  }

  return (
    <div className="contenedor mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">Customer Information</h2>
            <p>
              <span className="font-medium">Name:</span> {order.name}
            </p>
            <p>
              <span className="font-medium">Email:</span> {order.email}
            </p>
            <p>
              <span className="font-medium">Address:</span> {order.adress},{" "}
              {order.city}, {order.country}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Order Information</h2>
            <p>
              <span className="font-medium">Order ID:</span> {order.id}
            </p>
            <p>
              <span className="font-medium">Date:</span>{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <p>
              <span className="font-medium">Status:</span> {order.status}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Products</h2>
          <div className="space-y-4">
            {order.productocantidad?.map((item, index) => (
              <div
                key={index}
                className="flex items-center border p-3 rounded-lg"
              >
                <img
                  src={item.product?.image?.url}
                  alt={item.product?.name}
                  className="w-16 h-16 object-cover rounded mr-4"
                />
                <div>
                  <p className="font-medium">{item.product?.name}</p>
                  <p>Quantity: {item.cantidad}</p>
                  <p>Price: ${item.product?.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div className="text-lg font-semibold">
            Total: ${order.total}
          </div>
          <Button>Print Invoice</Button>
        </div>
      </div>
    </div>
  );
};

export default OrderPageId;
