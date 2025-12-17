-- SMB Industries tables for JOURN3Y Small Business section

-- Main industries table
create table if not exists smb_industries (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  name text not null,
  tagline text not null,
  icon_name text default 'Building',
  hero_headline text not null,
  hero_subhead text not null,
  hero_image_url text,
  results_statement text,
  related_industries text[] default '{}',
  metadata_title text,
  metadata_description text,
  metadata_keywords text[] default '{}',
  display_order integer default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Pain points for each industry
create table if not exists smb_pain_points (
  id uuid default gen_random_uuid() primary key,
  industry_id uuid references smb_industries(id) on delete cascade,
  title text not null,
  description text not null,
  display_order integer default 0,
  created_at timestamptz default now()
);

-- Use cases / solutions for each industry
create table if not exists smb_use_cases (
  id uuid default gen_random_uuid() primary key,
  industry_id uuid references smb_industries(id) on delete cascade,
  title text not null,
  description text not null,
  benefit text,
  icon_name text default 'Zap',
  image_url text,
  display_order integer default 0,
  created_at timestamptz default now()
);

-- FAQs for each industry (important for AI indexing)
create table if not exists smb_faqs (
  id uuid default gen_random_uuid() primary key,
  industry_id uuid references smb_industries(id) on delete cascade,
  question text not null,
  answer text not null,
  display_order integer default 0,
  created_at timestamptz default now()
);

-- Admin users whitelist
create table if not exists smb_admin_users (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  name text,
  created_at timestamptz default now()
);

-- Insert admin users
insert into smb_admin_users (email, name) values
  ('kevin@journ3y.com.au', 'Kevin Morrell'),
  ('adam@journ3y.com.au', 'Adam King')
on conflict (email) do nothing;

-- Create indexes for better query performance
create index if not exists idx_smb_industries_slug on smb_industries(slug);
create index if not exists idx_smb_industries_active on smb_industries(is_active);
create index if not exists idx_smb_industries_order on smb_industries(display_order);
create index if not exists idx_smb_pain_points_industry on smb_pain_points(industry_id);
create index if not exists idx_smb_use_cases_industry on smb_use_cases(industry_id);
create index if not exists idx_smb_faqs_industry on smb_faqs(industry_id);

-- Row Level Security
alter table smb_industries enable row level security;
alter table smb_pain_points enable row level security;
alter table smb_use_cases enable row level security;
alter table smb_faqs enable row level security;
alter table smb_admin_users enable row level security;

-- Public read access for active industries
create policy "Public read active industries" on smb_industries
  for select using (is_active = true);

create policy "Public read pain points" on smb_pain_points
  for select using (
    exists (select 1 from smb_industries where id = industry_id and is_active = true)
  );

create policy "Public read use cases" on smb_use_cases
  for select using (
    exists (select 1 from smb_industries where id = industry_id and is_active = true)
  );

create policy "Public read faqs" on smb_faqs
  for select using (
    exists (select 1 from smb_industries where id = industry_id and is_active = true)
  );

-- Admin full access (check against admin_users table)
create policy "Admin full access industries" on smb_industries
  for all using (
    auth.jwt() ->> 'email' in (select email from smb_admin_users)
  );

create policy "Admin full access pain_points" on smb_pain_points
  for all using (
    auth.jwt() ->> 'email' in (select email from smb_admin_users)
  );

create policy "Admin full access use_cases" on smb_use_cases
  for all using (
    auth.jwt() ->> 'email' in (select email from smb_admin_users)
  );

create policy "Admin full access faqs" on smb_faqs
  for all using (
    auth.jwt() ->> 'email' in (select email from smb_admin_users)
  );

-- Admin users table is readable only by admins
create policy "Admin read admin_users" on smb_admin_users
  for select using (
    auth.jwt() ->> 'email' in (select email from smb_admin_users)
  );

-- Function to update updated_at timestamp
create or replace function update_smb_industries_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger to auto-update updated_at
drop trigger if exists smb_industries_updated_at on smb_industries;
create trigger smb_industries_updated_at
  before update on smb_industries
  for each row
  execute function update_smb_industries_updated_at();
