import { kv } from "@vercel/kv";
import { Product, defaultProducts } from "@/app/data/products";

const KV_KEY = "metal-style-products";

declare global {
  // eslint-disable-next-line no-var
  var __metalStyleProducts__: Product[] | undefined;
}

function normalizeProducts(products: Product[]): Product[] {
  return products.map((product) => ({
    ...product,
    images: product.images && product.images.length > 0 ? product.images : [product.image],
    image: product.image || product.images?.[0] || "/logo.svg",
    category: product.category ?? "other",
    isPopular: product.isPopular ?? false,
    isRecommended: product.isRecommended ?? false,
    seoTitle: product.seoTitle ?? `${product.name} - Metal Style`,
    seoDescription: product.seoDescription ?? product.description,
  }));
}

function hasKvConfig(): boolean {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

export async function getStoredProducts(): Promise<Product[]> {
  if (hasKvConfig()) {
    const stored = await kv.get<Product[]>(KV_KEY);
    if (stored && stored.length > 0) {
      return normalizeProducts(stored);
    }
    const initial = normalizeProducts(defaultProducts);
    await kv.set(KV_KEY, initial);
    return initial;
  }

  if (!global.__metalStyleProducts__) {
    global.__metalStyleProducts__ = normalizeProducts(defaultProducts);
  }
  return global.__metalStyleProducts__;
}

export async function saveStoredProducts(products: Product[]): Promise<Product[]> {
  const normalized = normalizeProducts(products);
  if (hasKvConfig()) {
    await kv.set(KV_KEY, normalized);
    return normalized;
  }
  global.__metalStyleProducts__ = normalized;
  return normalized;
}
