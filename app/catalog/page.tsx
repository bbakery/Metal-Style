export default function Catalog() {
  const products = [
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
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-zinc-100">Каталог товарів</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <article key={product.id} className="bg-zinc-800 p-6 rounded-lg">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
            <h2 className="text-xl font-semibold mb-2 text-zinc-100">{product.name}</h2>
            <p className="text-zinc-300 mb-4">{product.description}</p>
            <p className="text-zinc-400 mb-2">Ключові слова: {product.keywords}</p>
            <p className="text-2xl font-bold text-zinc-100 mb-4">{product.price} грн</p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <a
                href={`https://wa.me/380508829303?text=Я%20хочу%20замовити%20${encodeURIComponent(product.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded"
              >
                WhatsApp
              </a>
              <a
                href={`viber://chat?number=%2B380508829303`}
                className="flex-1 text-center bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded"
              >
                Viber
              </a>
            </div>
          </article>
        ))}
      </div>
      <section className="mt-12 bg-zinc-800 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-zinc-100">Оплата та доставка</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-zinc-100">Оплата</h3>
            <p className="text-zinc-300">Оплата здійснюється через USDT (Tether) або банківський переказ.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-zinc-100">Доставка</h3>
            <p className="text-zinc-300">Доставка по Україні через:</p>
            <ul className="text-zinc-300 list-disc list-inside">
              <li>Укрпошта</li>
              <li>Нова Пошта</li>
              <li>Delivery</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}