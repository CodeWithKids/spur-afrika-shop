import type { Currency } from "./currency";
import spurHoodieSandFront from "@/assets/spur-hoodie-front.jpg";
import spurHoodieSandHood from "@/assets/spur-hoodie-hood.jpg";
import spurHoodieMustardBack from "@/assets/spur-hoodie-mustard-back.jpg";
import spurHoodieMustardFront from "@/assets/spur-hoodie-mustard-front.jpg";
import spurHoodieMustardDetail from "@/assets/spur-hoodie-mustard-detail.jpg";
import jacketWhiteFront1 from "@/assets/jackets/white-front-1.jpg";
import jacketWhiteFront2 from "@/assets/jackets/white-front-2.jpg";
import jacketWhiteFront3 from "@/assets/jackets/white-front-3.jpg";
import jacketWhiteBack1 from "@/assets/jackets/white-back-1.jpg";
import jacketWhiteBack2 from "@/assets/jackets/white-back-2.jpg";
import jacketWhiteBack3 from "@/assets/jackets/white-back-3.jpg";
import jacketBlackCoupleLifestyle from "@/assets/jackets/black-couple-lifestyle.jpg";
import jacketBlackManFront from "@/assets/jackets/black-man-front.jpg";
import jacketBlackCoupleBack from "@/assets/jackets/black-couple-back.jpg";
import jacketOrangeFront1 from "@/assets/jackets/orange-front-1.jpg";
import jacketOrangeFront2 from "@/assets/jackets/orange-front-2.jpg";
import jacketRedFront from "@/assets/jackets/red-front.jpg";
import teeFrontBack from "@/assets/products/tee-front-back.jpg";
import hoodieCharcoal from "@/assets/products/hoodie-charcoal.jpg";
import capsTrio1 from "@/assets/products/caps-trio-1.jpg";
import capsTrio2 from "@/assets/products/caps-trio-2.jpg";
import bambooFlaskBranded from "@/assets/products/bamboo-flask-branded.jpg";
import bambooFlaskPersonalized from "@/assets/products/bamboo-flask-personalized.jpg";
import bambooFlaskNames from "@/assets/products/bamboo-flask-names.jpg";
import hexFlaskWhite from "@/assets/products/hex-flask-white.jpg";
import hexFlaskJoin from "@/assets/products/hex-flask-join.jpg";
import waterBottleBlack from "@/assets/products/water-bottle-black.jpg";
import waterBottleBlackAlt from "@/assets/products/water-bottle-black-alt.jpg";
import waterBottleFrosted from "@/assets/products/water-bottle-frosted.jpg";
import waterBottleDuo from "@/assets/products/water-bottle-duo.jpg";
import mugThankYou from "@/assets/products/mug-thank-you.jpg";
import mugSpurAfrika from "@/assets/products/mug-spur-afrika.jpg";
import mugHivePattern from "@/assets/products/mug-hive-pattern.jpg";
import mugHiveLifestyle from "@/assets/products/mug-hive-lifestyle.jpg";
import chargingKitOpen from "@/assets/products/charging-kit-open.jpg";
import dynamicDuoSet from "@/assets/products/dynamic-duo-set.jpg";
import christmasBucketCampaign from "@/assets/products/christmas-bucket-campaign.jpg";
import christmasBucketFlyer from "@/assets/products/christmas-bucket-flyer.jpg";

/**
 * Spur Afrika catalogue.
 * Prices supplied by the client (KES). USD and AUD are rough conversions
 * (~130 KES/USD, ~1.55 USD/AUD) — adjust when the client confirms pricing.
 */

export type Category = "apparel" | "jackets" | "drinkware" | "accessories" | "gifts";

export interface ProductVariant {
  id: string;
  label: string;
  stock: number;
}

export interface ProductColor {
  id: string;
  label: string;
  swatch: string;
  images: string[];
}

export interface Product {
  slug: string;
  name: string;
  category: Category;
  shortDescription: string;
  description: string;
  priceKES: number;
  priceUSD: number;
  priceAUD: number;
  colorLabel?: string;
  colors?: ProductColor[];
  variantLabel?: string;
  variants?: ProductVariant[];
  accent: "brand" | "brand-dark" | "brand-light" | "spruce" | "muted-green";
  badge?: string;
  images?: string[];
}

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: "apparel", label: "Apparel" },
  { id: "jackets", label: "Jackets" },
  { id: "drinkware", label: "Drinkware" },
  { id: "accessories", label: "Accessories" },
  { id: "gifts", label: "Gifts" },
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
      "A premium heavyweight hoodie with the Spur Afrika mark. Available in Sand, Mustard, and Charcoal. Cozy, durable, and made to be worn often — your purchase fuels our programs across Kenya.",
    priceKES: 5000,
    priceUSD: 38,
    priceAUD: 59,
    colorLabel: "Colour",
    colors: [
      {
        id: "sand",
        label: "Sand",
        swatch: "#C8B89A",
        images: [spurHoodieSandFront, spurHoodieSandHood],
      },
      {
        id: "mustard",
        label: "Mustard",
        swatch: "#D4A82A",
        images: [spurHoodieMustardFront, spurHoodieMustardBack, spurHoodieMustardDetail],
      },
      {
        id: "charcoal",
        label: "Charcoal",
        swatch: "#4A4A4A",
        images: [hoodieCharcoal],
      },
    ],
    variantLabel: "Size",
    variants: sizeVariants(6),
    accent: "spruce",
    badge: "Best seller",
  },
  {
    slug: "spur-jacket",
    name: "Spur Jacket",
    category: "jackets",
    shortDescription: "Lightweight hooded jacket for every season.",
    description:
      "A versatile zip-up windbreaker with the Spur Afrika mark. Available in White, Black, Orange and Red. Water-resistant, packable, and built for everyday wear — your purchase fuels our programs across Kenya.",
    priceKES: 4500,
    priceUSD: 35,
    priceAUD: 54,
    colorLabel: "Colour",
    colors: [
      {
        id: "white",
        label: "White",
        swatch: "#F4F4F0",
        images: [
          jacketWhiteFront1,
          jacketWhiteFront2,
          jacketWhiteFront3,
          jacketWhiteBack1,
          jacketWhiteBack2,
          jacketWhiteBack3,
        ],
      },
      {
        id: "black",
        label: "Black",
        swatch: "#1C1C1C",
        images: [jacketBlackManFront, jacketBlackCoupleLifestyle, jacketBlackCoupleBack],
      },
      {
        id: "orange",
        label: "Orange",
        swatch: "#E85D04",
        images: [jacketOrangeFront1, jacketOrangeFront2],
      },
      {
        id: "red",
        label: "Red",
        swatch: "#C41E3A",
        images: [jacketRedFront],
      },
    ],
    variantLabel: "Size",
    variants: sizeVariants(8),
    accent: "brand-dark",
  },
  {
    slug: "heavy-polyester-tee",
    name: "Heavy Polyester Tee",
    category: "apparel",
    shortDescription: "A durable, breathable heavy polyester t-shirt.",
    description:
      "A durable, breathable heavy polyester T-shirt designed for everyday comfort. Made with premium stitching and a soft feel, it is ideal for events, casual wear, or volunteer days. Branded with our signature Spur Hive identity so you can represent the cause with pride. Every T-shirt purchased contributes to school supplies and school fees for the learners in our programs.",
    priceKES: 2200,
    priceUSD: 17,
    priceAUD: 26,
    variantLabel: "Size",
    variants: sizeVariants(),
    accent: "muted-green",
    images: [teeFrontBack],
  },
  {
    slug: "baseball-cap",
    name: "Baseball Cap",
    category: "apparel",
    shortDescription: "Classic, adjustable baseball cap.",
    description:
      "A classic, adjustable baseball cap with a comfortable fit and breathable fabric. Perfect for sunny days, active wear, or pairing with your casual outfits. Proceeds from cap sales help sustain community outreach and children wellness initiatives.",
    priceKES: 1500,
    priceUSD: 12,
    priceAUD: 19,
    colorLabel: "Colour",
    colors: [
      {
        id: "white",
        label: "White",
        swatch: "#F4F4F0",
        images: [capsTrio1, capsTrio2],
      },
      {
        id: "navy",
        label: "Navy",
        swatch: "#1B2A4A",
        images: [capsTrio1, capsTrio2],
      },
      {
        id: "burgundy",
        label: "Burgundy",
        swatch: "#6B1E2F",
        images: [capsTrio1, capsTrio2],
      },
    ],
    accent: "brand-dark",
  },
  {
    slug: "bamboo-flask",
    name: "The Bamboo Flask",
    category: "drinkware",
    shortDescription: "Sip sustainably with our premium bamboo flask.",
    description:
      "Sip sustainably with our premium Spur Afrika bamboo flask. Designed with a sleek matte finish and a natural bamboo base, this tumbler brings together style, durability, and eco-friendly living. Perfect for your morning coffee, afternoon tea, or hydrating on the go. Personalisable with your name for that extra touch of class.",
    priceKES: 2200,
    priceUSD: 17,
    priceAUD: 26,
    accent: "brand",
    images: [bambooFlaskBranded, bambooFlaskPersonalized, bambooFlaskNames],
  },
  {
    slug: "premium-hex-flask",
    name: "Premium Hex Flask",
    category: "drinkware",
    shortDescription: "A modern, stylish hex-shaped flask.",
    description:
      "A modern, stylish hex-shaped stainless-steel flask with a braided carry loop and Spur Hive branding. Double-walled vacuum insulation keeps drinks hot or cold for hours.",
    priceKES: 2500,
    priceUSD: 19,
    priceAUD: 29,
    accent: "brand-light",
    images: [hexFlaskWhite, hexFlaskJoin],
  },
  {
    slug: "reusable-water-bottle",
    name: "Reusable Water Bottle",
    category: "drinkware",
    shortDescription: "Stay hydrated while supporting the mission.",
    description:
      "Stay hydrated while supporting education. This lightweight, durable water bottle is designed for on-the-go use and helps reduce plastic waste. Perfect for school, office, gym, or travel.",
    priceKES: 2000,
    priceUSD: 15,
    priceAUD: 23,
    accent: "spruce",
    images: [waterBottleBlack, waterBottleBlackAlt, waterBottleFrosted, waterBottleDuo],
  },
  {
    slug: "two-tone-mug",
    name: "Two Tone Mug",
    category: "drinkware",
    shortDescription: "Start your day with gratitude.",
    description:
      "Start your day with gratitude and purpose. Our Spur Afrika two-tone mug features a clean white finish and a variety of colours. Perfect for coffee, tea, or gifting, this mug is designed to bring joy to your desk and warmth to your moments. Personalise it with a name to make it uniquely yours. Every mug purchased helps us continue empowering children and youth through education, mentorship, and holistic support.",
    priceKES: 1500,
    priceUSD: 12,
    priceAUD: 19,
    accent: "muted-green",
    images: [mugThankYou, mugSpurAfrika, mugHivePattern, mugHiveLifestyle],
  },
  {
    slug: "charging-kit",
    name: "Charging Kit",
    category: "accessories",
    shortDescription: "Stay powered throughout the day.",
    description:
      "Stay powered throughout the day with our compact, reliable charging kit. Designed for convenience, it includes essential cables perfect for work, travel, or school. Every charging kit purchased helps provide digital learning resources and support for students in our programs.",
    priceKES: 1500,
    priceUSD: 12,
    priceAUD: 19,
    accent: "brand-dark",
    images: [chargingKitOpen],
  },
  {
    slug: "hive-dynamic-duo",
    name: "The Hive Dynamic Duo",
    category: "drinkware",
    shortDescription: "Reusable bottle and insulated hex flask bundle.",
    description:
      "The Dynamic Duo brings together two essentials: a reusable water bottle and an insulated hex flask. Practical, durable, and purposeful — each bundle supports learners on their journey to quality education.",
    priceKES: 4300,
    priceUSD: 33,
    priceAUD: 51,
    accent: "brand",
    badge: "Bundle",
    images: [dynamicDuoSet],
  },
  {
    slug: "christmas-bucket-gift",
    name: "Christmas Bucket Gift",
    category: "gifts",
    shortDescription: "Bless a family with a Christmas food pack.",
    description:
      "Share the joy of giving this festive season with our Christmas Bucket campaign. This gift represents a contribution toward a 4,500/- food bag for a Spur Afrika family — a meaningful way to spread hope, warmth, and practical love at Christmas. Each gift directly supports a family in need, helping us reach our goal of blessing families with a Christmas food pack and a touch of chapati love.",
    priceKES: 4500,
    priceUSD: 35,
    priceAUD: 54,
    accent: "brand-light",
    badge: "Seasonal",
    images: [christmasBucketCampaign, christmasBucketFlyer],
  },
];

export function categoryLabel(id: Category): string {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function productImages(product: Product, colorId?: string): string[] | undefined {
  if (colorId && product.colors?.length) {
    return product.colors.find((c) => c.id === colorId)?.images ?? product.colors[0]?.images;
  }
  if (product.colors?.length) return product.colors[0].images;
  return product.images;
}

export function productPrice(product: Product, currency: Currency): number {
  if (currency === "KES") return product.priceKES;
  if (currency === "AUD") return product.priceAUD;
  return product.priceUSD;
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
