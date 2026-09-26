# Violet & Vine — a full-stack e-commerce demo

A small dress-shop storefront built to show a complete (if simple) e-commerce
stack: a React UI, a REST API, and a real SQLite database — no external services
required.

## Stack

- **Frontend:** React 18 + Vite + React Router + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** SQLite via `better-sqlite3` (file-based, zero setup)

## What's included

- Product catalog with categories (Dresses, Tops, Bottoms, Outerwear), stored in and served from SQLite
- Product detail pages
- Client-side cart (persisted to `localStorage`) with a slide-out drawer and a dedicated cart page
- Checkout flow that creates a real order in the database, decrements stock, and computes shipping
- Order confirmation page that re-fetches the order from the database by order number
- A distinct visual identity: warm ivory/charcoal palette, Fraunces + Public Sans type, and small
  illustrated SVG "product art" instead of stock photography (so the app needs no image assets)

## Project structure

```
ember-oak/
├── backend/
│   ├── server.js          Express app + REST routes
│   ├── db.js               SQLite schema + seeding
│   ├── products.seed.json  Initial catalog data (dresses, tops, bottoms, outerwear)
│   └── package.json
└── frontend/
    ├── src/
    │   ├── pages/           Home, Shop, ProductDetail, Cart, Checkout, OrderSuccess
    │   ├── components/      Navbar, Footer, ProductCard, CartDrawer, ProductArt
    │   ├── context/          CartContext (cart state + localStorage)
    │   ├── api.js            Fetch wrapper for the backend API
    │   └── App.jsx / main.jsx
    ├── index.html
    └── package.json
```

## Running it locally

You'll need Node.js 18+ installed.

**1. Start the backend** (runs on http://localhost:4000, creates `emberoak.db` on first run):

```bash
cd backend
npm install
npm start
```

**2. In a second terminal, start the frontend** (runs on http://localhost:5173):

```bash
cd frontend
npm install
npm run dev
```

Vite proxies `/api/*` requests to the backend automatically (see `vite.config.js`), so just open
http://localhost:5173 in your browser.

## API reference

| Method | Route                       | Description                                  |
|--------|------------------------------|-----------------------------------------------|
| GET    | `/api/products`              | List products (optional `?category=` filter) |
| GET    | `/api/products/:slug`        | Get one product by slug                       |
| GET    | `/api/categories`            | List distinct categories                      |
| POST   | `/api/orders`                | Place an order (body: `{ customer, items }`)  |
| GET    | `/api/orders/:orderNumber`   | Look up a placed order                        |

## Notes

- The database file (`backend/emberoak.db`) is created and seeded automatically the first time
  the server starts. Delete it to reset the catalog and wipe orders.
- Checkout is a demo flow — no real payment provider is wired up.
- To build the frontend for production: `cd frontend && npm run build` (outputs to `frontend/dist`).
  You'd serve that build behind the same Express server or any static host, pointed at the API.
