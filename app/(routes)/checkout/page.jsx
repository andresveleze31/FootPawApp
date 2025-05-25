"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "@/app/_context/CartContext";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useUser } from "@clerk/nextjs";
import { PayPalButtons } from "@paypal/react-paypal-js";

const CheckoutPage = () => {
  const { user } = useUser();
  const { cart, updateQuantity, removeFromCart, isInitialized, clearCart } =
    useCart();
  const formRef = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = (data) => {
    const order = {
      userid: user.id,
      name: data.name,
      country: data.county,
      city: data.city,
      email: data.email,
      phone: data.phone,
      zip: data.zip,
      address: data.address,
      total: getTotalPrice(),
      status: "COMPLETED",
      paymentMethod: "PayPal",
    };

    GlobalApi.CreateOrder(order).then((resp) => {
      const resultId = resp?.createOrder?.id;
      if (resultId) {
        cart.forEach((item) => {
          GlobalApi.UpdateOrderCantidad({
            id: item.id,
            pedidoId: resultId,
            cantidad: item.quantity,
          });
        });
        clearCart();
        window.location.href = `/order-success?id=${resultId}`;
      }
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (!isInitialized) return null;

  return (
    <div className="contenedor">
      <div className="mt-10">
        <h1 className="text-4xl font-bold">Checkout</h1>
        <div className="mt-10 grid md:grid-cols-2 gap-10">
          {/* Formulario */}
          <div>
            <h2 className="text-2xl font-bold mb-5">Billing Details</h2>
            <form
              className="space-y-4"
              onSubmit={handleSubmit(onSubmit)}
              ref={formRef}
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Input
                    placeholder="Full Name"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    placeholder="Email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Input
                    placeholder="Phone"
                    {...register("phone", {
                      required: "Phone is required",
                      minLength: {
                        value: 6,
                        message: "Phone must be at least 6 digits",
                      },
                    })}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    placeholder="ZIP Code"
                    {...register("zip", { required: "ZIP Code is required" })}
                  />
                  {errors.zip && (
                    <p className="text-red-500 text-sm">{errors.zip.message}</p>
                  )}
                </div>
              </div>

              <Input
                placeholder="County"
                {...register("county", { required: "County is required" })}
              />
              {errors.county && (
                <p className="text-red-500 text-sm">{errors.county.message}</p>
              )}

              <Input
                placeholder="City"
                {...register("city", { required: "City is required" })}
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city.message}</p>
              )}

              <Input
                placeholder="Address"
                {...register("address", { required: "Address is required" })}
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}

              <PayPalButtons
                disabled={!isValid || cart.length === 0}
                style={{ layout: "horizontal" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: getTotalPrice().toFixed(2),
                          currency_code: "USD",
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then(() => {
                    const submitEvent = new Event("submit", {
                      cancelable: true,
                      bubbles: true,
                    });
                    formRef.current.dispatchEvent(submitEvent);
                  });
                }}
                onError={(err) => {
                  console.error("PayPal error:", err);
                  // Aquí puedes mostrar un mensaje de error al usuario
                }}
              />
            </form>
          </div>

          {/* Resumen del carrito */}
          <div>
            <h2 className="text-2xl font-bold mb-5">Order Summary</h2>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 items-center bg-gray-100 p-4 rounded-lg"
                  >
                    <Image
                      src={item.image}
                      width={80}
                      height={80}
                      alt={item.name}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold">{item.name}</h3>
                      <p>
                        ${item.price} x {item.quantity}
                      </p>
                      <div className="flex gap-2 mt-2 items-center">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <Minus size={16} />
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="text-right font-bold text-xl">
                  Total: ${getTotalPrice().toFixed(2)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
