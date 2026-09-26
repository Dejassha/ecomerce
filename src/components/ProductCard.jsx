import React from "react";
import { Link } from "react-router-dom";
import ProductArt from "./ProductArt.jsx";
import { useCart } from "../context/CartContext.jsx";

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <div className="group flex flex-col">
      <Link to={`/product/${product.slug}`} className="block aspect-[4/3] overflow-hidden">
        <ProductArt image={product.image} category={product.category} className="w-full h-full transition-transform duration-300 group-hover:scale-[1.03]" />
      </Link>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <Link to={`/product/${product.slug}`} className="font-display text-lg text-ink hover:underline underline-offset-4">
            {product.name}
          </Link>
          {product.origin && <p className="text-xs text-ink/50 mt-1">{product.origin}</p>}
        </div>
        <p className="text-sm text-ink/80 whitespace-nowrap pt-1">${product.price.toFixed(2)}</p>
      </div>
      {product.notes && <p className="text-xs text-ink/50 mt-1">{product.notes}</p>}
      <button
        onClick={() => addItem(product, 1)}
        disabled={product.stock <= 0}
        className="mt-3 self-start text-sm text-pine hover:text-pine-dark border-b border-pine/40 hover:border-pine-dark transition-colors disabled:opacity-30 disabled:pointer-events-none"
      >
        {product.stock <= 0 ? "Sold out" : "Add to cart"}
      </button>
    </div>
  );
}
