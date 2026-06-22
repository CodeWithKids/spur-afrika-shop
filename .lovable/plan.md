# Spur Afrika Merchandise Shop — Build Plan

A production-ready, on-brand e-commerce site for Spur Afrika with catalogue, cart, checkout, PayHero + Grassroots payments, and emailed receipts. No admin UI in v1 (products seeded via migration; orders viewable in Lovable Cloud).

## 1. Brand foundation (Brand Guide v1)

- **Typography:** load Outfit via `<link>` in `__root.tsx`; set `--font-sans: "Outfit"`. Weights 400/500/700/800. Apply the exact hierarchy (Display 48/52 ExtraBold, H-Large 32/36, H 24/28, H-Small 20/24, Body 16, Body Small 14).
- **Colour tokens in `src/styles.css`** (oklch equivalents of brand hexes):
  - Brand: `--brand-light-green #86C432`, `--brand-green #48A428`, `--brand-dark-green #18611C`
  - Secondary dark: `--spruce #0B312F`, `--dark-spruce #0D1D23`
  - Neutrals: `--off-white #FAFAFA`, `--muted-grey #F1F1F1`, `--muted-green #D9E6D4`, `--grey #E3E3E3`
  - Text: `--text #222`, `--text-muted #565656`, `--text-disabled #8D8D8D`, `--white-text #FEFEFE`
  - Map shadcn tokens: `--background = off-white`, `--foreground = text`, `--primary = dark-green`, `--primary-foreground = white-text`, `--accent = green`, `--muted = muted-grey`, `--border = grey`. Dark sections use `--dark-spruce` bg + `--white-text`.
- **Logo rules:** SVG component with `variant="green|dark-green|light-green"`. Only place on solid backgrounds; no shadows/recolour/rotation. Header uses Green on Off-White; footer uses Light Green on Dark Spruce. (User to upload official SVGs; placeholder wordmark until then.)
- Green reserved for CTAs/accents — never body text. Buttons: Dark Green default, Green hover.

## 2. Tech & infra

- TanStack Start (existing template), Tailwind v4, shadcn UI.
- **Lovable Cloud** for Postgres + storage + email queue (enable as part of build).
- **Lovable Emails** for receipts (built-in, requires user to set up sender subdomain post-build).
- Server functions (`createServerFn`) for cart pricing, order creation; **public server routes** under `src/routes/api/public/` for PayHero & Grassroots webhooks (HMAC/signature verified).

## 3. Data model (migrations)

- `categories(id, slug, name, sort)`
- `products(id, slug, name, description, category_id, base_price_kes, base_price_usd, images jsonb, active, created_at)`
- `product_variants(id, product_id, size, color, sku, stock, price_delta_kes, price_delta_usd)`
- `orders(id, public_ref, customer_name, customer_email, customer_phone, currency, subtotal, shipping_fee, total, fulfilment ENUM('pickup','delivery'), shipping_address jsonb, status ENUM('pending','paid','failed','cancelled'), payment_provider ENUM('payhero','grassroots'), created_at)`
- `order_items(id, order_id, product_id, variant_id, name_snapshot, unit_price, quantity, subtotal)`
- `payment_transactions(id, order_id, provider, provider_ref, status, amount, currency, raw_payload jsonb, created_at)`
- Public `anon` SELECT on `products`, `product_variants`, `categories` (active only). All writes via server functions with service role.
- Seed migration loads ~8 sample products across Apparel / Accessories / Stationery / Bundles using placeholder imagery until real assets arrive.

## 4. Routes

Public:
- `/` — landing: hero, featured products, mission strip, CTA to shop.
- `/shop` — catalogue: category filter, search, sort, grid.
- `/product/$slug` — gallery, variant picker, qty, add-to-cart, related.
- `/cart` — line items, qty edit, remove, totals, currency toggle.
- `/checkout` — guest details, fulfilment (pickup/delivery), shipping calc, payment method (PayHero / Grassroots).
- `/checkout/processing/$orderRef` — polls order status after STK push / payment init.
- `/thank-you/$orderRef` — receipt summary, link back to spurafrika.org.
- `/about-shop`, `/shipping-returns`, `/contact` — content pages.

API (server routes, public prefix):
- `POST /api/public/payments/payhero/webhook`
- `POST /api/public/payments/grassroots/webhook`

Server functions (RPC): `getProducts`, `getProductBySlug`, `priceCart`, `createOrder`, `initiatePayment`, `getOrderStatus`.

## 5. Cart & currency

- Client cart in Zustand + `localStorage` (`spurafrika-cart-v1`); server `priceCart` re-validates prices/stock at checkout.
- Currency toggle (KES default / USD) stored in cart; locked at order creation. Display formatter per currency. Shipping fees configurable: pickup = 0; Kenya delivery flat (e.g., KES 350); international flat (e.g., USD 25). Stored in a `shipping_rates` table for easy edits.

## 6. Payments

- Both providers initiated server-side; no secrets in browser. Required secrets (requested via `add_secret` after Cloud is enabled, separately for staging keys to be added by client):
  - `PAYHERO_API_USERNAME`, `PAYHERO_API_PASSWORD`, `PAYHERO_CHANNEL_ID`, `PAYHERO_CALLBACK_SECRET`
  - `GRASSROOTS_API_KEY`, `GRASSROOTS_MERCHANT_ID`, `GRASSROOTS_WEBHOOK_SECRET`
- Flow: `createOrder` → status `pending` → `initiatePayment` calls provider → user prompted (STK push for M-Pesa, or hosted card page) → webhook verifies signature, updates `payment_transactions` + `orders.status` → client polls `getOrderStatus` and redirects to `/thank-you/...`.
- Webhooks idempotent on `provider_ref`.

## 7. Receipts & email

- On `orders.status = 'paid'`, enqueue `order-receipt` React Email template via Lovable Emails (`src/lib/email-templates/order-receipt.tsx`), branded in Outfit + brand greens, Off-White body. Sent to customer; BCC `SPUR_ADMIN_EMAIL` (secret).
- `/thank-you/$orderRef` shows full receipt and download-friendly summary.

## 8. Out of scope for v1

- Admin dashboard UI (orders/products managed in Lovable Cloud DB view; product edits via migration).
- Discount codes, multi-warehouse stock, account login, refunds UI.

## 9. Build order

1. Enable Lovable Cloud; add brand tokens, Outfit font, logo component, base layout (header/footer).
2. Migrations + seed data + product list/detail pages.
3. Cart store, cart page, currency toggle.
4. Checkout form, `createOrder`, shipping calc.
5. PayHero integration + webhook + status polling.
6. Grassroots integration + webhook.
7. Email receipts + thank-you page.
8. Content pages, SEO meta per route, og:image on product pages.
9. Manual test pass: cart → checkout → sandbox payment success/failure → receipt.

## 10. What I'll need from you during/after build

- Official Spur Afrika logo SVGs (Green, Dark Green, Light Green variants) — drop into chat to replace placeholders.
- PayHero + Grassroots **test** credentials (I'll prompt via the secrets dialog when we reach payment wiring).
- Real product content (names, descriptions, KES + USD prices, images) — can replace seed data later.
- Sender email subdomain choice for Lovable Emails (e.g. `notify.spurafrika.org`) when we wire receipts.
- Confirmation of shipping flat-rates (KES local, USD international) and admin notification email.
