-- Orders and PayHero payment tracking for Spur Afrika Shop

create extension if not exists "pgcrypto";

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  external_reference text not null unique,
  status text not null default 'pending'
    check (status in ('pending', 'queued', 'paid', 'failed', 'cancelled')),
  currency text not null check (currency in ('KES', 'USD', 'AUD')),
  subtotal numeric(12, 2) not null,
  shipping numeric(12, 2) not null,
  total numeric(12, 2) not null,
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  fulfilment text not null check (fulfilment in ('pickup', 'delivery')),
  delivery_address jsonb,
  line_items jsonb not null,
  payhero_checkout_request_id text,
  payhero_reference text,
  mpesa_receipt_number text,
  payment_result_code integer,
  payment_result_desc text,
  raw_callback jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists orders_status_idx on public.orders (status);
create index if not exists orders_created_at_idx on public.orders (created_at desc);

grant all on public.orders to service_role;

create or replace function public.set_orders_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists orders_updated_at on public.orders;
create trigger orders_updated_at
  before update on public.orders
  for each row
  execute function public.set_orders_updated_at();

alter table public.orders enable row level security;

-- No public policies: access only via service role on the server.