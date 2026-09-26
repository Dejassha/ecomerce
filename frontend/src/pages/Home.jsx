import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api.js";
import ProductCard from "../components/ProductCard.jsx";
import { ProductMark } from "../components/ProductArt.jsx";

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    api.getProducts("Dresses").then((rows) => setFeatured(rows.slice(0, 3)));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-line">
        <div className="container-page grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-16 md:py-24">
          <div>
            <p className="text-xs text-rust tracking-wide mb-4">Sewn in small runs, cut from natural fabrics</p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-[3.4rem] leading-[1.08] text-ink">
              Dresses made for days, not just occasions.
            </h1>
            <p className="mt-6 text-ink/65 max-w-md leading-relaxed">
              We cut a handful of styles every season in natural linen, silk, and cotton — no warehouses full of fast fashion. What you order was sewn with the next ten years in mind.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Link to="/shop" className="btn-primary">Shop new arrivals</Link>
              <Link to="/shop?category=Outerwear" className="btn-secondary">See outerwear</Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-[3/4] bg-charcoal">
              <ProductMark image="dress-midi" line="#F3ECDD" className="w-full h-full" />
            </div>
            <div className="aspect-[3/4] bg-gold mt-8">
              <ProductMark image="dress-wrap" line="#241C15" className="w-full h-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="container-page py-16 md:py-20">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-display text-2xl text-ink">This season's dresses</h2>
          <Link to="/shop?category=Dresses" className="text-sm text-pine border-b border-pine/40 hover:border-pine-dark">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Values strip */}
      <section className="bg-charcoal text-ivory">
        <div className="container-page py-14 grid grid-cols-1 sm:grid-cols-3 gap-10">
          <div>
            <p className="font-display text-lg mb-2">Cut responsibly</p>
            <p className="text-sm text-ivory/60 leading-relaxed">Small runs in natural fabrics, sewn at one workshop we know by name.</p>
          </div>
          <div>
            <p className="font-display text-lg mb-2">Sized honestly</p>
            <p className="text-sm text-ivory/60 leading-relaxed">Real measurements on every listing, so what you order fits the first time.</p>
          </div>
          <div>
            <p className="font-display text-lg mb-2">Free returns, no fuss</p>
            <p className="text-sm text-ivory/60 leading-relaxed">Thirty days to change your mind. Just send it back — no forms, no phone calls.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
