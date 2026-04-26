"use client";

import { useEffect, useState } from "react";
import { CATEGORY_LABEL, Product, ProductCategory, ProductStatus, defaultProducts } from "../data/products";

const STORAGE_KEY = "metal-style-products";
const STATUS_LABEL: Record<ProductStatus, string> = {
  inStock: "В наявності",
  madeToOrder: "Під замовлення",
};

function getProductImages(product: Product): string[] {
  if (product.images && product.images.length > 0) {
    return product.images;
  }
  return product.image ? [product.image] : [];
}

function normalizeProduct(product: Product): Product {
  return {
    ...product,
    category: product.category ?? "other",
    seoTitle: product.seoTitle ?? `${product.name} - Metal Style`,
    seoDescription: product.seoDescription ?? product.description,
    isPopular: product.isPopular ?? false,
    isRecommended: product.isRecommended ?? false,
    images: getProductImages(product),
    image: getProductImages(product)[0] ?? "/logo.svg",
  };
}

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
  const [draggedImageIndexByProduct, setDraggedImageIndexByProduct] = useState<Record<number, number | null>>({});

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Product[];
        setProducts(parsed.map(normalizeProduct));
      } catch {
        setProducts(defaultProducts.map(normalizeProduct));
      }
    } else {
      setProducts(defaultProducts.map(normalizeProduct));
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
        images: ["/logo.svg"],
        keywords: "новий товар",
        status: "inStock",
        category: "other",
        isPopular: false,
        isRecommended: false,
        seoTitle: "Новий товар - Metal Style",
        seoDescription: "Опис нового виробу",
      },
    ]);
  }

  function removeProduct(id: number) {
    const confirmed = window.confirm("Видалити цей товар? Дію неможливо скасувати.");
    if (!confirmed) {
      return;
    }
    setProducts((current) => current.filter((product) => product.id !== id));
  }

  async function handleImageChange(id: number, files: FileList) {
    const dataUrls = await Promise.all(Array.from(files).map(readFileAsDataUrl));
    setProducts((current) =>
      current.map((product) => {
        if (product.id !== id) {
          return product;
        }
        const mergedImages = [...getProductImages(product), ...dataUrls];
        return { ...product, image: mergedImages[0], images: mergedImages };
      })
    );
  }

  function removeProductImage(id: number, imageIndex: number) {
    const confirmed = window.confirm("Видалити це фото?");
    if (!confirmed) {
      return;
    }
    setProducts((current) =>
      current.map((product) => {
        if (product.id !== id) {
          return product;
        }
        const nextImages = getProductImages(product).filter((_, index) => index !== imageIndex);
        const fallbackImage = nextImages[0] ?? "/logo.svg";
        return { ...product, image: fallbackImage, images: nextImages.length > 0 ? nextImages : [fallbackImage] };
      })
    );
  }

  function moveProductImage(id: number, fromIndex: number, toIndex: number) {
    setProducts((current) =>
      current.map((product) => {
        if (product.id !== id) {
          return product;
        }
        const images = getProductImages(product);
        if (
          fromIndex < 0 ||
          toIndex < 0 ||
          fromIndex >= images.length ||
          toIndex >= images.length ||
          fromIndex === toIndex
        ) {
          return product;
        }
        const nextImages = [...images];
        const [moved] = nextImages.splice(fromIndex, 1);
        nextImages.splice(toIndex, 0, moved);
        return { ...product, image: nextImages[0], images: nextImages };
      })
    );
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
            {(() => {
              const productImages = getProductImages(product);
              return (
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
              <div className="w-full lg:w-72">
                <div className="relative overflow-hidden rounded-[1.5rem] border border-cyan-500/20 bg-slate-950/80 p-4">
                  <img src={productImages[0] ?? "/logo.svg"} alt={product.name} className="h-64 w-full object-contain" />
                </div>
                {productImages.length > 1 && (
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {productImages.map((image, index) => (
                      <div
                        key={`${product.id}-${index}`}
                        className="relative"
                        draggable
                        onDragStart={() =>
                          setDraggedImageIndexByProduct((current) => ({ ...current, [product.id]: index }))
                        }
                        onDragOver={(event) => event.preventDefault()}
                        onDrop={() => {
                          const fromIndex = draggedImageIndexByProduct[product.id];
                          if (typeof fromIndex === "number") {
                            moveProductImage(product.id, fromIndex, index);
                          }
                          setDraggedImageIndexByProduct((current) => ({ ...current, [product.id]: null }));
                        }}
                        onDragEnd={() =>
                          setDraggedImageIndexByProduct((current) => ({ ...current, [product.id]: null }))
                        }
                      >
                        <img
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          className="h-14 w-full rounded-xl border border-cyan-500/20 bg-slate-950/80 object-cover"
                        />
                        <div className="absolute left-1 top-1 flex gap-1">
                          <button
                            type="button"
                            onClick={() => moveProductImage(product.id, index, index - 1)}
                            className="rounded bg-black/70 px-1.5 text-xs text-cyan-100"
                            title="Посунути ліворуч"
                          >
                            ←
                          </button>
                          <button
                            type="button"
                            onClick={() => moveProductImage(product.id, index, index + 1)}
                            className="rounded bg-black/70 px-1.5 text-xs text-cyan-100"
                            title="Посунути праворуч"
                          >
                            →
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeProductImage(product.id, index)}
                          className="absolute -right-1 -top-1 rounded-full bg-red-600 px-1.5 text-xs text-white"
                          title="Видалити фото"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {productImages.length > 1 && (
                  <p className="mt-2 text-xs text-cyan-300/70">Порядок фото: перетягніть мініатюри або використайте ← →.</p>
                )}
                <label className="mt-4 block text-cyan-200">
                  Додати фото (можна декілька)
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="mt-2 w-full rounded-2xl border border-cyan-500/20 bg-slate-950/80 px-4 py-3 text-cyan-100"
                    onChange={async (event) => {
                      if (event.target.files?.length) {
                        await handleImageChange(product.id, event.target.files);
                        event.target.value = "";
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

                <div className="grid gap-4 md:grid-cols-3">
                  <label className="block text-cyan-200">
                    Категорія
                    <select
                      value={product.category}
                      onChange={(event) => updateProduct(product.id, { category: event.target.value as ProductCategory })}
                      className="mt-2 w-full rounded-2xl border border-cyan-500/20 bg-slate-950/80 px-4 py-3 text-cyan-100"
                    >
                      {Object.entries(CATEGORY_LABEL).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </label>
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
                  <div className="flex flex-col justify-end gap-2">
                    <label className="inline-flex items-center gap-2 text-cyan-200">
                      <input
                        type="checkbox"
                        checked={Boolean(product.isPopular)}
                        onChange={(event) => updateProduct(product.id, { isPopular: event.target.checked })}
                      />
                      Популярний
                    </label>
                    <label className="inline-flex items-center gap-2 text-cyan-200">
                      <input
                        type="checkbox"
                        checked={Boolean(product.isRecommended)}
                        onChange={(event) => updateProduct(product.id, { isRecommended: event.target.checked })}
                      />
                      Рекомендований
                    </label>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block text-cyan-200">
                    SEO Title
                    <input
                      type="text"
                      value={product.seoTitle ?? ""}
                      onChange={(event) => updateProduct(product.id, { seoTitle: event.target.value })}
                      className="mt-2 w-full rounded-2xl border border-cyan-500/20 bg-slate-950/80 px-4 py-3 text-cyan-100"
                    />
                  </label>
                  <label className="block text-cyan-200">
                    SEO Description
                    <textarea
                      value={product.seoDescription ?? ""}
                      onChange={(event) => updateProduct(product.id, { seoDescription: event.target.value })}
                      rows={3}
                      className="mt-2 w-full rounded-2xl border border-cyan-500/20 bg-slate-950/80 px-4 py-3 text-cyan-100"
                    />
                  </label>
                </div>
                <div className="flex items-end justify-between gap-3">
                  <span className="text-cyan-200">
                    Стан: {STATUS_LABEL[product.status]} · Категорія: {CATEGORY_LABEL[product.category]}
                  </span>
                  <div className="flex items-center gap-2">
                    {product.isPopular && <span className="rounded-full bg-pink-500/20 px-2 py-1 text-xs text-pink-200">Популярний</span>}
                    {product.isRecommended && (
                      <span className="rounded-full bg-lime-500/20 px-2 py-1 text-xs text-lime-200">Рекомендований</span>
                    )}
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
              );
            })()}
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
