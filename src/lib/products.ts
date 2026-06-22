/**
 * Seed catalogue for the Spur Afrika merch shop.
 * Replace prices, copy, and imagery with client-supplied content before launch.
 */

export type Category = "apparel" | "accessories" | "stationery" | "bundles";

export interface ProductVariant {
  id: string;
  label: string; // e.g. "M", "L", "Forest"
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
  variantLabel?: string; // e.g. "Size", "Colour"
  variants?: ProductVariant[];
  /** Solid-fill placeholder so the logo/UI never overlays on photos with insufficient contrast. */
  accent: "brand" | "brand-dark" | "brand-light" | "spruce" | "muted-green";
  badge?: string;
}

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: "apparel", label: "Apparel" },
  { id: "accessories", label: "Accessories" },
  { id: "stationery", label: "Stationery" },
  { id: "bundles", label: "Bundles" },
];

export const PRODUCTS: Product[] = [
  {
    slug: "spur-classic-tee",
    name: "Spur Classic T-Shirt",
    category: "apparel",
    shortDescription: "Soft cotton tee in brand green.",
    description:
      "Our everyday tee in 100% combed cotton, printed in Nairobi. Every purchase helps fund Spur Afrika programs for children and families in Kibera and Dandora.",
    priceKES: 1800,
    priceUSD: 18,
    variantLabel: "Size",
    variants: [
      { id: "s", label: "S", stock: 12 },
      { id: "m", label: "M", stock: 20 },
      { id: "l", label: "L", stock: 18 },
      { id: "xl", label: "XL", stock: 10 },
    ],
    accent: "brand",
    badge: "Best seller",
  },
  {
    slug: "hope-hoodie",
    name: "Hope Hoodie",
    category: "apparel",
    shortDescription: "Heavyweight hoodie embroidered with the Spur mark.",
    description:
      "A heavyweight 400gsm hoodie with embroidered Spur Afrika wordmark on the chest. Lined hood, kangaroo pocket, ribbed cuffs.",
    priceKES: 4500,
    priceUSD: 42,
    variantLabel: "Size",
    variants: [
      { id: "s", label: "S", stock: 6 },
      { id: "m", label: "M", stock: 9 },
      { id: "l", label: "L", stock: 7 },
      { id: "xl", label: "XL", stock: 4 },
    ],
    accent: "brand-dark",
  },
  {
    slug: "supporter-wristband",
    name: "Supporter Wristband",
    category: "accessories",
    shortDescription: "Silicone wristband, light green.",
    description: "Show your support with a Spur Afrika silicone wristband. Sold in singles.",
    priceKES: 250,
    priceUSD: 3,
    accent: "brand-light",
    badge: "Under KES 500",
  },
  {
    slug: "brand-keychain",
    name: "Brand Keychain",
    category: "accessories",
    shortDescription: "Metal keychain with enamel inlay.",
    description: "A weighty metal keychain finished with enamel inlay in Spur green.",
    priceKES: 600,
    priceUSD: 6,
    accent: "muted-green",
  },
  {
    slug: "morning-mug",
    name: "Morning Mug",
    category: "accessories",
    shortDescription: "Ceramic mug, 350ml.",
    description:
      "A 350ml ceramic mug glazed in matte off-white with the Spur mark in Dark Green.",
    priceKES: 950,
    priceUSD: 10,
    accent: "spruce",
  },
  {
    slug: "field-notebook",
    name: "Field Notebook",
    category: "stationery",
    shortDescription: "A5 dotted notebook, 120 pages.",
    description:
      "An A5 dotted notebook, perfect for journaling or note-taking. Soft-touch cover with the Spur wordmark debossed.",
    priceKES: 1200,
    priceUSD: 12,
    accent: "brand-dark",
  },
  {
    slug: "sticker-pack",
    name: "Sticker Pack",
    category: "stationery",
    shortDescription: "Set of 6 vinyl stickers.",
    description: "Six vinyl stickers in assorted Spur Afrika brand designs.",
    priceKES: 400,
    priceUSD: 4,
    accent: "brand-light",
  },
  {
    slug: "supporter-bundle",
    name: "Supporter Bundle",
    category: "bundles",
    shortDescription: "Tee + mug + sticker pack.",
    description:
      "Our most-loved gear in one go: Classic Tee, Morning Mug, and Sticker Pack. Save 10%.",
    priceKES: 2800,
    priceUSD: 28,
    variantLabel: "Tee size",
    variants: [
      { id: "s", label: "S", stock: 5 },
      { id: "m", label: "M", stock: 8 },
      { id: "l", label: "L", stock: 6 },
      { id: "xl", label: "XL", stock: 3 },
    ],
    accent: "brand",
    badge: "Save 10%",
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
