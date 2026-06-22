import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Currency } from "./currency";
import { PRODUCTS, productPrice, type Product } from "./products";

export interface CartLine {
  productSlug: string;
  variantId?: string;
  variantLabel?: string;
  colorId?: string;
  colorLabel?: string;
  quantity: number;
}

interface CartState {
  lines: CartLine[];
  currency: Currency;
  setCurrency: (c: Currency) => void;
  addLine: (line: CartLine) => void;
  updateQuantity: (
    slug: string,
    variantId: string | undefined,
    colorId: string | undefined,
    qty: number,
  ) => void;
  removeLine: (slug: string, variantId: string | undefined, colorId: string | undefined) => void;
  clear: () => void;
}

const sameLine = (a: CartLine, slug: string, variantId?: string, colorId?: string) =>
  a.productSlug === slug &&
  (a.variantId ?? null) === (variantId ?? null) &&
  (a.colorId ?? null) === (colorId ?? null);

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      currency: "KES",
      setCurrency: (currency) => set({ currency }),
      addLine: (line) =>
        set((state) => {
          const existing = state.lines.find((l) =>
            sameLine(l, line.productSlug, line.variantId, line.colorId),
          );
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                sameLine(l, line.productSlug, line.variantId, line.colorId)
                  ? { ...l, quantity: l.quantity + line.quantity }
                  : l,
              ),
            };
          }
          return { lines: [...state.lines, line] };
        }),
      updateQuantity: (slug, variantId, colorId, qty) =>
        set((state) => ({
          lines: state.lines
            .map((l) => (sameLine(l, slug, variantId, colorId) ? { ...l, quantity: qty } : l))
            .filter((l) => l.quantity > 0),
        })),
      removeLine: (slug, variantId, colorId) =>
        set((state) => ({
          lines: state.lines.filter((l) => !sameLine(l, slug, variantId, colorId)),
        })),
      clear: () => set({ lines: [] }),
    }),
    { name: "spurafrika-cart-v1" },
  ),
);

export interface PricedLine {
  line: CartLine;
  product: Product;
  unitPrice: number;
  subtotal: number;
}

export function priceLines(lines: CartLine[], currency: Currency): PricedLine[] {
  return lines
    .map((line) => {
      const product = PRODUCTS.find((p) => p.slug === line.productSlug);
      if (!product) return null;
      const unitPrice = productPrice(product, currency);
      return {
        line,
        product,
        unitPrice,
        subtotal: unitPrice * line.quantity,
      };
    })
    .filter((x): x is PricedLine => x !== null);
}

export function cartCount(lines: CartLine[]): number {
  return lines.reduce((n, l) => n + l.quantity, 0);
}
