import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import ProductArt from "./ProductArt.jsx";

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, subtotal } = useCart();

  return (
    <>
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-ink/40 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-paper z-50 shadow-2xl transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-line">
          <p className="font-display text-lg">Your cart</p>
          <button onClick={() => setIsOpen(false)} aria-label="Close cart" className="text-ink/60 hover:text-ink text-xl leading-none">
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-3">
              <p className="text-ink/60 text-sm">Nothing in here yet.</p>
              <Link to="/shop" onClick={() => setIsOpen(false)} className="text-pine text-sm border-b border-pine/40">
                Browse the shop
              </Link>
            </div>
          ) : (
            <ul className="space-y-5">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4">
                  <div className="w-20 h-20 shrink-0">
                    <ProductArt image={item.image} category={item.category} className="w-full h-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm text-ink">{item.name}</p>
                      <button onClick={() => removeItem(item.id)} className="text-ink/40 hover:text-rust text-xs shrink-0">
                        Remove
                      </button>
                    </div>
                    <p className="text-xs text-ink/50 mt-1">${item.price.toFixed(2)} each</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 border border-line text-ink/70 hover:border-ink"
                      >
                        −
                      </button>
                      <span className="text-sm w-5 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 border border-line text-ink/70 hover:border-ink"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-line px-6 py-5 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink/60">Subtotal</span>
              <span className="text-ink">${subtotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-ink/45">Shipping and total calculated at checkout.</p>
            <Link
              to="/checkout"
              onClick={() => setIsOpen(false)}
              className="btn-primary w-full"
            >
              Checkout
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
