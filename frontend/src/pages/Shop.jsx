import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../api.js";
import ProductCard from "../components/ProductCard.jsx";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "All";

  const [categories, setCategories] = useState(["All"]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getCategories().then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    api
      .getProducts(activeCategory)
      .then(setProducts)
      .finally(() => setLoading(false));
  }, [activeCategory]);

  return (
    <div className="container-page py-12 md:py-16">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
        <div>
          <h1 className="font-display text-3xl text-ink">Shop</h1>
          <p className="text-sm text-ink/55 mt-2">{products.length} item{products.length === 1 ? "" : "s"}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSearchParams(cat === "All" ? {} : { category: cat })}
              className={`px-4 py-2 text-sm border transition-colors ${
                activeCategory === cat
                  ? "bg-ink text-ivory border-ink"
                  : "border-line text-ink/70 hover:border-ink"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-ink/50 text-sm">Loading…</p>
      ) : products.length === 0 ? (
        <p className="text-ink/50 text-sm">Nothing in this category right now.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
