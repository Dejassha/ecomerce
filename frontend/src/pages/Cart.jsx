import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import ProductArt from "../components/ProductArt.jsx";

export default function Cart() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="container-page py-24 text-center">
        <p className="font-display text-2xl text-ink mb-3">Your cart is empty</p>
        <Link to="/shop" className="text-pine text-sm border-b border-pine/40">Browse the shop</Link>
      </div>
    );
  }

  return (
    <div className="container-page py-12 md:py-16">
      <h1 className="font-display text-3xl text-ink mb-10">Your cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <ul className="md:col-span-2 divide-y divide-line">
          {items.map((item) => (
            <li key={item.id} className="flex gap-5 py-6 first:pt-0">
              <div className="w-24 h-24 shrink-0">
                <ProductArt image={item.image} category={item.category} className="w-full h-full" />
              </div>
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="text-ink">{item.name}</p>
                  <p className="text-sm text-ink/50 mt-1">${item.price.toFixed(2)} each</p>
                  <button onClick={() => removeItem(item.id)} className="text-xs text-ink/40 hover:text-rust mt-2">
                    Remove
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-line">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-9 text-ink/70 hover:text-ink">−</button>
                    <span className="w-7 text-center text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-9 text-ink/70 hover:text-ink">+</button>
                  </div>
                  <p className="w-16 text-right text-sm text-ink">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="border border-line p-6 h-fit">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-ink/60">Subtotal</span>
            <span className="text-ink">${subtotal.toFixed(2)}</span>
          </div>
          <p className="text-xs text-ink/45 mb-6">
            {subtotal >= 40 ? "Free shipping included." : `Add $${(40 - subtotal).toFixed(2)} more for free shipping.`}
          </p>
          <Link to="/checkout" className="btn-primary w-full">Checkout</Link>
        </div>
      </div>
    </div>
  );
}
