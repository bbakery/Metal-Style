"use client";

import { useEffect, useState } from "react";
import { defaultProducts, Product } from "../data/products";

const STORAGE_KEY = "metal-style-products";

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>(defaultProducts);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setProducts(JSON.parse(stored));
      } catch {
        setProducts(defaultProducts);
      }
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY && event.newValue) {
        try {
          setProducts(JSON.parse(event.newValue));
        } catch {
          setProducts(defaultProducts);
        }
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 relative z-10">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center neon-glow">Каталог товарів</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <article
            key={product.id}
            className="relative overflow-hidden rounded-[2rem] border border-cyan-500/15 bg-slate-950/70 p-6 shadow-[0_0_40px_rgba(0,255,255,0.08)] backdrop-blur-xl transition hover:border-cyan-400/40"
          >
            <div className="absolute top-5 right-5 w-32 h-32 rounded-full bg-pink-500/10 blur-3xl pointer-events-none" />
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-52 object-contain mb-5 rounded-[1.5rem] border border-cyan-500/20 bg-slate-950/80 p-4"
            />
            <h2 className="text-2xl font-semibold mb-3 text-cyan-200">{product.name}</h2>
            <p className="text-cyan-200/80 mb-3">{product.description}</p>
            <p className="text-cyan-400 mb-2 text-sm">Ключові слова: {product.keywords}</p>
            <p className="text-cyan-100 mb-4 text-lg font-semibold">{product.price} грн</p>
            <p
              className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${
                product.status === "inStock" ? "bg-cyan-500/15 text-cyan-200" : "bg-purple-500/15 text-purple-200"
              }`}
            >
              {product.status === "inStock" ? "В наявності" : "Під замовлення"}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={`https://wa.me/380508829303?text=Я%20хочу%20замовити%20${encodeURIComponent(product.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-3 text-black font-semibold shadow-lg shadow-cyan-500/30 transition hover:brightness-110 text-center"
              >
                WhatsApp
              </a>
              <a
                href={`viber://chat?number=%2B380508829303`}
                className="flex-1 rounded-2xl bg-gradient-to-r from-purple-500 to-fuchsia-500 px-4 py-3 text-white font-semibold shadow-lg shadow-purple-500/25 transition hover:brightness-110 text-center"
              >
                Viber
              </a>
            </div>
          </article>
        ))}
      </div>
      <section className="mt-12 rounded-[2rem] border border-purple-500/20 bg-black/40 p-8 backdrop-blur-xl shadow-[0_0_60px_rgba(170,0,255,0.12)]">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
          <div>
            <h2 className="text-3xl font-bold text-cyan-200">Оплата та доставка</h2>
            <p className="text-cyan-200/85 mt-2">
              Оплата здійснюється через USDT (Tether) або банківський переказ. Ми публікуємо товари з останніми цінами та статусом наявності.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-950/80 px-5 py-3 text-cyan-100 shadow-lg shadow-cyan-500/10">
            <span className="h-2 w-2 rounded-full bg-cyan-300" />
            Оновлено з адмін-панелі
          </div>
        </div>
      </section>
    </div>
  );
}
