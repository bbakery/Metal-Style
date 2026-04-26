import { NextResponse } from "next/server";
import crypto from "crypto";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function POST(request: Request) {
  const body = await request.json();
  const password = body?.password;

  console.log('ADMIN_PASSWORD from env:', process.env.ADMIN_PASSWORD);

  if (!ADMIN_PASSWORD) {
    return NextResponse.json(
      { success: false, message: "Сервер не налаштовано для захищеного входу" },
      { status: 500 }
    );
  }

  if (!password) {
    return NextResponse.json({ success: false, message: "Пароль не вказано" }, { status: 400 });
  }

  const passwordBuffer = Buffer.from(password);
  const secretBuffer = Buffer.from(ADMIN_PASSWORD);
  const isValid =
    passwordBuffer.length === secretBuffer.length &&
    crypto.timingSafeEqual(passwordBuffer, secretBuffer);

  console.log('Password lengths:', passwordBuffer.length, secretBuffer.length);
  console.log('Is valid:', isValid);

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
