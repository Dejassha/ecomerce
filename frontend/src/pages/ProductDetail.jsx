import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api.js";
import ProductArt from "../components/ProductArt.jsx";
import { useCart } from "../context/CartContext.jsx";

export default function ProductDetail() {
  const { slug } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState("loading");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setStatus("loading");
    setAdded(false);
    api
      .getProduct(slug)
      .then((p) => {
        setProduct(p);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, [slug]);

  if (status === "loading") {
    return <div className="container-page py-24 text-ink/50 text-sm">Loading…</div>;
  }
  if (status === "error" || !product) {
    return (
      <div className="container-page py-24">
        <p className="text-ink/70">We couldn't find that product.</p>
        <Link to="/shop" className="text-pine text-sm border-b border-pine/40 mt-3 inline-block">
          Back to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-12 md:py-16">
      <Link to="/shop" className="text-xs text-ink/50 hover:text-ink">← Back to shop</Link>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="aspect-square">
          <ProductArt image={product.image} category={product.category} className="w-full h-full" />
        </div>

        <div className="md:pt-2">
          <p className="text-xs text-rust mb-3">{product.category}</p>
          <h1 className="font-display text-3xl text-ink">{product.name}</h1>
          {product.origin && <p className="text-sm text-ink/55 mt-2">{product.origin}{product.roast ? ` · Sizes ${product.roast}` : ""}</p>}
          <p className="text-xl text-ink mt-5">${product.price.toFixed(2)}</p>

          <p className="mt-6 text-ink/70 leading-relaxed max-w-prose">{product.description}</p>
          {product.notes && (
            <p className="mt-3 text-sm text-ink/50">Color & details: {product.notes}</p>
          )}

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center border border-line">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="w-9 h-10 text-ink/70 hover:text-ink">−</button>
              <span className="w-8 text-center text-sm">{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)} className="w-9 h-10 text-ink/70 hover:text-ink">+</button>
            </div>
            <button
              onClick={() => {
                addItem(product, quantity);
                setAdded(true);
              }}
              disabled={product.stock <= 0}
              className="btn-primary flex-1 sm:flex-none sm:px-10"
            >
              {product.stock <= 0 ? "Sold out" : "Add to cart"}
            </button>
          </div>
          {added && <p className="text-xs text-pine mt-3">Added to your cart.</p>}
          <p className="text-xs text-ink/40 mt-4">
            {product.stock > 0 ? `${product.stock} in stock` : "Currently unavailable"}
          </p>
        </div>
      </div>
    </div>
  );
}
