/**
 * Spur Afrika catalogue.
 * Prices supplied by the client (KES). USD shown is a rough conversion at
 * ~130 KES/USD — adjust when the client confirms USD pricing.
 */

export type Category = "apparel" | "drinkware" | "accessories";

export interface ProductVariant {
  id: string;
  label: string;
  stock: number;
}

export interface Product {
  slug: string;
  name: string;
  category: Category;
  shortDescription: string;
  description: string;
  priceKES: number;
  priceUSD: number;
  variantLabel?: string;
  variants?: ProductVariant[];
  accent: "brand" | "brand-dark" | "brand-light" | "spruce" | "muted-green";
  badge?: string;
}

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: "apparel", label: "Apparel" },
  { id: "drinkware", label: "Drinkware" },
  { id: "accessories", label: "Accessories" },
  { id: "bundles", label: "Bundles & Gifts" },
];

const sizeVariants = (stock = 8): ProductVariant[] => [
  { id: "s", label: "S", stock },
  { id: "m", label: "M", stock: stock + 4 },
  { id: "l", label: "L", stock: stock + 2 },
  { id: "xl", label: "XL", stock },
];

export const PRODUCTS: Product[] = [
  {
    slug: "spur-hoodie",
    name: "Spur Hoodie",
    category: "apparel",
    shortDescription: "Stay warm, stylish, and purposeful.",
    description:
      "A premium heavyweight hoodie with the Spur Afrika mark. Cozy, durable, and made to be worn often — your purchase fuels our programs across Kenya.",
    priceKES: 5000,
    priceUSD: 38,
    variantLabel: "Size",
    variants: sizeVariants(6),
    accent: "spruce",
    badge: "Best seller",
  },
  {
    slug: "heavy-polyester-tee",
    name: "Heavy Polyester Tee",
    category: "apparel",
    shortDescription: "A durable, breathable heavy polyester t-shirt.",
    description:
      "A durable, breathable heavy-polyester tee built for everyday wear. Subtle Spur·Hive branding; comfortable, fast-drying fabric.",
    priceKES: 2200,
    priceUSD: 17,
    variantLabel: "Size",
    variants: sizeVariants(),
    accent: "muted-green",
  },
  {
    slug: "baseball-cap",
    name: "Baseball Cap",
    category: "apparel",
    shortDescription: "Classic, adjustable baseball cap.",
    description:
      "A classic adjustable baseball cap featuring embroidered Spur·Hive branding. Available in cream, navy and burgundy.",
    priceKES: 1500,
    priceUSD: 12,
    variantLabel: "Colour",
    variants: [
      { id: "cream", label: "Cream", stock: 10 },
      { id: "navy", label: "Navy", stock: 8 },
      { id: "burgundy", label: "Burgundy", stock: 6 },
    ],
    accent: "brand-dark",
  },
  {
    slug: "bamboo-flask",
    name: "The Bamboo Flask",
    category: "drinkware",
    shortDescription: "Sip sustainably with our premium bamboo flask.",
    description:
      "A sustainably designed insulated flask with a natural bamboo body. Keeps drinks hot or cold for hours — and looks beautiful doing it.",
    priceKES: 2200,
    priceUSD: 17,
    accent: "brand",
  },
  {
    slug: "premium-hex-flask",
    name: "Premium Hex Flask",
    category: "drinkware",
    shortDescription: "A modern, stylish hex-shaped flask.",
    description:
      "A modern hex-shaped stainless-steel flask with a leather carry loop and Spur·Hive branding. Double-walled vacuum insulation.",
    priceKES: 2500,
    priceUSD: 19,
    accent: "brand-light",
  },
  {
    slug: "reusable-water-bottle",
    name: "Reusable Water Bottle",
    category: "drinkware",
    shortDescription: "Stay hydrated while supporting the mission.",
    description:
      "A reusable insulated water bottle with a leak-proof flip lid and the Spur·Hive wordmark. Holds 750ml.",
    priceKES: 2000,
    priceUSD: 15,
    accent: "spruce",
  },
  {
    slug: "two-tone-mug",
    name: "Two Tone Mug",
    category: "drinkware",
    shortDescription: "Start your day with gratitude.",
    description:
      "A two-tone ceramic mug featuring the Spur Afrika thank-you motif. Holds 350ml, dishwasher safe.",
    priceKES: 1500,
    priceUSD: 12,
    accent: "muted-green",
  },
  {
    slug: "charging-kit",
    name: "Charging Kit",
    category: "accessories",
    shortDescription: "Stay powered throughout the day.",
    description:
      "A compact wooden-cased charging kit with multi-tip USB cables, branded with the Spur·Hive mark. Travel-ready.",
    priceKES: 1500,
    priceUSD: 12,
    accent: "brand-dark",
  },
  {
    slug: "hive-dynamic-duo",
    name: "The Hive Dynamic Duo",
    category: "bundles",
    shortDescription: "Two iconic Spur·Hive flasks, one bundle.",
    description:
      "The Dynamic Duo brings together two of our most-loved Spur·Hive flasks at a bundle price. A perfect gift for two.",
    priceKES: 4300,
    priceUSD: 33,
    accent: "brand",
    badge: "Bundle",
  },
  {
    slug: "christmas-bucket-gift",
    name: "Christmas Bucket Gift",
    category: "bundles",
    shortDescription: "Share the joy of giving this festive season.",
    description:
      "Sponsor a Christmas Bucket — a curated food bundle delivered to a family through our partner communities in Kibera and Dandora. A meaningful way to give back this festive season.",
    priceKES: 4500,
    priceUSD: 35,
    accent: "brand-dark",
    badge: "Give back",
  },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function relatedProducts(slug: string, limit = 4) {
  const me = getProduct(slug);
  if (!me) return [];
  return PRODUCTS.filter((p) => p.slug !== slug && p.category === me.category).slice(0, limit);
}

export const ACCENT_BG: Record<Product["accent"], string> = {
  brand: "bg-brand",
  "brand-dark": "bg-brand-dark",
  "brand-light": "bg-brand-light",
  spruce: "bg-spruce",
  "muted-green": "bg-muted-green",
};
