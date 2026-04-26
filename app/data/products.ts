export type ProductStatus = "inStock" | "madeToOrder";
export type ProductCategory =
  | "benches"
  | "canopies"
  | "railings"
  | "grilles"
  | "gates"
  | "doors"
  | "stairs"
  | "lights"
  | "grills"
  | "other";

export const CATEGORY_LABEL: Record<ProductCategory, string> = {
  benches: "Лавки",
  canopies: "Дашки",
  railings: "Поручні та огорожі",
  grilles: "Решітки",
  gates: "Ворота",
  doors: "Двері",
  stairs: "Сходи",
  lights: "Світильники",
  grills: "Мангали",
  other: "Інше",
};

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  images?: string[];
  keywords: string;
  status: ProductStatus;
  category: ProductCategory;
  isPopular?: boolean;
  isRecommended?: boolean;
  seoTitle?: string;
  seoDescription?: string;
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
    category: "benches",
    isPopular: true,
    seoTitle: "Металева лавка - Metal Style",
    seoDescription: "Металева лавка для саду та парку. Міцна конструкція, стильний дизайн, виготовлення під замовлення.",
  },
  {
    id: 2,
    name: "Дашок над входом",
    description: "Декоративний дашок над входом, захищає від дощу та сонця.",
    price: 1800,
    image: "/images/entrance-canopy.svg",
    keywords: "дашок над входом, екстер'єрні конструкції",
    status: "inStock",
    category: "canopies",
    isRecommended: true,
    seoTitle: "Дашок над входом - Metal Style",
    seoDescription: "Декоративний дашок над входом з металу. Захист від дощу та сонця, сучасний вигляд фасаду.",
  },
  {
    id: 3,
    name: "Поручні для перил",
    description: "Надійні поручні для перил сходів та балконів.",
    price: 1200,
    image: "/images/railing-handrails.svg",
    keywords: "поручні для перил, балконні огорожі",
    status: "inStock",
    category: "railings",
    seoTitle: "Поручні для перил - Metal Style",
    seoDescription: "Надійні поручні для перил сходів та балконів. Безпека, якісне зварювання та довговічність.",
  },
  {
    id: 4,
    name: "Декоративна решітка",
    description: "Красива декоративна решітка для вікон та дверей.",
    price: 900,
    image: "/images/decorative-grille.svg",
    keywords: "декоративна решітка, художня ковка",
    status: "inStock",
    category: "grilles",
    seoTitle: "Декоративна решітка - Metal Style",
    seoDescription: "Ковані декоративні решітки для вікон і дверей. Надійність та естетика в одному виробі.",
  },
  {
    id: 5,
    name: "Металеві ворота",
    description: "Надійні металеві ворота для будинку або гаража.",
    price: 15000,
    image: "/images/metal-gates.svg",
    keywords: "металеві ворота, ковані двері",
    status: "madeToOrder",
    category: "gates",
    isPopular: true,
    seoTitle: "Металеві ворота - Metal Style",
    seoDescription: "Металеві ворота для приватного будинку та гаража. Індивідуальний дизайн та професійний монтаж.",
  },
  {
    id: 6,
    name: "Ковані двері",
    description: "Елегантні ковані двері з унікальним дизайном.",
    price: 8000,
    image: "/images/wrought-iron-doors.svg",
    keywords: "ковані двері, інтер'єрні конструкції",
    status: "madeToOrder",
    category: "doors",
    isRecommended: true,
    seoTitle: "Ковані двері - Metal Style",
    seoDescription: "Ковані двері з унікальним дизайном. Надійність, безпека та стильний зовнішній вигляд.",
  },
  {
    id: 7,
    name: "Балконні огорожі",
    description: "Безпечні балконні огорожі з металу.",
    price: 3000,
    image: "/images/balcony-railings.svg",
    keywords: "балконні огорожі, поручні для перил",
    status: "madeToOrder",
    category: "railings",
    seoTitle: "Балконні огорожі - Metal Style",
    seoDescription: "Металеві балконні огорожі під замовлення. Безпечні рішення для дому та комерційних об'єктів.",
  },
  {
    id: 8,
    name: "Металеві сходи",
    description: "Функціональні металеві сходи для будинку.",
    price: 20000,
    image: "/images/metal-stairs.svg",
    keywords: "металеві сходи, екстер'єрні конструкції",
    status: "madeToOrder",
    category: "stairs",
    isPopular: true,
    seoTitle: "Металеві сходи - Metal Style",
    seoDescription: "Металеві сходи для будинку та бізнесу. Міцні матеріали, точний розрахунок і сучасний дизайн.",
  },
  {
    id: 9,
    name: "Ковані світильники",
    description: "Стильні ковані світильники для інтер'єру.",
    price: 1500,
    image: "/images/wrought-iron-lights.svg",
    keywords: "ковані світильники, декоративні елементи з металу",
    status: "inStock",
    category: "lights",
    seoTitle: "Ковані світильники - Metal Style",
    seoDescription: "Ковані світильники для інтер'єру та екстер'єру. Авторський стиль та якісна обробка металу.",
  },
  {
    id: 10,
    name: "Мангал з металу",
    description: "Надійний мангал з металу для пікніків.",
    price: 3500,
    image: "/images/metal-grill.svg",
    keywords: "мангал з металу, металеві столи",
    status: "inStock",
    category: "grills",
    isRecommended: true,
    seoTitle: "Мангал з металу - Metal Style",
    seoDescription: "Надійний металевий мангал для пікніків та відпочинку. Практичний і довговічний.",
  },
];
