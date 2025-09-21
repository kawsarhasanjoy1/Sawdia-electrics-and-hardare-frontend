"use client";

import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useAddPaymentMutation } from "@/redux/api/orderApi";
import { removeFromCart, clearCart } from "@/redux/api/features/cartSlice";
import { FaTrash } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cart = useAppSelector((state) => state.cart.items);
  const { userId } = useAppSelector((state: any) => state.auth.user);
  const [shippingAddress, setShippingAddress] = useState({
    line1: "",
    city: "",
    postcode: "",
    phone: "",
  });
  const [couponCode, setCouponCode] = useState("");
  const [notes, setNotes] = useState("");

  const [addPayment, { isLoading }] = useAddPaymentMutation();

  // subtotal calculation
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingFee = 50;
  const totalAmount = subtotal + shippingFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    if (
      !shippingAddress.line1 ||
      !shippingAddress.city ||
      !shippingAddress.postcode ||
      !shippingAddress.phone
    ) {
      toast.error("Please fill in all shipping address fields!");
      return;
    }

    try {
      const products = cart.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      }));

      const res = await addPayment({
        userId,
        products,
        shippingAddress,
        couponCode,
        notes,
        totalAmount,
      }).unwrap();

      if (res?.success && res?.url) {
        dispatch(clearCart());
        toast.success("Redirecting to payment...");
        router.push(res?.url);
      } else {
        toast.error("payment url not found");
      }
      console.log(res);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message || "Payment failed");
    }
  };
  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
    toast.info("Item removed from cart");
  };
  const handleClearCart = () => {
    dispatch(clearCart());
    toast.info("Cart cleared");
  };

  return (
    <div className="container mx-auto p-6 grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-4">
        <div className="flex items-center justify-between border-b pb-2">
          <h2 className="text-2xl font-bold">Shopping Cart</h2>
          {cart.length > 0 && (
            <button
              onClick={handleClearCart}
              className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Clear Cart
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border rounded-lg p-4 shadow-sm bg-white"
            >
              <div className="flex items-center gap-4">
                <Image
                  width={100}
                  height={100}
                  src={item.images?.[0] || "/placeholder.png"}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    {item.quantity} × ${item.price}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-semibold">${item.price * item.quantity}</p>
                <button
                  onClick={() => handleRemoveItem(item._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="space-y-6">
        <div className="p-5 border rounded-lg bg-white shadow-sm space-y-3">
          <h2 className="text-xl font-semibold">Shipping Address</h2>
          <input
            type="text"
            name="line1"
            placeholder="Address Line"
            value={shippingAddress.line1}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={shippingAddress.city}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
          />
          <input
            type="text"
            name="postcode"
            placeholder="Postcode"
            value={shippingAddress.postcode}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={shippingAddress.phone}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div className="p-5 border rounded-lg bg-white shadow-sm space-y-3">
          <h2 className="text-xl font-semibold">Extra</h2>
          <input
            type="text"
            placeholder="Coupon Code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="w-full border rounded p-2"
          />
          <input
            type="text"
            placeholder="Order Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>
        <div className="p-5 border rounded-lg bg-white shadow-md space-y-2">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>${shippingFee}</span>
          </div>
          <hr />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${totalAmount}</span>
          </div>
          <button
            onClick={handleCheckout}
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-md mt-3 hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isLoading ? "Processing..." : "Proceed to Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
