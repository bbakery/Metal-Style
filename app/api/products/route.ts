import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Product } from "@/app/data/products";
import { getStoredProducts, saveStoredProducts } from "@/lib/products-store";

const ADMIN_COOKIE = "admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const products = await getStoredProducts();
  return NextResponse.json({ success: true, products });
}

export async function PUT(request: Request) {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get(ADMIN_COOKIE)?.value === "true";
  if (!isAdmin) {
    return NextResponse.json({ success: false, message: "Потрібна авторизація адміністратора" }, { status: 401 });
  }

  const body = (await request.json()) as { products?: Product[] };
  if (!Array.isArray(body?.products)) {
    return NextResponse.json({ success: false, message: "Некоректні дані товарів" }, { status: 400 });
  }

  const saved = await saveStoredProducts(body.products);
  return NextResponse.json({ success: true, products: saved });
}
