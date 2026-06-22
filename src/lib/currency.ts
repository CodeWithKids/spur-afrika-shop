export type Currency = "KES" | "USD";

const formatters: Record<Currency, Intl.NumberFormat> = {
  KES: new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }),
  USD: new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }),
};

export function formatPrice(amount: number, currency: Currency): string {
  return formatters[currency].format(amount);
}

export const SHIPPING_FLAT: Record<Currency, { delivery: number; pickup: number }> = {
  KES: { delivery: 350, pickup: 0 },
  USD: { delivery: 25, pickup: 0 },
};
