'use client';

import { useState } from 'react';

export default function Admin() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Металева лавка",
      description: "Зручна металева лавка для парків та садів, виготовлена з високоякісного металу.",
      price: 2500,
      image: "/images/metal-bench.svg",
      keywords: "металева лавка, ковані стільці"
    },
    {
      id: 2,
      name: "Дашок над входом",
      description: "Декоративний дашок над входом, захищає від дощу та сонця.",
      price: 1800,
      image: "/images/entrance-canopy.svg",
      keywords: "дашок над входом, екстер'єрні конструкції"
    },
    {
      id: 3,
      name: "Поручні для перил",
      description: "Надійні поручні для перил сходів та балконів.",
      price: 1200,
      image: "/images/railing-handrails.svg",
      keywords: "поручні для перил, балконні огорожі"
    },
    {
      id: 4,
      name: "Декоративна решітка",
      description: "Красива декоративна решітка для вікон та дверей.",
      price: 900,
      image: "/images/decorative-grille.svg",
      keywords: "декоративна решітка, художня ковка"
    },
    {
      id: 5,
      name: "Металеві ворота",
      description: "Надійні металеві ворота для будинку або гаража.",
      price: 15000,
      image: "/images/metal-gates.svg",
      keywords: "металеві ворота, ковані двері"
    },
    {
      id: 6,
      name: "Ковані двері",
      description: "Елегантні ковані двері з унікальним дизайном.",
      price: 8000,
      image: "/images/wrought-iron-doors.svg",
      keywords: "ковані двері, інтер'єрні конструкції"
    },
    {
      id: 7,
      name: "Балконні огорожі",
      description: "Безпечні балконні огорожі з металу.",
      price: 3000,
      image: "/images/balcony-railings.svg",
      keywords: "балконні огорожі, поручні для перил"
    },
    {
      id: 8,
      name: "Металеві сходи",
      description: "Функціональні металеві сходи для будинку.",
      price: 20000,
      image: "/images/metal-stairs.svg",
      keywords: "металеві сходи, екстер'єрні конструкції"
    },
    {
      id: 9,
      name: "Ковані світильники",
      description: "Стильні ковані світильники для інтер'єру.",
      price: 1500,
      image: "/images/wrought-iron-lights.svg",
      keywords: "ковані світильники, декоративні елементи з металу"
    },
    {
      id: 10,
      name: "Мангал з металу",
      description: "Надійний мангал з металу для пікніків.",
      price: 3500,
      image: "/images/metal-grill.svg",
      keywords: "мангал з металу, металеві столи"
    }
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-zinc-100">Адмін-панель</h1>
      <div className="bg-zinc-800 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-zinc-100">Редагування товарів</h2>
        <div className="space-y-4">
          {products.map(product => (
            <div key={product.id} className="border border-zinc-600 p-4 rounded">
              <input
                type="text"
                value={product.name}
                onChange={(e) => {
                  const newProducts = products.map(p =>
                    p.id === product.id ? { ...p, name: e.target.value } : p
                  );
                  setProducts(newProducts);
                }}
                className="w-full p-2 bg-zinc-700 text-zinc-100 rounded mb-2"
              />
              <textarea
                value={product.description}
                onChange={(e) => {
                  const newProducts = products.map(p =>
                    p.id === product.id ? { ...p, description: e.target.value } : p
                  );
                  setProducts(newProducts);
                }}
                className="w-full p-2 bg-zinc-700 text-zinc-100 rounded mb-2"
                rows={3}
              />
              <input
                type="number"
                value={product.price}
                onChange={(e) => {
                  const newProducts = products.map(p =>
                    p.id === product.id ? { ...p, price: Number(e.target.value) } : p
                  );
                  setProducts(newProducts);
                }}
                className="w-full p-2 bg-zinc-700 text-zinc-100 rounded"
              />
            </div>
          ))}
        </div>
        <button className="bg-zinc-700 hover:bg-zinc-600 text-zinc-100 px-4 py-2 rounded mt-4">
          Зберегти зміни
        </button>
      </div>
    </div>
  );
}