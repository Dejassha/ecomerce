import React from "react";

// Small hand-drawn-style SVG marks standing in for product photography.
// Keeps the app fully self-contained (no external image hosting needed)
// and gives the catalog a consistent, illustrated identity.

const palettes = {
  Dresses: { bg: "#EFE3C8", line: "#3F5641" },
  Tops: { bg: "#E7DCCB", line: "#241C15" },
  Bottoms: { bg: "#EAD9C9", line: "#9C4A2E" },
  Outerwear: { bg: "#DCE0D3", line: "#2E4030" },
};

function DressMidi({ line }) {
  return (
    <g stroke={line} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M50 24 L46 42 M90 24 L94 42" />
      <path d="M46 42 Q70 66 40 106 L100 106 Q70 66 94 42" />
    </g>
  );
}

function DressWrap({ line }) {
  return (
    <g stroke={line} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M44 30 L70 52 L96 30 L94 46 L70 58 L46 46 Z" />
      <path d="M46 58 Q44 82 36 106 L104 106 Q96 82 94 58" />
      <path d="M52 60 L62 66 M58 66 L58 74" />
    </g>
  );
}

function DressSlip({ line }) {
  return (
    <g stroke={line} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M49 24 L45 44 M91 24 L95 44" />
      <path d="M45 44 Q70 76 95 44" />
      <path d="M46 52 Q44 78 38 108 L102 108 Q96 78 94 52" />
    </g>
  );
}

function DressSun({ line }) {
  return (
    <g stroke={line} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M50 30 L48 18 M90 30 L92 18" />
      <path d="M47 30 L93 30 L91 44 L49 44 Z" />
      <path d="M49 44 Q46 72 40 106 L100 106 Q94 72 91 44" />
      <path d="M55 34 L85 34" />
    </g>
  );
}

function DressShift({ line }) {
  return (
    <g stroke={line} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M48 24 L92 24 L94 96 L46 96 Z" />
      <path d="M48 24 L40 40 M92 24 L100 40" />
      <path d="M58 24 Q70 32 82 24" />
    </g>
  );
}

function DressMaxi({ line }) {
  return (
    <g stroke={line} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M46 20 L60 12 L80 12 L94 20" />
      <path d="M46 20 L40 60 M94 20 L100 60" />
      <path d="M52 24 L52 108 Q70 112 88 108 L88 24" />
    </g>
  );
}

function DressShirt({ line }) {
  return (
    <g stroke={line} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M52 26 L62 30 L70 26 L78 30 L88 26" />
      <path d="M52 26 L52 94 L88 94 L88 26" />
      <path d="M52 30 L42 46 M88 30 L98 46" />
      <path d="M58 34 L70 40 L82 34" />
      <path d="M62 50 L62 94 M60 50 L60 94" />
    </g>
  );
}

function DressTea({ line }) {
  return (
    <g stroke={line} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M50 18 L52 40 M90 18 L88 40" />
      <path d="M48 40 L92 40" />
      <path d="M48 40 Q46 78 38 108 L102 108 Q94 78 92 40" />
      <path d="M56 24 Q60 16 66 18 M74 18 Q80 16 84 24" />
    </g>
  );
}

function DressSmocked({ line }) {
  return (
    <g stroke={line} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M46 20 L40 38 L40 52 M94 20 L100 38 L100 52" />
      <path d="M48 30 L92 30 L92 46 L48 46 Z" />
      <path d="M48 46 Q46 74 40 106 L100 106 Q94 74 92 46" />
    </g>
  );
}

function DressColumn({ line }) {
  return (
    <g stroke={line} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M50 20 L48 40 M90 20 L92 40" />
      <path d="M48 40 Q70 62 92 40" />
      <path d="M48 48 L92 48 L92 106 L48 106 Z" />
    </g>
  );
}

function Shirt({ line }) {
  return (
    <g stroke={line} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M52 26 L62 30 L70 26 L78 30 L88 26" />
      <path d="M52 26 L52 94 L88 94 L88 26" />
      <path d="M52 30 L42 46 M88 30 L98 46" />
      <path d="M58 34 L70 40 L82 34" />
      <path d="M59 52 L61 52 M59 66 L61 66 M59 80 L61 80" />
    </g>
  );
}

function Knit({ line }) {
  return (
    <g stroke={line} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M48 30 L60 24 L80 24 L92 30" />
      <path d="M48 30 L48 96 L92 96 L92 30" />
      <path d="M48 32 L36 52 M92 32 L104 52" />
      <path d="M56 22 L64 18 L76 18 L84 22" />
    </g>
  );
}

function Tee({ line }) {
  return (
    <g stroke={line} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M46 24 L94 24 L94 86 L46 86 Z" />
      <path d="M46 30 L36 44 M94 30 L104 44" />
      <path d="M54 18 L66 26 L74 26 L86 18" />
    </g>
  );
}

function Culottes({ line }) {
  return (
    <g stroke={line} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M48 32 L92 32" />
      <path d="M48 32 L42 58 M92 32 L98 58" />
      <path d="M42 58 L32 96 M98 58 L108 96" />
      <path d="M32 96 L44 96 M108 96 L96 96" />
      <path d="M58 32 L62 96 M82 32 L78 96" />
    </g>
  );
}

function Skirt({ line }) {
  return (
    <g stroke={line} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M48 28 L92 28" />
      <path d="M50 30 L40 96 L100 96 L90 30" />
      <path d="M48 38 L44 96 M56 38 L52 96 M66 38 L61 96 M78 38 L73 96 M88 38 L84 96" />
    </g>
  );
}

function Trench({ line }) {
  return (
    <g stroke={line} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M46 22 L58 18 L70 24 L82 18 L94 22" />
      <path d="M46 22 L46 96 L94 96 L94 22" />
      <path d="M46 26 L34 46 M94 26 L106 46" />
      <path d="M64 24 L64 74 L56 78 M76 24 L76 74 L84 78" />
      <path d="M52 92 L88 92" />
    </g>
  );
}

const ART = {
  "dress-midi": DressMidi,
  "dress-wrap": DressWrap,
  "dress-slip": DressSlip,
  "dress-sundress": DressSun,
  "dress-shift": DressShift,
  "dress-maxi": DressMaxi,
  "dress-shirt": DressShirt,
  "dress-tea": DressTea,
  "dress-smocked": DressSmocked,
  "dress-column": DressColumn,
  "top-shirt": Shirt,
  "top-knit": Knit,
  "top-tee": Tee,
  "bottom-culottes": Culottes,
  "bottom-skirt": Skirt,
  "outer-trench": Trench,
};

export function ProductMark({ image, line = "#241C15", className = "" }) {
  const Mark = ART[image] || DressMidi;
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 140 120" className="w-2/5 h-2/5">
        <Mark line={line} />
      </svg>
    </div>
  );
}

export default function ProductArt({ image, category, className = "" }) {
  const { bg, line } = palettes[category] || palettes.Dresses;
  const Mark = ART[image] || DressMidi;
  return (
    <div className={`flex items-center justify-center ${className}`} style={{ backgroundColor: bg }}>
      <svg viewBox="0 0 140 120" className="w-2/5 h-2/5">
        <Mark line={line} />
      </svg>
    </div>
  );
}