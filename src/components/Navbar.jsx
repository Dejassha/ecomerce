import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

const links = [
  { to: "/shop", label: "Shop" },
  { to: "/shop?category=Dresses", label: "Dresses" },
  { to: "/shop?category=Tops", label: "Tops" },
  { to: "/shop?category=Bottoms", label: "Bottoms" },
  { to: "/shop?category=Outerwear", label: "Outerwear" },
];

export default function Navbar() {
  const { count, setIsOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-[#E5D1A8]/90 backdrop-blur border-b border-line">
      <div className="container-page flex items-center justify-between h-16">
        <Link to="/" className="font-display text-xl tracking-tight text-ink">
          Violet & Vine
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm text-ink/70">
          {links.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              className={({ isActive }) =>
                `hover:text-ink transition-colors ${isActive ? "text-ink" : ""}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={() => setIsOpen(true)}
          className="relative flex items-center gap-2 text-sm text-ink"
          aria-label="Open cart"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path d="M4 6h2l1.6 10.6a2 2 0 002 1.7h7.3a2 2 0 002-1.6L20 8H7" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="10" cy="21" r="1.2" fill="currentColor" stroke="none" />
            <circle cx="17" cy="21" r="1.2" fill="currentColor" stroke="none" />
          </svg>
          <span className="hidden sm:inline">Cart</span>
          {count > 0 && (
            <span className="absolute -top-2 -right-3 bg-rust text-ivory text-[10px] leading-none rounded-full w-4.5 h-4.5 px-1.5 py-1 flex items-center justify-center">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
