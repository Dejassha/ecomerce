import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import net from "net";
import path from "path";
import { fileURLToPath } from "url";
import { db, initDb } from "./db.js";

dotenv.config();

initDb();

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || true,
  })
);
app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/* 🔥 IMPORTANT - single media folder for images */
const MEDIA_DIR = path.join(__dirname, "media");
if (!fs.existsSync(MEDIA_DIR)) fs.mkdirSync(MEDIA_DIR, { recursive: true });
app.use("/media", express.static(MEDIA_DIR));

const PORT_FILE = path.join(__dirname, ".active-port");
const PREFERRED_PORT = Number(process.env.PORT) || 5500;
const HOST = process.env.HOST || "127.0.0.1";

function generateOrderNumber() {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `EO-${stamp}-${rand}`;
}

// -- Products --------------------------------------------------------------

app.get("/api/products", (req, res) => {
  const { category } = req.query;
  let rows;
  if (category && category !== "All") {
    rows = db.prepare("SELECT * FROM products WHERE category = ? ORDER BY name").all(category);
  } else {
    rows = db.prepare("SELECT * FROM products ORDER BY name").all();
  }
  res.json(rows);
});

app.get("/api/products/:slug", (req, res) => {
  const row = db.prepare("SELECT * FROM products WHERE slug = ?").get(req.params.slug);
  if (!row) return res.status(404).json({ error: "Product not found" });
  res.json(row);
});

app.get("/api/categories", (req, res) => {
  const rows = db.prepare("SELECT DISTINCT category FROM products ORDER BY category").all();
  res.json(["All", ...rows.map((r) => r.category)]);
});

// -- Orders ------------------------------------------------------------------

app.post("/api/orders", (req, res) => {
  const { customer, items } = req.body;
  if (!customer || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Missing customer info or cart items" });
  }
  const { name, email, address, city, postalCode } = customer;
  if (!name || !email || !address || !city || !postalCode) {
    return res.status(400).json({ error: "Incomplete shipping details" });
  }

  const productStmt = db.prepare("SELECT * FROM products WHERE id = ?");
  let subtotal = 0;
  const resolvedItems = [];
  for (const item of items) {
    const product = productStmt.get(item.productId);
    if (!product) return res.status(400).json({ error: `Unknown product id ${item.productId}` });
    if (product.stock < item.quantity) {
      return res.status(400).json({ error: `${product.name} is short on stock (only ${product.stock} left)` });
    }
    subtotal += product.price * item.quantity;
    resolvedItems.push({ product, quantity: item.quantity });
  }

  const shipping = subtotal >= 40 ? 0 : 6.5;
  const total = subtotal + shipping;
  const orderNumber = generateOrderNumber();

  const insertOrder = db.prepare(`
    INSERT INTO orders (order_number, customer_name, customer_email, address, city, postal_code, subtotal, shipping, total)
    VALUES (@order_number, @customer_name, @customer_email, @address, @city, @postal_code, @subtotal, @shipping, @total)
  `);
  const insertItem = db.prepare(`
    INSERT INTO order_items (order_id, product_id, product_name, unit_price, quantity)
    VALUES (@order_id, @product_id, @product_name, @unit_price, @quantity)
  `);
  const updateStock = db.prepare("UPDATE products SET stock = stock - ? WHERE id = ?");

  const runTransaction = db.transaction(() => {
    const info = insertOrder.run({
      order_number: orderNumber,
      customer_name: name,
      customer_email: email,
      address,
      city,
      postal_code: postalCode,
      subtotal,
      shipping,
      total,
    });
    const orderId = info.lastInsertRowid;
    for (const { product, quantity } of resolvedItems) {
      insertItem.run({
        order_id: orderId,
        product_id: product.id,
        product_name: product.name,
        unit_price: product.price,
        quantity,
      });
      updateStock.run(quantity, product.id);
    }
    return orderId;
  });

  const orderId = runTransaction();
  const order = db.prepare("SELECT * FROM orders WHERE id = ?").get(orderId);
  const orderItems = db.prepare("SELECT * FROM order_items WHERE order_id = ?").all(orderId);
  res.status(201).json({ ...order, items: orderItems });
});

app.get("/api/orders/:orderNumber", (req, res) => {
  const order = db.prepare("SELECT * FROM orders WHERE order_number = ?").get(req.params.orderNumber);
  if (!order) return res.status(404).json({ error: "Order not found" });
  const items = db.prepare("SELECT * FROM order_items WHERE order_id = ?").all(order.id);
  res.json({ ...order, items });
});

app.get("/api/health", (req, res) => res.json({ ok: true }));

function findFreePort(start) {
  return new Promise((resolve, reject) => {
    function tryPort(port) {
      if (port > start + 20) return reject(new Error("Could not find a free port"));
      const probe = net.createServer();
      probe.once("error", () => probe.close(() => tryPort(port + 1)));
      probe.once("listening", () => probe.close(() => resolve(port)));
      probe.listen(port, "127.0.0.1");
    }
    tryPort(start);
  });
}

async function start() {
  let port;
  try {
    port = await findFreePort(PREFERRED_PORT);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
  fs.writeFileSync(PORT_FILE, String(port));
  app.listen(port, HOST, () => {
    console.log(`Violet & Vine API running at http://${HOST}:${port} (see .active-port)`);
  });
}

start();