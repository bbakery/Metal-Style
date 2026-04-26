import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Metal Style - Каталог металоконструкцій",
  description: "Онлайн-каталог виробів з металу: металеві лавки, дашки над входом, поручні для перил, декоративні решітки, металеві ворота, ковані двері, балконні огорожі, металеві сходи, ковані світильники, мангали з металу, металеві столи, ковані стільці, декоративні елементи з металу, художня ковка, інтер'єрні та екстер'єрні конструкції.",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 text-cyan-300">
        <header className="relative bg-black/40 backdrop-blur-md border-b-2 border-cyan-500/30 p-4">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500" />
          <nav className="container mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold neon-glow">Metal Style</h1>
            <ul className="flex space-x-6">
              <li><a href="/" className="hover:text-pink-400 transition-colors duration-300">Головна</a></li>
              <li><a href="/catalog" className="hover:text-purple-400 transition-colors duration-300">Каталог</a></li>
              <li><a href="/about" className="hover:text-cyan-300 transition-colors duration-300">Про нас</a></li>
              <li><a href="/contacts" className="hover:text-lime-400 transition-colors duration-300">Контакти</a></li>
              <li><a href="/admin" className="hover:text-pink-400 transition-colors duration-300">Адмін</a></li>
            </ul>
          </nav>
        </header>
        <main className="flex-1 relative z-10">{children}</main>
        <footer className="relative bg-black/40 backdrop-blur-md border-t-2 border-cyan-500/30 p-6 text-center">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500" />
          <p className="mb-2 neon-glow text-sm">&copy; 2026 Metal Style. Всі права захищені.</p>
          <div className="flex flex-col md:flex-row justify-center gap-4 text-sm">
            <a href="https://www.instagram.com/metal_good_nice/" className="text-pink-400 hover:text-pink-300 hover:text-shadow transition-all">Instagram</a>
            <a href="https://www.facebook.com/GoodNiceCompany" className="text-cyan-400 hover:text-cyan-300 hover:text-shadow transition-all">Facebook</a>
            <a href="https://www.tiktok.com/@gordinzar" className="text-purple-400 hover:text-purple-300 hover:text-shadow transition-all">TikTok</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
