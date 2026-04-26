"use client";

import { FormEvent, useState } from "react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (response.ok) {
      window.location.reload();
      return;
    }

    const result = await response.json();
    setError(result.message || "Невірний пароль");
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-xl mx-auto glass-panel p-10 rounded-[2rem] border border-cyan-500/20 shadow-[0_0_40px_rgba(0,255,255,0.08)]">
        <h1 className="text-4xl font-bold mb-6 text-cyan-100 text-center neon-glow">Адмін-панель</h1>
        <p className="text-cyan-200/80 mb-8 text-center">
          Введіть пароль, щоб редагувати каталог. Це додатковий захист для адміністратора.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-cyan-200">
            Пароль
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-cyan-500/20 bg-slate-950/80 px-4 py-3 text-cyan-100 outline-none focus:border-cyan-400"
              placeholder="Ваш секретний пароль"
            />
          </label>
          {error && <p className="text-red-400">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 px-6 py-3 text-black font-semibold shadow-lg shadow-cyan-500/20 hover:brightness-110 transition"
            disabled={loading}
          >
            {loading ? "Перевірка..." : "Увійти"}
          </button>
        </form>
      </div>
    </div>
  );
}
