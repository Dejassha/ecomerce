const BASE = import.meta.env.VITE_API_BASE_URL || "/api";

async function handle(res) {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed with ${res.status}`);
  }
  return res.json();
}

export const api = {
  getProducts: (category) =>
    fetch(`${BASE}/products${category && category !== "All" ? `?category=${encodeURIComponent(category)}` : ""}`).then(handle),
  getProduct: (slug) => fetch(`${BASE}/products/${slug}`).then(handle),
  getCategories: () => fetch(`${BASE}/categories`).then(handle),
  placeOrder: (payload) =>
    fetch(`${BASE}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(handle),
  getOrder: (orderNumber) => fetch(`${BASE}/orders/${orderNumber}`).then(handle),
};
