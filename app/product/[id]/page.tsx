import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORY_LABEL, defaultProducts } from "../../data/products";

type PageProps = {
  params: Promise<{ id: string }>;
};

function getProductById(id: number) {
  return defaultProducts.find((product) => product.id === id);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(Number(id));

  if (!product) {
    return {
      title: "Товар не знайдено - Metal Style",
      description: "Сторінку товару не знайдено.",
    };
  }

  const title = product.seoTitle || `${product.name} - Metal Style`;
  const description = product.seoDescription || product.description;
  const ogImage = product.images?.[0] || product.image || "/logo.svg";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://metal-style.vercel.app/product/${product.id}`,
      images: [{ url: ogImage, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = getProductById(Number(id));

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-cyan-100">Товар не знайдено</h1>
        <p className="mt-3 text-cyan-200/80">Можливо, товар був видалений або посилання некоректне.</p>
        <Link href="/catalog" className="mt-6 inline-block text-cyan-300 underline">
          Повернутися в каталог
        </Link>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <div className="container mx-auto px-4 py-10">
      <article className="rounded-[2rem] border border-cyan-500/20 bg-slate-950/70 p-6">
        <h1 className="text-4xl font-bold text-cyan-100">{product.name}</h1>
        <p className="mt-3 text-cyan-200/80">{product.description}</p>
        <p className="mt-3 text-cyan-300">Категорія: {CATEGORY_LABEL[product.category]}</p>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {images.map((image, index) => (
            <img
              key={`${product.id}-${index}`}
              src={image}
              alt={`${product.name} ${index + 1}`}
              className="h-56 w-full rounded-2xl border border-cyan-500/20 bg-slate-950/80 object-contain p-3"
            />
          ))}
        </div>
        <p className="mt-6 text-2xl font-semibold text-cyan-100">{product.price} грн</p>
      </article>
    </div>
  );
}
