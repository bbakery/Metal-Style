import { NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.json();
  const password = body?.password;
  const adminPassword = process.env.ADMIN_PASSWORD?.trim() || process.env.ADMIN_PASS?.trim();

  if (!adminPassword) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Сервер не налаштовано для захищеного входу. Додайте ADMIN_PASSWORD (або ADMIN_PASS) у Vercel Environment Variables і зробіть Redeploy.",
      },
      { status: 500 }
    );
  }

  if (!password) {
    return NextResponse.json({ success: false, message: "Пароль не вказано" }, { status: 400 });
  }

  const passwordBuffer = Buffer.from(password);
  const secretBuffer = Buffer.from(adminPassword);
  const isValid =
    passwordBuffer.length === secretBuffer.length &&
    crypto.timingSafeEqual(passwordBuffer, secretBuffer);

  if (!isValid) {
    return NextResponse.json({ success: false, message: "Невірний пароль" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("admin-auth", "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
  return response;
}
