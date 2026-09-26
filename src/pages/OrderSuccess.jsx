import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api.js";

export default function OrderSuccess() {
  const { orderNumber } = useParams();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    api
      .getOrder(orderNumber)
      .then((o) => {
        setOrder(o);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, [orderNumber]);

  if (status === "loading") return <div className="container-page py-24 text-ink/50 text-sm">Loading your order…</div>;
  if (status === "error" || !order) {
    return (
      <div className="container-page py-24 text-center">
        <p className="text-ink/70">We couldn't find that order.</p>
        <Link to="/shop" className="text-pine text-sm border-b border-pine/40 mt-3 inline-block">Back to shop</Link>
      </div>
    );
  }

  return (
    <div className="container-page py-16 md:py-24 max-w-2xl mx-auto text-center">
      <p className="text-xs text-pine tracking-wide mb-4">Order confirmed</p>
      <h1 className="font-display text-3xl text-ink mb-3">Thank you, {order.customer_name.split(" ")[0]}.</h1>
      <p className="text-ink/60 mb-10">
        Order <span className="text-ink">{order.order_number}</span> is on its way to you. A confirmation was "sent" to {order.customer_email}.
      </p>

      <div className="border border-line text-left p-6">
        <ul className="divide-y divide-line">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between py-3 text-sm">
              <span className="text-ink/75">{item.product_name} × {item.quantity}</span>
              <span className="text-ink">${(item.unit_price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="border-t border-line mt-3 pt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-ink/60">Subtotal</span>
            <span className="text-ink">${order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink/60">Shipping</span>
            <span className="text-ink">{order.shipping === 0 ? "Free" : `$${order.shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-line text-base">
            <span className="text-ink">Total</span>
            <span className="text-ink">${order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <p className="text-sm text-ink/50 mt-8">
        Shipping to {order.address}, {order.city} {order.postal_code}
      </p>

      <Link to="/shop" className="btn-primary inline-flex mt-10">Continue shopping</Link>
    </div>
  );
}
