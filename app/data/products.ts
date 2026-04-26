export type ProductStatus = "inStock" | "madeToOrder";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  keywords: string;
  status: ProductStatus;
}

export const defaultProducts: Product[] = [
  {
    id: 1,
    name: "Металева лавка",
    description: "Зручна металева лавка для парків та садів, виготовлена з високоякісного металу.",
    price: 2500,
    image: "/images/metal-bench.svg",
    keywords: "металева лавка, ковані стільці",
    status: "inStock",
  },
  {
    id: 2,
    name: "Дашок над входом",
    description: "Декоративний дашок над входом, захищає від дощу та сонця.",
    price: 1800,
    image: "/images/entrance-canopy.svg",
    keywords: "дашок над входом, екстер'єрні конструкції",
    status: "inStock",
  },
  {
    id: 3,
    name: "Поручні для перил",
    description: "Надійні поручні для перил сходів та балконів.",
    price: 1200,
    image: "/images/railing-handrails.svg",
    keywords: "поручні для перил, балконні огорожі",
    status: "inStock",
  },
  {
    id: 4,
    name: "Декоративна решітка",
    description: "Красива декоративна решітка для вікон та дверей.",
    price: 900,
    image: "/images/decorative-grille.svg",
    keywords: "декоративна решітка, художня ковка",
    status: "inStock",
  },
  {
    id: 5,
    name: "Металеві ворота",
    description: "Надійні металеві ворота для будинку або гаража.",
    price: 15000,
    image: "/images/metal-gates.svg",
    keywords: "металеві ворота, ковані двері",
    status: "madeToOrder",
  },
  {
    id: 6,
    name: "Ковані двері",
    description: "Елегантні ковані двері з унікальним дизайном.",
    price: 8000,
    image: "/images/wrought-iron-doors.svg",
    keywords: "ковані двері, інтер'єрні конструкції",
    status: "madeToOrder",
  },
  {
    id: 7,
    name: "Балконні огорожі",
    description: "Безпечні балконні огорожі з металу.",
    price: 3000,
    image: "/images/balcony-railings.svg",
    keywords: "балконні огорожі, поручні для перил",
    status: "madeToOrder",
  },
  {
    id: 8,
    name: "Металеві сходи",
    description: "Функціональні металеві сходи для будинку.",
    price: 20000,
    image: "/images/metal-stairs.svg",
    keywords: "металеві сходи, екстер'єрні конструкції",
    status: "madeToOrder",
  },
  {
    id: 9,
    name: "Ковані світильники",
    description: "Стильні ковані світильники для інтер'єру.",
    price: 1500,
    image: "/images/wrought-iron-lights.svg",
    keywords: "ковані світильники, декоративні елементи з металу",
    status: "inStock",
  },
  {
    id: 10,
    name: "Мангал з металу",
    description: "Надійний мангал з металу для пікніків.",
    price: 3500,
    image: "/images/metal-grill.svg",
    keywords: "мангал з металу, металеві столи",
    status: "inStock",
  },
];
