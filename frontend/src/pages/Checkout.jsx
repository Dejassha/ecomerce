import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { api } from "../api.js";

const initialForm = { name: "", email: "", address: "", city: "", postalCode: "" };

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const shipping = subtotal >= 40 || subtotal === 0 ? 0 : 6.5;
  const total = subtotal + shipping;

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const order = await api.placeOrder({
        customer: form,
        items: items.map((i) => ({ productId: i.id, quantity: i.quantity })),
      });
      clearCart();
      navigate(`/order/${order.order_number}`);
    } catch (err) {
      setError(err.message || "Something went wrong placing the order.");
    } finally {
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="container-page py-24 text-center">
        <p className="font-display text-2xl text-ink mb-3">There's nothing to check out yet</p>
        <Link to="/shop" className="text-pine text-sm border-b border-pine/40">Browse the shop</Link>
      </div>
    );
  }

  return (
    <div className="container-page py-12 md:py-16">
      <h1 className="font-display text-3xl text-ink mb-10">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <form onSubmit={handleSubmit} className="md:col-span-2 space-y-5">
          <div>
            <label className="field-label" htmlFor="name">Full name</label>
            <input id="name" required className="field-input" value={form.name} onChange={(e) => update("name", e.target.value)} />
          </div>
          <div>
            <label className="field-label" htmlFor="email">Email</label>
            <input id="email" type="email" required className="field-input" value={form.email} onChange={(e) => update("email", e.target.value)} />
          </div>
          <div>
            <label className="field-label" htmlFor="address">Shipping address</label>
            <input id="address" required className="field-input" value={form.address} onChange={(e) => update("address", e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="field-label" htmlFor="city">City</label>
              <input id="city" required className="field-input" value={form.city} onChange={(e) => update("city", e.target.value)} />
            </div>
            <div>
              <label className="field-label" htmlFor="postalCode">Postal code</label>
              <input id="postalCode" required className="field-input" value={form.postalCode} onChange={(e) => update("postalCode", e.target.value)} />
            </div>
          </div>

          {error && <p className="text-sm text-rust">{error}</p>}

          <button type="submit" disabled={submitting} className="btn-primary w-full mt-4">
            {submitting ? "Placing order…" : `Place order — $${total.toFixed(2)}`}
          </button>
          <p className="text-xs text-ink/40">This is a demo checkout — no real payment is collected.</p>
        </form>

        <div className="border border-line p-6 h-fit">
          <p className="text-sm text-ink/60 mb-4">Order summary</p>
          <ul className="space-y-3 mb-5">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between text-sm">
                <span className="text-ink/75">{item.name} × {item.quantity}</span>
                <span className="text-ink">${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-line pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-ink/60">Subtotal</span>
              <span className="text-ink">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink/60">Shipping</span>
              <span className="text-ink">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-line text-base">
              <span className="text-ink">Total</span>
              <span className="text-ink">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
