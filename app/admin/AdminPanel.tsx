"use client";

import { useEffect, useState } from "react";
import { Product, ProductStatus, defaultProducts } from "../data/products";

const STORAGE_KEY = "metal-style-products";
const STATUS_LABEL: Record<ProductStatus, string> = {
  inStock: "В наявності",
  madeToOrder: "Під замовлення",
};

function productFromForm(product: Product, updates: Partial<Product>): Product {
  return { ...product, ...updates };
}

async function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Не вдалося зчитати файл"));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export default function AdminPanel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Product[];
        setProducts(parsed);
      } catch {
        setProducts(defaultProducts);
      }
    } else {
      setProducts(defaultProducts);
    }
  }, []);

  function saveProducts(updated: Product[]) {
    setProducts(updated);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setMessage("Зміни опубліковано в каталозі");
    setTimeout(() => setMessage(""), 3000);
  }

  function updateProduct(id: number, updates: Partial<Product>) {
    setProducts((current) =>
      current.map((product) => (product.id === id ? productFromForm(product, updates) : product))
    );
  }

  function addProduct() {
    const nextId = products.length > 0 ? Math.max(...products.map((item) => item.id)) + 1 : 1;
    setProducts((current) => [
      ...current,
      {
        id: nextId,
        name: "Новий товар",
        description: "Опис нового виробу",
        price: 0,
        image: "/logo.svg",
        keywords: "новий товар",
        status: "inStock",
      },
    ]);
  }

  function removeProduct(id: number) {
    setProducts((current) => current.filter((product) => product.id !== id));
  }

  async function handleImageChange(id: number, file: File) {
    const dataUrl = await readFileAsDataUrl(file);
    updateProduct(id, { image: dataUrl });
  }

  async function handleLogout() {
    setLoading(true);
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  return (
    <div className="container mx-auto px-4 py-10 relative z-10">
      <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-cyan-100 neon-glow">Адмін-панель Metal Style</h1>
          <p className="text-cyan-200/80 max-w-2xl">
            Тут ви можете додавати фото, змінювати ціну, задавати статус наявності та публікувати товари до каталогу.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={addProduct}
            className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-3 text-black font-semibold shadow-lg shadow-cyan-500/25 hover:brightness-110 transition"
          >
            Додати товар
          </button>
          <button
            type="button"
            onClick={handleLogout}
            disabled={loading}
            className="rounded-2xl border border-cyan-500/40 bg-black/40 px-5 py-3 text-cyan-100 shadow-lg shadow-cyan-500/10 hover:bg-black/60 transition"
          >
            Вийти
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {products.map((product) => (
          <section key={product.id} className="glass-panel rounded-[2rem] border border-cyan-500/15 p-6 shadow-[0_0_40px_rgba(0,255,255,0.08)]">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
              <div className="w-full lg:w-72">
                <div className="relative overflow-hidden rounded-[1.5rem] border border-cyan-500/20 bg-slate-950/80 p-4">
                  <img src={product.image} alt={product.name} className="h-64 w-full object-contain" />
                </div>
                <label className="mt-4 block text-cyan-200">
                  Змінити фото
                  <input
                    type="file"
                    accept="image/*"
                    className="mt-2 w-full rounded-2xl border border-cyan-500/20 bg-slate-950/80 px-4 py-3 text-cyan-100"
                    onChange={async (event) => {
                      if (event.target.files?.[0]) {
                        await handleImageChange(product.id, event.target.files[0]);
                      }
                    }}
                  />
                </label>
              </div>

              <div className="flex-1 space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block text-cyan-200">
                    Назва товару
                    <input
                      type="text"
                      value={product.name}
                      onChange={(event) => updateProduct(product.id, { name: event.target.value })}
                      className="mt-2 w-full rounded-2xl border border-cyan-500/20 bg-slate-950/80 px-4 py-3 text-cyan-100"
                    />
                  </label>
                  <label className="block text-cyan-200">
                    Ціна, грн
                    <input
                      type="number"
                      value={product.price}
                      onChange={(event) => updateProduct(product.id, { price: Number(event.target.value) })}
                      className="mt-2 w-full rounded-2xl border border-cyan-500/20 bg-slate-950/80 px-4 py-3 text-cyan-100"
                    />
                  </label>
                </div>

                <label className="block text-cyan-200">
                  Опис
                  <textarea
                    value={product.description}
                    onChange={(event) => updateProduct(product.id, { description: event.target.value })}
                    rows={4}
                    className="mt-2 w-full rounded-2xl border border-cyan-500/20 bg-slate-950/80 px-4 py-3 text-cyan-100"
                  />
                </label>

                <label className="block text-cyan-200">
                  Ключові слова
                  <input
                    type="text"
                    value={product.keywords}
                    onChange={(event) => updateProduct(product.id, { keywords: event.target.value })}
                    className="mt-2 w-full rounded-2xl border border-cyan-500/20 bg-slate-950/80 px-4 py-3 text-cyan-100"
                  />
                </label>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block text-cyan-200">
                    Статус
                    <select
                      value={product.status}
                      onChange={(event) => updateProduct(product.id, { status: event.target.value as ProductStatus })}
                      className="mt-2 w-full rounded-2xl border border-cyan-500/20 bg-slate-950/80 px-4 py-3 text-cyan-100"
                    >
                      <option value="inStock">В наявності</option>
                      <option value="madeToOrder">Під замовлення</option>
                    </select>
                  </label>

                  <div className="flex items-end justify-between gap-3">
                    <span className="text-cyan-200">Стан: {STATUS_LABEL[product.status]}</span>
                    <button
                      type="button"
                      onClick={() => removeProduct(product.id)}
                      className="rounded-2xl bg-red-600 px-4 py-3 text-white shadow-lg shadow-red-500/20 hover:bg-red-500 transition"
                    >
                      Видалити
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <button
          type="button"
          onClick={() => saveProducts(products)}
          className="rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 px-6 py-3 text-black font-semibold shadow-lg shadow-cyan-500/20 hover:brightness-110 transition"
        >
          Опублікувати зміни в каталозі
        </button>
        {message && <p className="text-lime-300">{message}</p>}
      </div>
    </div>
  );
}
