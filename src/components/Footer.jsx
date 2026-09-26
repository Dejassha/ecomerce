import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-line mt-24">
      <div className="container-page py-12 grid grid-cols-1 sm:grid-cols-3 gap-10">
        <div>
          <p className="font-display text-lg mb-2">Violet & Vine</p>
          <p className="text-sm text-ink/60 max-w-xs">
            A small-batch dress shop cut from natural fabrics, made in runs we can count on one hand. Every piece is sewn to be worn for years, not a season.
          </p>
        </div>
        <div>
          <p className="text-xs text-ink/50 mb-3">Visit</p>
          <p className="text-sm text-ink/70">118 Kiln Street<br />Portland, OR</p>
          <p className="text-sm text-ink/70 mt-2">Open Tue–Sun, 10am–6pm</p>
        </div>
        <div>
          <p className="text-xs text-ink/50 mb-3">Good to know</p>
          <p className="text-sm text-ink/70">Free shipping over $40.</p>
          <p className="text-sm text-ink/70 mt-2">Free returns within 30 days.</p>
        </div>
      </div>
      <div className="container-page py-6 border-t border-line text-xs text-ink/40">
        This is a demo storefront built for a coding exercise — nothing here ships for real.
      </div>
    </footer>
  );
}
