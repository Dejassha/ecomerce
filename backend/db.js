import Database from "better-sqlite3";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function resolveDbPath() {
  const configured = process.env.DB_PATH || "./emberoak.db";
  return path.isAbsolute(configured) ? configured : path.join(__dirname, configured);
}

const DB_PATH = resolveDbPath();

export const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");

export function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      origin TEXT,
      roast TEXT,
      price REAL NOT NULL,
      notes TEXT,
      description TEXT,
      stock INTEGER NOT NULL DEFAULT 0,
      image TEXT
    );

    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_number TEXT UNIQUE NOT NULL,
      customer_name TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      address TEXT NOT NULL,
      city TEXT NOT NULL,
      postal_code TEXT NOT NULL,
      subtotal REAL NOT NULL,
      shipping REAL NOT NULL,
      total REAL NOT NULL,
      status TEXT NOT NULL DEFAULT 'confirmed',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL REFERENCES orders(id),
      product_id INTEGER NOT NULL REFERENCES products(id),
      product_name TEXT NOT NULL,
      unit_price REAL NOT NULL,
      quantity INTEGER NOT NULL
    );
  `);

  const count = db.prepare("SELECT COUNT(*) AS c FROM products").get().c;
  if (count === 0) {
    const seedPath = path.join(__dirname, "products.seed.json");
    const seed = JSON.parse(fs.readFileSync(seedPath, "utf-8"));
    const insert = db.prepare(`
      INSERT INTO products (slug, name, category, origin, roast, price, notes, description, stock, image)
      VALUES (@slug, @name, @category, @origin, @roast, @price, @notes, @description, @stock, @image)
    `);
    const insertMany = db.transaction((rows) => {
      for (const row of rows) insert.run(row);
    });
    insertMany(seed);
    console.log(`Seeded ${seed.length} products into ${DB_PATH}`);
  }
}
