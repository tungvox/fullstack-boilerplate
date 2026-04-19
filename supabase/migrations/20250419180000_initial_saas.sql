-- Single-user SaaS baseline: profiles + Stripe mirror tables + RLS
-- Service role (used by app webhooks only) bypasses RLS.

-- ---------------------------------------------------------------------------
-- profiles
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is 'App profile row per auth user; created by trigger.';

create index profiles_created_at_idx on public.profiles (created_at desc);

alter table public.profiles enable row level security;

create policy "profiles_select_own"
  on public.profiles
  for select
  to authenticated
  using (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- ---------------------------------------------------------------------------
-- billing_customers (Stripe Customer id per user)
-- ---------------------------------------------------------------------------
create table public.billing_customers (
  user_id uuid primary key references public.profiles (id) on delete cascade,
  stripe_customer_id text not null unique,
  created_at timestamptz not null default now()
);

comment on table public.billing_customers is 'Mirror Stripe customer ids; writes only from trusted server code (service role).';

alter table public.billing_customers enable row level security;

create policy "billing_customers_select_own"
  on public.billing_customers
  for select
  to authenticated
  using (auth.uid() = user_id);

-- Authenticated users cannot insert/update/delete billing mirror rows.

-- ---------------------------------------------------------------------------
-- billing_subscriptions (Stripe subscription mirror)
-- ---------------------------------------------------------------------------
create table public.billing_subscriptions (
  user_id uuid primary key references public.profiles (id) on delete cascade,
  stripe_subscription_id text unique,
  stripe_customer_id text not null,
  status text not null default 'inactive',
  price_id text,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.billing_subscriptions is 'Mirror Stripe subscription state; writes only from trusted server code (service role).';

create index billing_subscriptions_stripe_customer_id_idx
  on public.billing_subscriptions (stripe_customer_id);

alter table public.billing_subscriptions enable row level security;

create policy "billing_subscriptions_select_own"
  on public.billing_subscriptions
  for select
  to authenticated
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Auto-create profile on signup
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

revoke all on function public.handle_new_user() from public;
grant execute on function public.handle_new_user() to service_role;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute procedure public.handle_new_user();
