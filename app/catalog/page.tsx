"use client";

import { useEffect, useMemo, useState } from "react";
import { CATEGORY_LABEL, defaultProducts, Product, ProductCategory } from "../data/products";

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
    isPopular: product.isPopular ?? false,
    isRecommended: product.isRecommended ?? false,
    seoTitle: product.seoTitle ?? `${product.name} - Metal Style`,
    seoDescription: product.seoDescription ?? product.description,
  };
}

function slugifyProductName(name: string): string {
  const map: Record<string, string> = {
    а: "a", б: "b", в: "v", г: "h", ґ: "g", д: "d", е: "e", є: "ye", ж: "zh", з: "z", и: "y",
    і: "i", ї: "yi", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s",
    т: "t", у: "u", ф: "f", х: "kh", ц: "ts", ч: "ch", ш: "sh", щ: "shch", ь: "", ю: "yu", я: "ya",
  };
  return name
    .toLowerCase()
    .split("")
    .map((char) => map[char] ?? char)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>(defaultProducts.map(normalizeProduct));
  const [selectedImageByProduct, setSelectedImageByProduct] = useState<Record<number, number>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "inStock" | "madeToOrder">("all");
  const [categoryFilter, setCategoryFilter] = useState<"all" | ProductCategory>("all");
  const [badgeFilter, setBadgeFilter] = useState<"all" | "popular" | "recommended">("all");
  const [sortBy, setSortBy] = useState<"popular" | "priceAsc" | "priceDesc" | "nameAsc">("popular");
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [selectedModalImageIndex, setSelectedModalImageIndex] = useState(0);

  useEffect(() => {
    let isActive = true;

    async function loadProducts() {
      try {
        const response = await fetch("/api/products", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Failed to load");
        }
        const data = (await response.json()) as { products: Product[] };
        if (isActive) {
          setProducts(data.products.map(normalizeProduct));
        }
      } catch {
        if (isActive) {
          setProducts(defaultProducts.map(normalizeProduct));
        }
      }
    }

    loadProducts();
    const intervalId = window.setInterval(loadProducts, 30000);
    return () => {
      isActive = false;
      window.clearInterval(intervalId);
    };
  }, []);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const base = products.filter((product) => {
      const statusMatches = statusFilter === "all" || product.status === statusFilter;
      const categoryMatches = categoryFilter === "all" || product.category === categoryFilter;
      const badgeMatches =
        badgeFilter === "all" ||
        (badgeFilter === "popular" && product.isPopular) ||
        (badgeFilter === "recommended" && product.isRecommended);
      const queryMatches =
        query.length === 0 ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.keywords.toLowerCase().includes(query);
      return statusMatches && categoryMatches && badgeMatches && queryMatches;
    });

    if (sortBy === "priceAsc") {
      return [...base].sort((a, b) => a.price - b.price);
    }
    if (sortBy === "priceDesc") {
      return [...base].sort((a, b) => b.price - a.price);
    }
    if (sortBy === "nameAsc") {
      return [...base].sort((a, b) => a.name.localeCompare(b.name, "uk"));
    }
    return base;
  }, [products, searchQuery, statusFilter, categoryFilter, badgeFilter, sortBy]);

  const selectedProduct =
    selectedProductId === null ? null : products.find((product) => product.id === selectedProductId) ?? null;

  function setProductUrlParam(product: Product | null) {
    if (typeof window === "undefined") {
      return;
    }
    const url = new URL(window.location.href);
    if (product) {
      url.searchParams.set("product", slugifyProductName(product.name));
    } else {
      url.searchParams.delete("product");
    }
    window.history.replaceState({}, "", url.toString());
  }

  function openProductModal(product: Product) {
    setSelectedProductId(product.id);
    setSelectedModalImageIndex(0);
    setProductUrlParam(product);
  }

  function closeProductModal() {
    setSelectedProductId(null);
    setSelectedModalImageIndex(0);
    setProductUrlParam(null);
  }

  function copyProductLink(product: Product) {
    const slug = slugifyProductName(product.name);
    const link = `${window.location.origin}/catalog?product=${slug}`;
    navigator.clipboard.writeText(link);
  }

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const slugFromUrl = new URL(window.location.href).searchParams.get("product");
    if (!slugFromUrl) {
      return;
    }
    const foundProduct = products.find((product) => slugifyProductName(product.name) === slugFromUrl);
    if (foundProduct) {
      setSelectedProductId(foundProduct.id);
      setSelectedModalImageIndex(0);
    }
  }, [products]);

  return (
    <div className="container mx-auto px-4 py-8 relative z-10">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center neon-glow">Каталог товарів</h1>
      <section className="mb-8 rounded-[1.5rem] border border-cyan-500/20 bg-slate-950/70 p-4 md:p-6">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Пошук за назвою, описом або ключовими словами"
            className="rounded-2xl border border-cyan-500/20 bg-slate-950/80 px-4 py-3 text-cyan-100"
          />
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as "all" | "inStock" | "madeToOrder")}
            className="rounded-2xl border border-cyan-500/20 bg-slate-950/80 px-4 py-3 text-cyan-100"
          >
            <option value="all">Всі статуси</option>
            <option value="inStock">Лише в наявності</option>
            <option value="madeToOrder">Лише під замовлення</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value as "all" | ProductCategory)}
            className="rounded-2xl border border-cyan-500/20 bg-slate-950/80 px-4 py-3 text-cyan-100"
          >
            <option value="all">Всі категорії</option>
            {Object.entries(CATEGORY_LABEL).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <select
            value={badgeFilter}
            onChange={(event) => setBadgeFilter(event.target.value as "all" | "popular" | "recommended")}
            className="rounded-2xl border border-cyan-500/20 bg-slate-950/80 px-4 py-3 text-cyan-100"
          >
            <option value="all">Всі товари</option>
            <option value="popular">Лише популярні</option>
            <option value="recommended">Лише рекомендовані</option>
          </select>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as "popular" | "priceAsc" | "priceDesc" | "nameAsc")}
            className="rounded-2xl border border-cyan-500/20 bg-slate-950/80 px-4 py-3 text-cyan-100"
          >
            <option value="popular">Сортування: стандартне</option>
            <option value="priceAsc">Ціна: від дешевих</option>
            <option value="priceDesc">Ціна: від дорогих</option>
            <option value="nameAsc">Назва: А-Я</option>
          </select>
        </div>
        <p className="mt-3 text-sm text-cyan-300/80">Знайдено товарів: {filteredProducts.length}</p>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <article
            key={product.id}
            className="relative overflow-hidden rounded-[2rem] border border-cyan-500/15 bg-slate-950/70 p-5 shadow-[0_0_40px_rgba(0,255,255,0.08)] backdrop-blur-xl transition hover:border-cyan-400/40"
          >
            <div className="absolute top-5 right-5 w-32 h-32 rounded-full bg-pink-500/10 blur-3xl pointer-events-none" />
            {(() => {
              const productImages = getProductImages(product);
              const selectedIndex = selectedImageByProduct[product.id] ?? 0;
              const selectedImage = productImages[selectedIndex] ?? productImages[0] ?? "/logo.svg";
              return (
                <>
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-52 object-contain mb-5 rounded-[1.5rem] border border-cyan-500/20 bg-slate-950/80 p-4"
            />
            {productImages.length > 1 && (
              <div className="mb-5 grid grid-cols-4 gap-2">
                {productImages.map((image, index) => (
                  <button
                    key={`${product.id}-${index}`}
                    type="button"
                    onClick={() =>
                      setSelectedImageByProduct((current) => ({ ...current, [product.id]: index }))
                    }
                    className={`overflow-hidden rounded-xl border ${
                      selectedIndex === index ? "border-cyan-300" : "border-cyan-500/20"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="h-14 w-full bg-slate-950/80 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
                </>
              );
            })()}
            <button
              type="button"
              onClick={() => openProductModal(product)}
              className="text-left text-2xl font-semibold mb-3 text-cyan-200 hover:text-cyan-100"
            >
              {product.name}
            </button>
            <p className="text-cyan-200/80 mb-3">{product.seoDescription || product.description}</p>
            <p className="text-cyan-400 mb-2 text-sm">Ключові слова: {product.keywords}</p>
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs text-cyan-200">
                {CATEGORY_LABEL[product.category]}
              </span>
              {product.isPopular && <span className="rounded-full bg-pink-500/20 px-3 py-1 text-xs text-pink-200">Популярний</span>}
              {product.isRecommended && (
                <span className="rounded-full bg-lime-500/20 px-3 py-1 text-xs text-lime-200">Рекомендований</span>
              )}
            </div>
            <p className="text-cyan-100 mb-4 text-lg font-semibold">{product.price} грн</p>
            <p
              className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${
                product.status === "inStock" ? "bg-cyan-500/15 text-cyan-200" : "bg-purple-500/15 text-purple-200"
              }`}
            >
              {product.status === "inStock" ? "В наявності" : "Під замовлення"}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => openProductModal(product)}
                className="flex-1 rounded-2xl border border-cyan-500/30 bg-slate-900/70 px-4 py-3 text-cyan-100 font-semibold transition hover:border-cyan-300 text-center"
              >
                Деталі
              </button>
              <button
                type="button"
                onClick={() => copyProductLink(product)}
                className="flex-1 rounded-2xl border border-lime-500/30 bg-slate-900/70 px-4 py-3 text-lime-200 font-semibold transition hover:border-lime-300 text-center"
              >
                Копіювати посилання
              </button>
            </div>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
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
      {selectedProduct && (() => {
        const modalImages = getProductImages(selectedProduct);
        const safeIndex = Math.min(selectedModalImageIndex, modalImages.length - 1);
        const currentImage = modalImages[safeIndex] ?? "/logo.svg";
        return (
          <div className="fixed inset-0 z-50 flex items-end bg-black/70 p-0 md:items-center md:justify-center md:p-4">
            <div className="w-full rounded-t-3xl border border-cyan-500/20 bg-slate-950 p-4 md:max-w-4xl md:rounded-3xl md:p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-2xl font-bold text-cyan-100">{selectedProduct.name}</h3>
                <button
                  type="button"
                  onClick={closeProductModal}
                  className="rounded-xl border border-cyan-500/30 px-3 py-2 text-cyan-100"
                >
                  Закрити
                </button>
              </div>
              <div className="relative">
                <img
                  src={currentImage}
                  alt={selectedProduct.name}
                  className="h-64 w-full rounded-2xl border border-cyan-500/20 bg-slate-900 object-contain p-3 md:h-96"
                />
                {modalImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => setSelectedModalImageIndex((current) => (current <= 0 ? modalImages.length - 1 : current - 1))}
                      className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/70 px-3 py-2 text-cyan-100"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedModalImageIndex((current) => (current >= modalImages.length - 1 ? 0 : current + 1))}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/70 px-3 py-2 text-cyan-100"
                    >
                      →
                    </button>
                  </>
                )}
              </div>
              {modalImages.length > 1 && (
                <div className="mt-3 grid grid-cols-4 gap-2 md:grid-cols-6">
                  {modalImages.map((image, index) => (
                    <button
                      key={`${selectedProduct.id}-${index}`}
                      type="button"
                      onClick={() => setSelectedModalImageIndex(index)}
                      className={`overflow-hidden rounded-xl border ${
                        safeIndex === index ? "border-cyan-300" : "border-cyan-500/20"
                      }`}
                    >
                      <img src={image} alt={`${selectedProduct.name} ${index + 1}`} className="h-16 w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
              <p className="mt-4 text-cyan-200/80">{selectedProduct.description}</p>
              <p className="mt-2 text-2xl font-semibold text-cyan-100">{selectedProduct.price} грн</p>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <a
                  href={`https://wa.me/380508829303?text=Я%20хочу%20замовити%20${encodeURIComponent(selectedProduct.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-3 text-center font-semibold text-black"
                >
                  Замовити у WhatsApp
                </a>
                <a
                  href="viber://chat?number=%2B380508829303"
                  className="rounded-2xl bg-gradient-to-r from-purple-500 to-fuchsia-500 px-4 py-3 text-center font-semibold text-white"
                >
                  Замовити у Viber
                </a>
              </div>
            </div>
          </div>
        );
      })()}
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
