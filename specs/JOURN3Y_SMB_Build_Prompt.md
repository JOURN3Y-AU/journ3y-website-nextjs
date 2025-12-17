# JOURN3Y SMB Section - Complete Build Specification

## Project Overview

Build a new Small Business (SMB) section for JOURN3Y, an AI consulting company for Australian small businesses. This section needs to:

1. **Help prospects "find themselves"** - Visitors should quickly identify their industry and feel understood
2. **Be discoverable by AI search** - Rich, indexable content so JOURN3Y appears when people ask ChatGPT/Claude/Perplexity "who can help my small business with AI in Australia"
3. **Be easily maintainable** - Content managed via Supabase with a lightweight admin interface
4. **Feel cohesive** - Match the existing site's design language exactly

---

## Technical Stack

- **Framework:** Next.js 14 with App Router (already set up)
- **Styling:** Tailwind CSS + shadcn/ui components
- **Database:** Supabase (already configured)
- **Storage:** Supabase Storage for images
- **Icons:** Lucide React (already installed)
- **Auth:** Supabase Auth for admin access

Check existing patterns in:
- `/src/components/ui/` - shadcn components
- `/src/app/page.tsx` - Homepage patterns
- `/src/app/products/glean/page.tsx` - Product page patterns
- `/src/app/team/page.tsx` - Supabase data fetching patterns

---

## Part 1: Database Schema

### Create these Supabase tables:

```sql
-- Main industries table
create table smb_industries (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  name text not null,
  tagline text not null,
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
create table smb_pain_points (
  id uuid default gen_random_uuid() primary key,
  industry_id uuid references smb_industries(id) on delete cascade,
  title text not null,
  description text not null,
  display_order integer default 0,
  created_at timestamptz default now()
);

-- Use cases / solutions for each industry
create table smb_use_cases (
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
create table smb_faqs (
  id uuid default gen_random_uuid() primary key,
  industry_id uuid references smb_industries(id) on delete cascade,
  question text not null,
  answer text not null,
  display_order integer default 0,
  created_at timestamptz default now()
);

-- Admin users whitelist
create table smb_admin_users (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  name text,
  created_at timestamptz default now()
);

-- Insert admin users
insert into smb_admin_users (email, name) values
  ('kevin@journ3y.com.au', 'Kevin Morrell'),
  ('adam@journ3y.com.au', 'Adam King');

-- Row Level Security
alter table smb_industries enable row level security;
alter table smb_pain_points enable row level security;
alter table smb_use_cases enable row level security;
alter table smb_faqs enable row level security;

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
```

### Supabase Storage Setup

Create a public bucket called `smb-images`:

```
smb-images/
  ├── placeholders/
  │   ├── hero-default.jpg
  │   └── industry-card-default.jpg
  ├── construction/
  │   └── hero.jpg
  ├── real-estate/
  │   └── hero.jpg
  └── [other industries]/
```

---

## Part 2: Route Structure

```
/smb                          → Landing page with industry selector
/smb/[industry]               → Dynamic industry pages (SSR from Supabase)

/admin/smb                    → Admin: List all industries (protected)
/admin/smb/[slug]             → Admin: Edit industry (protected)
/admin/smb/new                → Admin: Create new industry (protected)
```

---

## Part 3: Public Pages UX

### 3.1 SMB Landing Page (`/smb/page.tsx`)

#### Layout Flow (top to bottom):

```
┌─────────────────────────────────────────────────────────────────────────┐
│  HERO SECTION                                                            │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  "AI Solutions Built for Your Industry"                          │    │
│  │  "Whether you're in trades, professional services, or retail -   │    │
│  │   we've configured AI that understands your business"            │    │
│  │                                                                   │    │
│  │  [Find Your Industry ↓]                                          │    │
│  └─────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│  INDUSTRY SELECTOR (anchor: #industries)                                 │
│                                                                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │ 🔨       │ │ 🏠       │ │ 👥       │ │ ❤️       │ │ 💼       │      │
│  │Construct-│ │Real      │ │Recruit-  │ │Health-   │ │Profess-  │      │
│  │ion       │ │Estate    │ │ment      │ │care      │ │ional     │      │
│  │"Stop     │ │"Close    │ │"Place    │ │"Less     │ │"More     │      │
│  │chasing   │ │more,     │ │more,     │ │paperwork"│ │billable  │      │
│  │paperwork"│ │admin less│ │admin less│ │          │ │hours"    │      │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │ 🛍️       │ │ 🎓       │ │ 💰       │ │ 🍽️       │ │ 🏭       │      │
│  │Retail    │ │Education │ │Financial │ │Hospit-   │ │Manufact- │      │
│  │"Sell     │ │"Teach    │ │"Compliant│ │"Smoother │ │"Fewer    │      │
│  │more,     │ │more,     │ │without   │ │service,  │ │delays,   │      │
│  │stress    │ │admin less│ │the       │ │less      │ │less      │      │
│  │less"     │ │          │ │burden"   │ │chaos"    │ │waste"    │      │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│  SMART MATCHER (inline)                                                  │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  🔍 "Don't see your industry?"                                   │    │
│  │                                                                   │    │
│  │  Tell us about your business and we'll show you how we can help  │    │
│  │  ┌───────────────────────────────────────────────┐ ┌───────────┐│    │
│  │  │ e.g. "I run a mobile dog grooming business"   │ │ Find →    ││    │
│  │  └───────────────────────────────────────────────┘ └───────────┘│    │
│  │                                                                   │    │
│  │  [Result appears here when submitted - matched industry card]    │    │
│  └─────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│  HOW IT WORKS (4 steps)                                                  │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐           │
│  │ 01         │ │ 02         │ │ 03         │ │ 04         │           │
│  │ Platform   │ │ System     │ │ Custom AI  │ │ Training & │           │
│  │ Setup      │ │ Integration│ │ Agents     │ │ Support    │           │
│  └────────────┘ └────────────┘ └────────────┘ └────────────┘           │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│  STATS / SOCIAL PROOF                                                    │
│  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐        │
│  │ 40%              │ │ 4 weeks          │ │ 50+              │        │
│  │ efficiency gain  │ │ to go live       │ │ Aussie businesses│        │
│  └──────────────────┘ └──────────────────┘ └──────────────────┘        │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│  FINAL CTA                                                               │
│  "Ready to see how AI can transform your business?"                      │
│  [Get Your Free Demo]                                                    │
└─────────────────────────────────────────────────────────────────────────┘
```

#### Industry Card Component

Each card in the selector:
- Icon (from Lucide)
- Industry name
- Tagline
- Subtle hover effect (lift + shadow)
- Links to `/smb/[slug]`

Use consistent card heights. Taglines may vary in length - handle gracefully.

---

### 3.2 Industry Page (`/smb/[industry]/page.tsx`)

#### Metadata (CRITICAL for AI discoverability)

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const industry = await getIndustry(params.industry);
  
  return {
    title: industry.metadata_title,
    description: industry.metadata_description,
    keywords: industry.metadata_keywords,
    openGraph: {
      title: industry.metadata_title,
      description: industry.metadata_description,
      type: 'website',
      url: `https://journ3y.com.au/smb/${industry.slug}`,
    },
  };
}
```

#### Page Layout:

```
┌─────────────────────────────────────────────────────────────────────────┐
│  BREADCRUMB                                                              │
│  Home > Small Business > Construction & Trades                           │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│  HERO SECTION                                                            │
│  ┌────────────────────────────────┬────────────────────────────────┐    │
│  │                                │                                 │    │
│  │  "AI That Speaks Tradie"       │     [Hero Image]               │    │
│  │                                │     (placeholder initially)     │    │
│  │  Stop losing money to          │                                 │    │
│  │  paperwork. Start winning      │                                 │    │
│  │  more jobs.                    │                                 │    │
│  │                                │                                 │    │
│  │  [Get Your Free Demo]          │                                 │    │
│  │  [See What's Possible ↓]       │                                 │    │
│  │                                │                                 │    │
│  └────────────────────────────────┴────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│  "WE GET IT" - PAIN POINTS                                               │
│                                                                          │
│  The challenges you're facing (we've heard them before)                  │
│                                                                          │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐           │
│  │ "Quoting eats   │ │ "Site docs are  │ │ "Chasing subbies│           │
│  │  my weekends"   │ │  chaos"         │ │  is a full-time │           │
│  │                 │ │                 │ │  job"           │           │
│  │ Every Sunday... │ │ Photos in       │ │ Getting         │           │
│  │                 │ │ camera rolls... │ │ paperwork...    │           │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘           │
│  ┌─────────────────┐                                                    │
│  │ "Cash flow is   │                                                    │
│  │  a mystery"     │                                                    │
│  │                 │                                                    │
│  │ You know money..│                                                    │
│  └─────────────────┘                                                    │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│  "HERE'S HOW AI FIXES THIS" - USE CASES                                  │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │ 📄 Instant Quote Generation                                      │    │
│  │    Upload plans or describe the job verbally. AI calculates      │    │
│  │    materials, estimates labour, and generates a professional     │    │
│  │    quote you can send in minutes.                                │    │
│  │    ✓ "Builders report cutting quote time by 75%"                 │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │ 📷 Smart Site Documentation                                      │    │
│  │    Snap photos on site, add a voice note. AI organises           │    │
│  │    everything by job...                                          │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│  [... more use cases]                                                    │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│  RESULTS STATEMENT                                                       │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │  "Construction clients typically save 8-12 hours per week       │    │
│  │   on admin"                                                      │    │
│  └─────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│  FAQ SECTION (collapsible accordion)                                     │
│                                                                          │
│  Frequently Asked Questions                                              │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │ ▶ How can AI help my construction business?                      │    │
│  ├─────────────────────────────────────────────────────────────────┤    │
│  │ ▶ What systems does JOURN3Y integrate with for construction?     │    │
│  ├─────────────────────────────────────────────────────────────────┤    │
│  │ ▶ How long does implementation take?                             │    │
│  ├─────────────────────────────────────────────────────────────────┤    │
│  │ ▶ Do I need to be tech-savvy?                                    │    │
│  └─────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│  RELATED INDUSTRIES                                                      │
│                                                                          │
│  We also help businesses in:                                             │
│                                                                          │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐                     │
│  │ Real Estate  │ │ Manufacturing│ │ Professional │                     │
│  │              │ │              │ │ Services     │                     │
│  └──────────────┘ └──────────────┘ └──────────────┘                     │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│  FINAL CTA                                                               │
│                                                                          │
│  "Ready to see AI in action for your construction business?"             │
│                                                                          │
│  [Book Your Free Demo - 30 minutes, no commitment]                       │
└─────────────────────────────────────────────────────────────────────────┘
```

#### Schema Markup (add to each industry page)

```typescript
// Add to page.tsx
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": industry.faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": `AI Solutions for ${industry.name}`,
  "provider": {
    "@type": "Organization",
    "name": "JOURN3Y",
    "url": "https://journ3y.com.au"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Australia"
  },
  "description": industry.metadata_description
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://journ3y.com.au" },
    { "@type": "ListItem", "position": 2, "name": "Small Business", "item": "https://journ3y.com.au/smb" },
    { "@type": "ListItem", "position": 3, "name": industry.name, "item": `https://journ3y.com.au/smb/${industry.slug}` }
  ]
};

// In the page component:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
/>
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
/>
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
/>
```

---

### 3.3 Responsive Behaviour

#### Desktop (1280px+)
```
Industry Grid: 5 columns
Pain Points: 4 columns (or 3 if only 3 items)
Use Cases: 2 columns (alternating layout) or stacked cards
FAQs: Full width accordion
```

#### Tablet (768px - 1279px)
```
Industry Grid: 3 columns
Pain Points: 2 columns
Use Cases: 1 column, full width cards
FAQs: Full width accordion
```

#### Mobile (< 768px)
```
Industry Grid: 2 columns (smaller cards) OR horizontal scroll carousel
Pain Points: 1 column, stacked
Use Cases: 1 column, stacked
FAQs: Full width accordion
Hero: Stack vertically (text above image)
```

---

### 3.4 Smart Matcher API

Create `/app/api/match-industry/route.ts`:

```typescript
import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@/lib/supabase/server';

const anthropic = new Anthropic();

export async function POST(request: Request) {
  const { businessDescription } = await request.json();
  
  // Get active industries from Supabase
  const supabase = createClient();
  const { data: industries } = await supabase
    .from('smb_industries')
    .select('slug, name, tagline')
    .eq('is_active', true);
  
  const industryList = industries
    .map(i => `- ${i.slug}: ${i.name} - ${i.tagline}`)
    .join('\n');
  
  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 300,
    messages: [
      {
        role: "user",
        content: `You are a business industry classifier for JOURN3Y, an AI consulting company for Australian small businesses.

Match this business description to the most appropriate industry:

"${businessDescription}"

Available industries:
${industryList}

Rules:
- Always return a match, even if confidence is low
- If the business spans multiple industries, choose the PRIMARY revenue source
- Service businesses (cleaning, gardening, mobile services) → typically retail or professional-services
- If truly unsure, default to professional-services

Return ONLY valid JSON (no markdown, no explanation):
{
  "matchedIndustry": "slug",
  "confidence": "high|medium|low",
  "reasoning": "One sentence explanation shown to user",
  "alternateIndustries": ["slug1", "slug2"]
}`
      }
    ]
  });
  
  try {
    const result = JSON.parse(message.content[0].text);
    
    // Fetch full details of matched industry
    const { data: matchedIndustry } = await supabase
      .from('smb_industries')
      .select('*')
      .eq('slug', result.matchedIndustry)
      .single();
    
    // Fetch alternate industries
    const { data: alternates } = await supabase
      .from('smb_industries')
      .select('slug, name, tagline')
      .in('slug', result.alternateIndustries);
    
    return Response.json({
      ...result,
      matchedIndustry: matchedIndustry,
      alternateIndustries: alternates
    });
  } catch (e) {
    return Response.json({ error: 'Failed to parse response' }, { status: 500 });
  }
}
```

---

## Part 4: Admin Interface

### 4.1 Authentication

Create middleware to protect `/admin/*` routes:

```typescript
// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  
  const { data: { session } } = await supabase.auth.getSession();
  
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
    
    // Check if user is in admin whitelist
    const { data: adminUser } = await supabase
      .from('smb_admin_users')
      .select('email')
      .eq('email', session.user.email)
      .single();
    
    if (!adminUser) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }
  
  return res;
}

export const config = {
  matcher: ['/admin/:path*']
};
```

### 4.2 Admin Login Page (`/admin/login/page.tsx`)

Simple Supabase Auth UI:
- Email/password login
- "Magic link" option
- Redirect to `/admin/smb` on success
- Show error if not in whitelist

### 4.3 Admin Industry List (`/admin/smb/page.tsx`)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  JOURN3Y Admin                                              [Logout]    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  SMB Industries                                    [+ Add Industry]      │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │ ≡ │ Construction & Trades     │ Active  │ [Edit] [Preview] [↕] │    │
│  ├───┼───────────────────────────┼─────────┼──────────────────────┤    │
│  │ ≡ │ Real Estate & Property    │ Active  │ [Edit] [Preview] [↕] │    │
│  ├───┼───────────────────────────┼─────────┼──────────────────────┤    │
│  │ ≡ │ Recruitment & Staffing    │ Active  │ [Edit] [Preview] [↕] │    │
│  ├───┼───────────────────────────┼─────────┼──────────────────────┤    │
│  │ ≡ │ Healthcare & Allied Health│ Draft   │ [Edit] [Preview] [↕] │    │
│  ├───┼───────────────────────────┼─────────┼──────────────────────┤    │
│  │ ≡ │ Professional Services     │ Active  │ [Edit] [Preview] [↕] │    │
│  └───┴───────────────────────────┴─────────┴──────────────────────┘    │
│                                                                          │
│  Drag to reorder • Click status to toggle Active/Draft                   │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

Features:
- Drag-to-reorder (updates `display_order`)
- Click status badge to toggle `is_active`
- Edit button → `/admin/smb/[slug]`
- Preview button → opens `/smb/[slug]` in new tab
- Add Industry → `/admin/smb/new`

### 4.4 Admin Edit Industry (`/admin/smb/[slug]/page.tsx`)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  ← Back to Industries    Construction & Trades    [Preview] [Delete]    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─── BASICS ───────────────────────────────────────────────────────┐   │
│  │                                                                   │   │
│  │  Name                                                             │   │
│  │  ┌───────────────────────────────────────────────────────────┐   │   │
│  │  │ Construction & Trades                                      │   │   │
│  │  └───────────────────────────────────────────────────────────┘   │   │
│  │                                                                   │   │
│  │  Slug (URL path)                                                  │   │
│  │  ┌───────────────────────────────────────────────────────────┐   │   │
│  │  │ construction                                               │   │   │
│  │  └───────────────────────────────────────────────────────────┘   │   │
│  │  journ3y.com.au/smb/construction                                  │   │
│  │                                                                   │   │
│  │  Tagline (shown on industry card)                                 │   │
│  │  ┌───────────────────────────────────────────────────────────┐   │   │
│  │  │ Stop chasing paperwork                                     │   │   │
│  │  └───────────────────────────────────────────────────────────┘   │   │
│  │                                                                   │   │
│  └───────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  ┌─── HERO SECTION ─────────────────────────────────────────────────┐   │
│  │                                                                   │   │
│  │  Headline                                                         │   │
│  │  ┌───────────────────────────────────────────────────────────┐   │   │
│  │  │ AI That Speaks Tradie                                      │   │   │
│  │  └───────────────────────────────────────────────────────────┘   │   │
│  │                                                                   │   │
│  │  Subhead                                                          │   │
│  │  ┌───────────────────────────────────────────────────────────┐   │   │
│  │  │ Stop losing money to paperwork. Start winning more jobs.   │   │   │
│  │  └───────────────────────────────────────────────────────────┘   │   │
│  │                                                                   │   │
│  │  Hero Image                                                       │   │
│  │  ┌─────────────────────────────┐                                 │   │
│  │  │                             │  [Change Image]                  │   │
│  │  │   [Current image preview]   │  [Remove Image]                  │   │
│  │  │                             │                                  │   │
│  │  └─────────────────────────────┘                                 │   │
│  │  Drag & drop or click to upload. Recommended: 1200x675px (16:9)   │   │
│  │                                                                   │   │
│  └───────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  ┌─── PAIN POINTS ──────────────────────────────────── [+ Add] ─────┐   │
│  │                                                                   │   │
│  │  ≡ 1. "Quoting eats my weekends"                        [Edit][×]│   │
│  │      Every Sunday night spent measuring plans...                  │   │
│  │                                                                   │   │
│  │  ≡ 2. "Site documentation is chaos"                     [Edit][×]│   │
│  │      Photos in camera rolls, notes on napkins...                  │   │
│  │                                                                   │   │
│  │  ≡ 3. "Chasing subbies is a full-time job"             [Edit][×]│   │
│  │      Getting paperwork, insurance certs...                        │   │
│  │                                                                   │   │
│  │  ≡ 4. "Cash flow is a mystery"                          [Edit][×]│   │
│  │      You know money's coming in and going out...                  │   │
│  │                                                                   │   │
│  │  Drag to reorder                                                  │   │
│  └───────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  ┌─── USE CASES ────────────────────────────────────── [+ Add] ─────┐   │
│  │                                                                   │   │
│  │  ≡ 1. Instant Quote Generation              [FileText]  [Edit][×]│   │
│  │      Upload plans or describe the job verbally...                 │   │
│  │      Benefit: "Builders report cutting quote time by 75%"         │   │
│  │                                                                   │   │
│  │  ≡ 2. Smart Site Documentation              [Camera]    [Edit][×]│   │
│  │      Snap photos on site, add a voice note...                     │   │
│  │      Benefit: "Find any photo or document in seconds"             │   │
│  │                                                                   │   │
│  │  [... more use cases]                                             │   │
│  │                                                                   │   │
│  │  Drag to reorder                                                  │   │
│  └───────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  ┌─── FAQs ─────────────────────────────────────────── [+ Add] ─────┐   │
│  │                                                                   │   │
│  │  ≡ 1. How can AI help my construction business?         [Edit][×]│   │
│  │      AI handles the admin that's eating your time...              │   │
│  │                                                                   │   │
│  │  ≡ 2. What systems does JOURN3Y integrate with?         [Edit][×]│   │
│  │      We connect to the tools you're already using...              │   │
│  │                                                                   │   │
│  │  [... more FAQs]                                                  │   │
│  │                                                                   │   │
│  │  Drag to reorder                                                  │   │
│  └───────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  ┌─── SEO / METADATA ───────────────────────────────────────────────┐   │
│  │                                                                   │   │
│  │  Meta Title (max 60 chars)                                        │   │
│  │  ┌───────────────────────────────────────────────────────────┐   │   │
│  │  │ AI for Construction & Trades Australia | JOURN3Y           │   │   │
│  │  └───────────────────────────────────────────────────────────┘   │   │
│  │  52/60 characters                                                 │   │
│  │                                                                   │   │
│  │  Meta Description (max 155 chars)                                 │   │
│  │  ┌───────────────────────────────────────────────────────────┐   │   │
│  │  │ AI consulting for Australian builders, tradies and         │   │   │
│  │  │ construction businesses. Automate quoting, site            │   │   │
│  │  │ documentation...                                           │   │   │
│  │  └───────────────────────────────────────────────────────────┘   │   │
│  │  142/155 characters                                               │   │
│  │                                                                   │   │
│  │  Keywords (comma separated)                                       │   │
│  │  ┌───────────────────────────────────────────────────────────┐   │   │
│  │  │ AI for builders Australia, construction AI software,       │   │   │
│  │  │ tradie automation, builder quoting software AI             │   │   │
│  │  └───────────────────────────────────────────────────────────┘   │   │
│  │                                                                   │   │
│  └───────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  ┌─── RELATED INDUSTRIES ───────────────────────────────────────────┐   │
│  │                                                                   │   │
│  │  Select 2-4 related industries:                                   │   │
│  │  ☑ Real Estate    ☐ Recruitment    ☐ Healthcare                  │   │
│  │  ☑ Manufacturing  ☑ Professional Services  ☐ Retail              │   │
│  │  ☐ Education      ☐ Financial Services    ☐ Hospitality          │   │
│  │                                                                   │   │
│  └───────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  ┌─── RESULTS STATEMENT ────────────────────────────────────────────┐   │
│  │                                                                   │   │
│  │  ┌───────────────────────────────────────────────────────────┐   │   │
│  │  │ Construction clients typically save 8-12 hours per week    │   │   │
│  │  │ on admin                                                   │   │   │
│  │  └───────────────────────────────────────────────────────────┘   │   │
│  │                                                                   │   │
│  └───────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  ───────────────────────────────────────────────────────────────────    │
│                                                                          │
│  Status: ○ Draft  ● Active                                              │
│                                                                          │
│                              [Cancel]  [Save & Continue]  [Publish]      │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 4.5 Admin Components to Build

```
/src/components/admin/
  AdminLayout.tsx             # Shared admin layout with nav
  IndustryList.tsx            # Sortable list with drag handles
  IndustryForm.tsx            # Main edit form with all sections
  PainPointEditor.tsx         # Inline CRUD for pain points
  UseCaseEditor.tsx           # Inline CRUD for use cases with icon picker
  FAQEditor.tsx               # Inline CRUD for FAQs
  ImageUploader.tsx           # Drag-drop upload to Supabase Storage
  IconPicker.tsx              # Visual selector for Lucide icons
  CharacterCounter.tsx        # Shows chars remaining for SEO fields
  StatusToggle.tsx            # Draft/Active toggle
  DragHandle.tsx              # Reorder grip icon
```

### 4.6 Key Admin Features

1. **Auto-save drafts** - Save changes automatically every 30 seconds
2. **Explicit publish** - Changes only go live when "Publish" is clicked
3. **Drag-to-reorder** - Use `@dnd-kit/sortable` for all orderable lists
4. **Image preview** - Show thumbnail after upload, easy replace
5. **Validation** - Real-time validation with helpful error messages
6. **Preview button** - Opens public page in new tab (shows draft content if viewing as admin)

---

## Part 5: Placeholder Images

### Strategy
Use professional placeholder images initially. Make them trivially easy to replace.

### Implementation
1. Store placeholder URLs in Supabase Storage at `/smb-images/placeholders/`
2. Default `hero_image_url` to placeholder if null
3. In admin, show "Using placeholder" badge if no custom image

### Placeholder Specs
- **Hero images:** 1200x675px (16:9), abstract/professional
- **Industry cards:** 400x300px (4:3) - or just use icons, no images

### Placeholder Sources (royalty-free)
- Use Unsplash API or static Unsplash images
- Alternative: Generate with AI (DALL-E/Midjourney) or use abstract gradients

### Fallback Component
```typescript
// ImageWithFallback.tsx
export function IndustryHeroImage({ src, alt, industry }: Props) {
  const [error, setError] = useState(false);
  
  const fallbackSrc = `/images/placeholders/hero-${industry}.jpg`;
  const defaultFallback = `/images/placeholders/hero-default.jpg`;
  
  return (
    <Image
      src={error ? defaultFallback : (src || fallbackSrc)}
      alt={alt}
      onError={() => setError(true)}
      // ... other props
    />
  );
}
```

---

## Part 6: Data Seeding Script

Create `/scripts/seed-smb-industries.ts` to populate initial data:

```typescript
// Run with: npx tsx scripts/seed-smb-industries.ts

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role for seeding
);

const industries = [
  // ... all industry data from Part 7 below
];

async function seed() {
  console.log('Seeding SMB industries...');
  
  for (const industry of industries) {
    // Insert industry
    const { data: ind, error: indError } = await supabase
      .from('smb_industries')
      .upsert({
        slug: industry.slug,
        name: industry.name,
        tagline: industry.tagline,
        hero_headline: industry.hero.headline,
        hero_subhead: industry.hero.subhead,
        results_statement: industry.resultsStatement,
        related_industries: industry.relatedIndustries,
        metadata_title: industry.metadata.title,
        metadata_description: industry.metadata.description,
        metadata_keywords: industry.metadata.keywords,
        display_order: industry.displayOrder,
        is_active: true,
      }, { onConflict: 'slug' })
      .select()
      .single();
    
    if (indError) {
      console.error(`Error inserting ${industry.slug}:`, indError);
      continue;
    }
    
    // Delete existing child records
    await supabase.from('smb_pain_points').delete().eq('industry_id', ind.id);
    await supabase.from('smb_use_cases').delete().eq('industry_id', ind.id);
    await supabase.from('smb_faqs').delete().eq('industry_id', ind.id);
    
    // Insert pain points
    for (let i = 0; i < industry.painPoints.length; i++) {
      await supabase.from('smb_pain_points').insert({
        industry_id: ind.id,
        title: industry.painPoints[i].title,
        description: industry.painPoints[i].description,
        display_order: i,
      });
    }
    
    // Insert use cases
    for (let i = 0; i < industry.useCases.length; i++) {
      await supabase.from('smb_use_cases').insert({
        industry_id: ind.id,
        title: industry.useCases[i].title,
        description: industry.useCases[i].description,
        benefit: industry.useCases[i].benefit,
        icon_name: industry.useCases[i].icon,
        display_order: i,
      });
    }
    
    // Insert FAQs
    for (let i = 0; i < industry.faqs.length; i++) {
      await supabase.from('smb_faqs').insert({
        industry_id: ind.id,
        question: industry.faqs[i].question,
        answer: industry.faqs[i].answer,
        display_order: i,
      });
    }
    
    console.log(`✓ Seeded ${industry.slug}`);
  }
  
  console.log('Done!');
}

seed();
```

---

## Part 7: Complete Industry Content Data

Use this data for seeding. All content is ready to use.

### Global Content

```typescript
const globalContent = {
  stats: [
    { value: "40%", label: "average efficiency gain" },
    { value: "4 weeks", label: "to go live" },
    { value: "50+", label: "Aussie businesses" },
  ],
  howItWorks: [
    {
      step: 1,
      title: "Platform Setup",
      description: "Quick deployment of your managed AI platform, configured for your industry"
    },
    {
      step: 2,
      title: "System Integration",
      description: "We connect to your existing tools - email, calendar, accounting, CRM"
    },
    {
      step: 3,
      title: "Custom AI Agents",
      description: "AI assistants trained on your industry's language and workflows"
    },
    {
      step: 4,
      title: "Training & Support",
      description: "Your team gets hands-on training plus ongoing support"
    },
  ],
};
```

### Industry 1: Construction & Trades

```typescript
{
  slug: "construction",
  name: "Construction & Trades",
  tagline: "Stop chasing paperwork",
  displayOrder: 1,
  metadata: {
    title: "AI for Construction & Trades Australia | Builder AI Solutions | JOURN3Y",
    description: "AI consulting for Australian builders, tradies and construction businesses. Automate quoting, site documentation, and subcontractor management. Get quotes done in minutes, not hours. 4-week setup.",
    keywords: ["AI for builders Australia", "construction AI software", "tradie automation", "builder quoting software AI", "construction business automation", "AI for tradies", "building industry AI", "construction admin automation", "subcontractor management AI", "Australian construction technology"]
  },
  hero: {
    headline: "AI That Speaks Tradie",
    subhead: "Stop losing money to paperwork. Start winning more jobs."
  },
  painPoints: [
    {
      title: "Quoting eats my weekends",
      description: "Every Sunday night spent measuring plans and calculating materials is time away from family - or from actually running jobs."
    },
    {
      title: "Site documentation is chaos",
      description: "Photos in camera rolls, notes on napkins, compliance docs in email somewhere. Finding anything takes forever."
    },
    {
      title: "Chasing subbies is a full-time job",
      description: "Getting paperwork, insurance certs, and invoices from subcontractors shouldn't require 47 follow-up messages."
    },
    {
      title: "Cash flow is a mystery",
      description: "You know money's coming in and going out, but across 5 jobs you've got no idea where you actually stand."
    }
  ],
  useCases: [
    {
      title: "Instant Quote Generation",
      icon: "FileText",
      description: "Upload plans or describe the job verbally. AI calculates materials, estimates labour, and generates a professional quote you can send in minutes - not hours.",
      benefit: "Builders report cutting quote time by 75%"
    },
    {
      title: "Smart Site Documentation",
      icon: "Camera",
      description: "Snap photos on site, add a voice note. AI organises everything by job, tags it properly, and makes it searchable. Compliance docs automatically filed.",
      benefit: "Find any photo or document in seconds"
    },
    {
      title: "Automated Subbie Chasing",
      icon: "Users",
      description: "AI tracks what's outstanding from each subcontractor - insurance, paperwork, invoices - and sends polite follow-ups automatically until it's done.",
      benefit: "Stop being the bad guy - let AI do the nagging"
    },
    {
      title: "Real-Time Cash Flow",
      icon: "DollarSign",
      description: "See exactly where you stand across all jobs. What's been invoiced, what's been paid, what's outstanding. Updated automatically from your accounting software.",
      benefit: "Know your numbers without spreadsheet gymnastics"
    },
    {
      title: "Client Update Automation",
      icon: "MessageSquare",
      description: "AI drafts weekly progress updates for each client based on site notes and photos. You review and send - or let it go automatically.",
      benefit: "Keep clients happy without the admin burden"
    },
    {
      title: "Smart Scheduling",
      icon: "Calendar",
      description: "AI helps coordinate trades across jobs, flags conflicts, and suggests optimal scheduling based on job progress and subbie availability.",
      benefit: "Stop playing Tetris with your calendar"
    }
  ],
  resultsStatement: "Construction clients typically save 8-12 hours per week on admin",
  faqs: [
    {
      question: "How can AI help my construction business?",
      answer: "AI handles the admin that's eating your time - quoting, documentation, subcontractor coordination, cash flow tracking, and client communication. Most builders we work with get back 8-12 hours per week to focus on actually running jobs and winning new work."
    },
    {
      question: "What systems does JOURN3Y integrate with for construction?",
      answer: "We connect to the tools you're already using: accounting software (Xero, MYOB, QuickBooks), email and calendar, cloud storage, and industry tools like Buildxact, CoConstruct, or Procore if you use them. No need to change what's working."
    },
    {
      question: "How long does implementation take?",
      answer: "Four weeks from kickoff to fully operational. Week 1 is setup and integration, Week 2-3 is configuration and AI training for your business, Week 4 is team training and go-live. You're not waiting 6 months."
    },
    {
      question: "Do I need to be tech-savvy?",
      answer: "If you can use a smartphone, you can use this. We've designed it for tradies, not IT people. Voice commands, simple interfaces, and we train your whole team."
    },
    {
      question: "How much does it cost?",
      answer: "We offer flexible pricing based on your business size. Most construction businesses invest $500-1500/month - which typically pays for itself in the first few weeks through time saved on quoting alone. Book a demo and we'll give you exact pricing."
    },
    {
      question: "Is my business data secure?",
      answer: "Yes. Your data stays in Australia, encrypted, and is never shared or used to train AI models. We're built on enterprise-grade infrastructure with the same security big companies use."
    },
    {
      question: "What if I have multiple job sites?",
      answer: "Perfect - that's where AI really shines. Track documentation, progress, and cash flow across unlimited sites from one dashboard. Your team can update from anywhere."
    },
    {
      question: "Can my team use it too?",
      answer: "Absolutely. Pricing includes your whole team. Everyone from apprentices to project managers can use it, with appropriate access levels."
    }
  ],
  relatedIndustries: ["real-estate", "manufacturing", "professional-services"]
}
```

### Industry 2: Real Estate & Property

```typescript
{
  slug: "real-estate",
  name: "Real Estate & Property",
  tagline: "Close more, admin less",
  displayOrder: 2,
  metadata: {
    title: "AI for Real Estate Agents Australia | Property AI Solutions | JOURN3Y",
    description: "AI consulting for Australian real estate agents and property managers. Automate listing descriptions, client follow-ups, and market reports. Close more deals with less admin. 4-week setup.",
    keywords: ["AI for real estate agents Australia", "real estate AI software", "property management AI", "real estate automation", "AI listing descriptions", "real estate CRM AI", "property agent automation", "Australian real estate technology", "real estate admin automation", "AI for property managers"]
  },
  hero: {
    headline: "AI That Closes Deals",
    subhead: "Spend less time on admin. More time with buyers and sellers."
  },
  painPoints: [
    {
      title: "Listing descriptions take forever",
      description: "You've got 5 new listings and writing compelling descriptions for each one means hours at the keyboard instead of showing properties."
    },
    {
      title: "Follow-ups fall through the cracks",
      description: "You met 30 people at open homes this month. How many actually got a follow-up call? Be honest."
    },
    {
      title: "Market reports are a nightmare",
      description: "Vendors want data. Pulling together comparable sales, market trends, and suburb insights takes half a day you don't have."
    },
    {
      title: "I'm drowning in enquiries",
      description: "Email, portal messages, social media DMs, phone calls. Responding to everyone quickly is impossible."
    }
  ],
  useCases: [
    {
      title: "Instant Listing Descriptions",
      icon: "FileText",
      description: "Enter property details or upload photos. AI generates compelling, accurate listing descriptions in your voice - for realestate.com.au, Domain, and social media.",
      benefit: "5-minute listings instead of 2-hour sessions"
    },
    {
      title: "Automated Follow-Up Sequences",
      icon: "Mail",
      description: "Every open home attendee gets personalised follow-up. AI tracks engagement, flags hot leads, and reminds you who needs a call - before they go cold.",
      benefit: "Never let a lead slip through again"
    },
    {
      title: "One-Click Market Reports",
      icon: "BarChart",
      description: "AI pulls comparable sales, market trends, days on market data, and suburb insights. Generates beautiful vendor reports in minutes.",
      benefit: "Impress vendors with data, not effort"
    },
    {
      title: "Smart Enquiry Management",
      icon: "MessageSquare",
      description: "AI triages incoming enquiries, answers common questions instantly, books inspection times, and escalates serious buyers to you immediately.",
      benefit: "Respond in minutes, not hours"
    },
    {
      title: "Social Media Content",
      icon: "Share",
      description: "AI generates property posts, market updates, and suburb content for your social channels. Review and schedule - or let it post automatically.",
      benefit: "Stay active online without the time investment"
    },
    {
      title: "Contract & Compliance Tracking",
      icon: "ClipboardCheck",
      description: "AI tracks where every deal is at - conditions, finance deadlines, settlement dates. Flags what needs attention before it becomes a problem.",
      benefit: "No more missed deadlines or awkward calls"
    }
  ],
  resultsStatement: "Real estate clients typically convert 30% more leads with AI-powered follow-up",
  faqs: [
    {
      question: "How can AI help my real estate business?",
      answer: "AI handles the repetitive admin that takes you away from clients - listing descriptions, follow-up emails, market reports, enquiry responses, and social media. Most agents we work with get back 10+ hours per week and see better conversion from leads they were previously missing."
    },
    {
      question: "Will it sound like me?",
      answer: "Yes. We train the AI on your existing listings and communication style. It learns your voice, your preferred phrases, your approach. Clients won't know the difference."
    },
    {
      question: "Does it integrate with my CRM?",
      answer: "We work with the major real estate CRMs - Rex, Agentbox, VaultRE, and others. Also connects to email, calendar, and the major portals. Your existing workflow stays intact."
    },
    {
      question: "How do you handle compliance?",
      answer: "AI-generated content is always reviewed by you before it goes out. We also track contract milestones and regulatory deadlines automatically. You stay compliant without the mental load."
    },
    {
      question: "What about property management?",
      answer: "Absolutely - AI helps with tenant communication, maintenance coordination, inspection scheduling, and owner reports. Works for agencies doing sales, property management, or both."
    },
    {
      question: "How long until I see results?",
      answer: "Most agents feel the difference in week one - listing descriptions alone save hours. By month three, you'll see measurable improvement in lead conversion and time savings."
    },
    {
      question: "Is this just for big agencies?",
      answer: "Not at all. Solo agents and small teams get the most value - you're wearing multiple hats and AI gives you back capacity. Pricing scales to your size."
    },
    {
      question: "How much does it cost?",
      answer: "Flexible pricing from $500-1200/month depending on your needs. Most agents find it pays for itself through time saved and deals not lost. Book a demo for exact pricing."
    }
  ],
  relatedIndustries: ["construction", "financial-services", "professional-services"]
}
```

### Industry 3: Recruitment & Staffing

```typescript
{
  slug: "recruitment",
  name: "Recruitment & Staffing",
  tagline: "Place more, admin less",
  displayOrder: 3,
  metadata: {
    title: "AI for Recruitment Agencies Australia | Staffing AI Solutions | JOURN3Y",
    description: "AI consulting for Australian recruiters and staffing agencies. Screen CVs faster, automate candidate communication, and keep placements moving. Place more candidates with less admin. 4-week setup.",
    keywords: ["AI for recruiters Australia", "recruitment AI software", "staffing agency automation", "AI CV screening", "recruitment automation", "candidate management AI", "Australian recruitment technology", "recruiter admin automation", "AI for staffing agencies", "placement automation"]
  },
  hero: {
    headline: "AI That Fills Roles Faster",
    subhead: "Stop drowning in CVs and admin. Start placing candidates."
  },
  painPoints: [
    {
      title: "200 CVs and 3 good candidates",
      description: "Finding needles in haystacks is literally your job, but screening takes forever when you're doing it manually."
    },
    {
      title: "Candidates get snapped up",
      description: "While you're stuck in admin, your best candidates are accepting offers from agencies that move faster."
    },
    {
      title: "Clients keep calling for updates",
      description: "Half your day is fielding \"any progress?\" calls instead of actually making progress."
    },
    {
      title: "Compliance paperwork is endless",
      description: "Right to work checks, reference forms, contracts, timesheets. The paper mountain never shrinks."
    }
  ],
  useCases: [
    {
      title: "Smart CV Screening",
      icon: "Search",
      description: "AI reads every CV against your job requirements, ranks candidates, and highlights the ones worth calling. Turn 200 applications into a shortlist of 10 in minutes.",
      benefit: "Find the gold without sifting through dirt"
    },
    {
      title: "Automated Candidate Nurturing",
      icon: "Users",
      description: "AI keeps your talent pool warm with personalised check-ins, job alerts, and engagement. When you need candidates, they're ready to move.",
      benefit: "Stop losing candidates to agencies with better follow-up"
    },
    {
      title: "Client Update Automation",
      icon: "MessageSquare",
      description: "AI generates progress reports for each role automatically. Clients get weekly updates without you writing a word.",
      benefit: "Keep clients informed without the phone tag"
    },
    {
      title: "Interview Scheduling",
      icon: "Calendar",
      description: "AI coordinates between candidates, clients, and your team. Sends invites, handles reschedules, and sends reminders. You just show up.",
      benefit: "Stop playing calendar Tetris"
    },
    {
      title: "Compliance Automation",
      icon: "ClipboardCheck",
      description: "AI tracks what paperwork is outstanding for each candidate, sends reminders, and flags issues before they block a placement.",
      benefit: "Never lose a placement to missing paperwork"
    },
    {
      title: "Timesheet & Invoice Chasing",
      icon: "DollarSign",
      description: "For temp/contract placements, AI chases missing timesheets and follows up on overdue invoices automatically.",
      benefit: "Get paid faster without the awkward calls"
    }
  ],
  resultsStatement: "Recruitment clients typically reduce time-to-place by 40%",
  faqs: [
    {
      question: "How can AI help my recruitment agency?",
      answer: "AI handles the admin that slows you down - CV screening, candidate communication, client updates, scheduling, and compliance tracking. Most recruiters we work with reduce time-to-place by 40% and stop losing candidates to faster-moving competitors."
    },
    {
      question: "Will AI replace my recruiters?",
      answer: "No - AI handles the repetitive work so your recruiters can do what humans do best: building relationships, understanding culture fit, and closing deals. It's a multiplier, not a replacement."
    },
    {
      question: "How accurate is AI CV screening?",
      answer: "Very. AI matches CVs to your specific requirements and learns from your preferences over time. It catches candidates you might have missed and filters out the noise. You always make the final call."
    },
    {
      question: "Does it integrate with my ATS?",
      answer: "We work with major ATS platforms - JobAdder, Bullhorn, PageUp, and others. Candidates flow seamlessly between systems."
    },
    {
      question: "What about candidate privacy?",
      answer: "Fully compliant with Australian privacy requirements. Candidate data is encrypted, stored in Australia, and only used for the recruitment process. We can help you update your privacy notices if needed."
    },
    {
      question: "How do you handle temp vs perm?",
      answer: "Both. The platform handles permanent placements, temp/contract with timesheet management, and temp-to-perm conversions. Different workflows for different placement types."
    },
    {
      question: "We're a specialist agency - will this work for us?",
      answer: "Yes. We configure AI to understand your industry - whether that's IT, healthcare, trades, executive, or something niche. The screening gets smarter for your specific domain."
    },
    {
      question: "How much does it cost?",
      answer: "Pricing from $800-2000/month based on team size and placement volume. One extra placement per month typically covers the investment. Book a demo for exact pricing."
    }
  ],
  relatedIndustries: ["professional-services", "healthcare", "education"]
}
```

### Industry 4: Healthcare & Allied Health

```typescript
{
  slug: "healthcare",
  name: "Healthcare & Allied Health",
  tagline: "Less paperwork, more patients",
  displayOrder: 4,
  metadata: {
    title: "AI for Healthcare Practices Australia | Allied Health AI Solutions | JOURN3Y",
    description: "AI consulting for Australian GPs, physios, dentists and allied health practices. Automate appointment reminders, clinical notes, and patient communication. See more patients with less paperwork. 4-week setup.",
    keywords: ["AI for medical practices Australia", "healthcare AI software", "GP practice automation", "physiotherapy AI", "dental practice AI", "allied health automation", "clinical notes AI", "Australian healthcare technology", "patient communication AI", "medical practice admin automation"]
  },
  hero: {
    headline: "AI That Cares About Your Time",
    subhead: "Less paperwork after hours. More time with patients during them."
  },
  painPoints: [
    {
      title: "Clinical notes eat my evenings",
      description: "You're finishing patient notes at 9pm because there's never enough time during the day."
    },
    {
      title: "No-shows are killing us",
      description: "Every empty appointment slot is lost revenue. Reminder calls take forever but actually work."
    },
    {
      title: "Patients can't get through",
      description: "Phone's always busy. Patients give up and go elsewhere."
    },
    {
      title: "Referral letters take too long",
      description: "Writing detailed referrals and follow-up letters eats into patient time."
    }
  ],
  useCases: [
    {
      title: "Smart Clinical Notes",
      icon: "FileText",
      description: "Record consultations (with consent) and AI generates structured clinical notes in your preferred format. Review, edit if needed, done. RACGP/AHPRA compliant.",
      benefit: "Finish notes before you leave the room"
    },
    {
      title: "Intelligent Appointment Reminders",
      icon: "Bell",
      description: "AI sends personalised reminders via SMS, email, or voice call based on patient preferences. Follows up on unconfirmed appointments. Reschedules no-shows automatically.",
      benefit: "Reduce no-shows by up to 40%"
    },
    {
      title: "After-Hours Patient Triage",
      icon: "Phone",
      description: "AI handles after-hours enquiries - answering common questions, booking appointments, and flagging urgent cases for immediate callback.",
      benefit: "Never miss an urgent patient, or a new booking"
    },
    {
      title: "Referral Letter Generation",
      icon: "Send",
      description: "AI drafts referral letters based on clinical notes and consultation history. Professional, detailed, ready to send in minutes.",
      benefit: "Comprehensive referrals without the typing"
    },
    {
      title: "Patient Recall Automation",
      icon: "Calendar",
      description: "AI tracks who's due for reviews, follow-ups, or preventive care. Sends personalised recall notices and books appointments automatically.",
      benefit: "Better patient outcomes, fuller books"
    },
    {
      title: "Waitlist Management",
      icon: "Users",
      description: "When cancellations happen, AI instantly contacts waitlist patients to fill the slot. No phone tag required.",
      benefit: "Turn cancellations into revenue"
    }
  ],
  resultsStatement: "Healthcare clients typically save 6-10 hours per week on admin",
  faqs: [
    {
      question: "How can AI help my healthcare practice?",
      answer: "AI handles clinical documentation, appointment management, patient communication, and recall systems. Most practitioners we work with save 6-10 hours per week - that's seeing more patients or getting home on time."
    },
    {
      question: "Is this compliant with healthcare regulations?",
      answer: "Yes. We're designed for Australian healthcare - AHPRA guidelines, Medicare requirements, privacy legislation. Clinical notes meet RACGP standards. We can help with your compliance documentation."
    },
    {
      question: "What about patient privacy?",
      answer: "Patient data stays in Australia, encrypted at rest and in transit, and is never used to train AI models. We're built on healthcare-grade infrastructure with audit trails and access controls."
    },
    {
      question: "Does it integrate with practice management software?",
      answer: "We work with Best Practice, Medical Director, Cliniko, Halaxy, and other common systems. Your existing workflows stay intact."
    },
    {
      question: "How does clinical note AI work?",
      answer: "With patient consent, you can record consultations. AI transcribes and structures the note in your preferred format - SOAP notes, specialist formats, or custom templates. You review and approve before saving."
    },
    {
      question: "Will older patients be able to use this?",
      answer: "AI adapts to patient preferences. Some will use online booking and SMS. Others get a friendly phone call reminder. You set defaults and patients can update their preferences."
    },
    {
      question: "We're a specialist practice - will this work for us?",
      answer: "Yes. We configure AI for your specialty - physio, dental, psychology, podiatry, or medical. Terminology, note formats, and workflows match your discipline."
    },
    {
      question: "How much does it cost?",
      answer: "Pricing from $600-1500/month depending on practice size and features. Most practices find it pays for itself through reduced no-shows alone. Book a demo for exact pricing."
    }
  ],
  relatedIndustries: ["professional-services", "education", "retail"]
}
```

### Industry 5: Professional Services

```typescript
{
  slug: "professional-services",
  name: "Professional Services",
  tagline: "More billable hours",
  displayOrder: 5,
  metadata: {
    title: "AI for Professional Services Australia | Accounting & Legal AI | JOURN3Y",
    description: "AI consulting for Australian accountants, lawyers, consultants and professional services firms. Automate client communication, document generation, and time tracking. Serve more clients with less overhead. 4-week setup.",
    keywords: ["AI for accountants Australia", "legal AI software", "accounting firm automation", "law firm AI", "professional services automation", "document generation AI", "Australian professional services technology", "accounting admin automation", "legal document AI", "consultant automation"]
  },
  hero: {
    headline: "AI That Bills More Hours",
    subhead: "Less admin overhead. More time for billable work."
  },
  painPoints: [
    {
      title: "Half my day isn't billable",
      description: "Admin, emails, scheduling, chasing documents. You're working 50 hours but only billing 25."
    },
    {
      title: "Document drafting takes forever",
      description: "Every advice letter, report, or contract starts from scratch. Or you're hunting for the right template."
    },
    {
      title: "Clients expect instant responses",
      description: "The expectation is 24/7 availability, but you can't be everywhere at once."
    },
    {
      title: "Collecting client information is painful",
      description: "Chasing documents, following up on forms, waiting for information to start work."
    }
  ],
  useCases: [
    {
      title: "Smart Document Generation",
      icon: "FileText",
      description: "AI drafts client documents - advice letters, reports, contracts, proposals - based on templates and previous work. You review and refine, not start from scratch.",
      benefit: "First drafts in minutes, not hours"
    },
    {
      title: "Intelligent Time Tracking",
      icon: "Clock",
      description: "AI monitors your work and suggests time entries. Catches billable time you'd otherwise forget. Review and approve - no more end-of-day time entry marathons.",
      benefit: "Capture every billable minute"
    },
    {
      title: "Client Communication Automation",
      icon: "MessageSquare",
      description: "AI handles routine enquiries, provides status updates, and escalates urgent matters. Clients feel attended to 24/7 without you working 24/7.",
      benefit: "Responsive service, sustainable workload"
    },
    {
      title: "Document Collection Portal",
      icon: "FolderOpen",
      description: "AI-powered client portal requests, collects, and organises documents you need. Automatic reminders until everything's in. No more chasing emails.",
      benefit: "Get what you need without the nagging"
    },
    {
      title: "Research Assistance",
      icon: "Search",
      description: "AI helps research client matters - summarising documents, finding precedents, extracting key information. You direct, AI assists.",
      benefit: "Research in minutes, not hours"
    },
    {
      title: "Workflow Automation",
      icon: "GitBranch",
      description: "Standard processes - new client onboarding, tax lodgement, matter progression - automated with AI handling routine steps and flagging exceptions.",
      benefit: "Consistent delivery without the checklist"
    }
  ],
  resultsStatement: "Professional services clients typically increase billable utilisation by 20%",
  faqs: [
    {
      question: "How can AI help my professional services firm?",
      answer: "AI handles non-billable admin - document drafting, time tracking, client communication, document collection, and workflow management. Most firms increase billable utilisation by 20% and improve client satisfaction with faster turnaround."
    },
    {
      question: "Will AI-generated documents meet professional standards?",
      answer: "AI creates first drafts based on your templates and previous work. You always review, refine, and approve before anything goes to clients. It accelerates your work, not replaces your judgment."
    },
    {
      question: "What about confidentiality?",
      answer: "Client data is encrypted, stored in Australia, and strictly segregated. We meet the confidentiality standards expected by accounting bodies and law societies. Your ethical obligations are our design parameters."
    },
    {
      question: "Does it integrate with our practice management software?",
      answer: "We work with common systems - Xero Practice Manager, Karbon, LEAP, Clio, Actionstep, and others. Plus email, calendar, and document management."
    },
    {
      question: "How does AI time tracking work?",
      answer: "AI monitors your activity (documents opened, emails sent, meetings attended) and suggests time entries. You review and approve - it never records automatically. Catches the 15-minute phone calls you'd otherwise forget."
    },
    {
      question: "We have multiple practice areas - does it handle that?",
      answer: "Yes. AI adapts to different workflows - tax vs audit vs advisory for accountants, or different practice areas for lawyers. Each team can have customised configurations."
    },
    {
      question: "Can it help with compliance?",
      answer: "AI tracks deadlines, sends reminders, and flags overdue items. For accountants, it integrates with lodgement deadlines. For lawyers, it tracks court dates and limitation periods."
    },
    {
      question: "How much does it cost?",
      answer: "Pricing from $500-1500/month per user depending on features. The increase in billable utilisation typically covers the investment several times over. Book a demo for exact pricing."
    }
  ],
  relatedIndustries: ["financial-services", "real-estate", "healthcare"]
}
```

### Industry 6: Retail & E-commerce

```typescript
{
  slug: "retail",
  name: "Retail & E-commerce",
  tagline: "Sell more, stress less",
  displayOrder: 6,
  metadata: {
    title: "AI for Retail & E-commerce Australia | Shop AI Solutions | JOURN3Y",
    description: "AI consulting for Australian retailers and e-commerce businesses. Automate inventory management, customer service, and product descriptions. Sell more with less operational overhead. 4-week setup.",
    keywords: ["AI for retail Australia", "e-commerce AI software", "retail automation", "inventory management AI", "customer service AI retail", "product description AI", "Australian retail technology", "shop automation", "AI for online stores", "retail admin automation"]
  },
  hero: {
    headline: "AI That Sells While You Sleep",
    subhead: "Customer service, inventory, content - running 24/7 without burning you out."
  },
  painPoints: [
    {
      title: "Customer questions never stop",
      description: "\"Is this in stock?\" \"When will it ship?\" \"Can I return this?\" Answering the same questions a hundred times a day."
    },
    {
      title: "Product descriptions take forever",
      description: "New stock arrives and you need descriptions, photos edited, listings created. The backlog never ends."
    },
    {
      title: "Inventory surprises kill us",
      description: "Overselling what you don't have. Missing sales on what you do. Manual stock counts are always wrong."
    },
    {
      title: "Keeping up with channels is impossible",
      description: "Website, marketplaces, social media, physical store. Keeping everything in sync is a nightmare."
    }
  ],
  useCases: [
    {
      title: "24/7 Customer Service Bot",
      icon: "MessageSquare",
      description: "AI answers customer questions instantly - stock availability, shipping times, return policies, product details. Escalates complex issues to humans.",
      benefit: "Happy customers at 2am without paying someone to be awake"
    },
    {
      title: "Automated Product Content",
      icon: "FileText",
      description: "AI generates product descriptions, optimises images, and creates listings for all your channels from basic product info.",
      benefit: "New products listed in minutes, not hours"
    },
    {
      title: "Smart Inventory Management",
      icon: "Package",
      description: "AI tracks stock across all channels in real-time, predicts when you'll run low, suggests reorder quantities, and prevents overselling.",
      benefit: "Never miss a sale or oversell again"
    },
    {
      title: "Multi-Channel Sync",
      icon: "RefreshCw",
      description: "Product info, pricing, and inventory stay synchronised across website, marketplaces (Amazon, eBay), and POS. Update once, publish everywhere.",
      benefit: "End the spreadsheet nightmare"
    },
    {
      title: "Customer Insights",
      icon: "BarChart",
      description: "AI analyses purchase patterns, identifies your best customers, spots trends, and suggests actions. Data-driven decisions without a data analyst.",
      benefit: "Know what's selling and why"
    },
    {
      title: "Review & Feedback Management",
      icon: "Star",
      description: "AI monitors reviews across platforms, alerts you to issues, drafts responses, and identifies product improvement opportunities.",
      benefit: "Stay on top of reputation without constantly checking"
    }
  ],
  resultsStatement: "Retail clients typically see 25% increase in customer satisfaction scores",
  faqs: [
    {
      question: "How can AI help my retail business?",
      answer: "AI handles customer service, product content, inventory management, and multi-channel operations. Most retailers we work with reduce customer service workload by 60% while improving satisfaction scores."
    },
    {
      question: "Will customers know they're talking to AI?",
      answer: "We're transparent - customers know it's AI for initial contact. But the responses are so helpful and fast, they prefer it to waiting for a human. Complex issues still go to your team."
    },
    {
      question: "Does it work for physical retail too?",
      answer: "Yes. AI helps with in-store inventory, click-and-collect, customer service kiosks, and unified commerce across physical and online."
    },
    {
      question: "What platforms do you integrate with?",
      answer: "Shopify, WooCommerce, BigCommerce, Magento for e-commerce. Amazon, eBay, Catch for marketplaces. Lightspeed, Square, Vend for POS. Plus shipping and inventory systems."
    },
    {
      question: "How does AI write product descriptions?",
      answer: "You provide basic product info - features, specs, benefits. AI generates compelling descriptions optimised for search and conversion. You review before publishing."
    },
    {
      question: "Will this help with returns?",
      answer: "Yes. AI can handle return requests, generate shipping labels, process refunds according to your policies, and identify patterns in return reasons."
    },
    {
      question: "We're a small shop - is this for us?",
      answer: "Absolutely. Small retailers get the most value - you're competing with big players who have dedicated teams for this stuff. AI levels the playing field."
    },
    {
      question: "How much does it cost?",
      answer: "Pricing from $400-1200/month based on transaction volume and channels. The efficiency gains and reduced customer service costs typically deliver clear ROI. Book a demo for exact pricing."
    }
  ],
  relatedIndustries: ["hospitality", "manufacturing", "healthcare"]
}
```

### Industry 7: Education & Training

```typescript
{
  slug: "education",
  name: "Education & Training",
  tagline: "Teach more, admin less",
  displayOrder: 7,
  metadata: {
    title: "AI for Education & Training Australia | RTOs & Tutoring AI | JOURN3Y",
    description: "AI consulting for Australian RTOs, tutoring businesses, and training providers. Automate enrolments, student communication, and course administration. Focus on teaching, not paperwork. 4-week setup.",
    keywords: ["AI for RTOs Australia", "education AI software", "training provider automation", "tutoring business AI", "student management AI", "enrolment automation", "Australian education technology", "RTO compliance AI", "course administration AI", "education admin automation"]
  },
  hero: {
    headline: "AI That Handles the Admin",
    subhead: "Spend time teaching. Let AI handle enrolments, compliance, and communication."
  },
  painPoints: [
    {
      title: "Enrolments are chaos",
      description: "Forms, payments, prerequisites, USIs, AVETMISS reporting. Getting students enrolled shouldn't require a PhD in admin."
    },
    {
      title: "Students disappear mid-course",
      description: "You don't notice they've stopped attending until it's too late to re-engage them."
    },
    {
      title: "Compliance is overwhelming",
      description: "ASQA audits, AVETMISS reporting, qualification updates. Keeping up feels impossible."
    },
    {
      title: "Answering enquiries takes all day",
      description: "\"What courses do you offer?\" \"How much is it?\" \"When does it start?\" Same questions, over and over."
    }
  ],
  useCases: [
    {
      title: "Streamlined Enrolment",
      icon: "UserPlus",
      description: "AI-powered enrolment handles forms, validates prerequisites, collects payment, verifies USIs, and generates compliant documentation automatically.",
      benefit: "Enrolments that handle themselves"
    },
    {
      title: "Student Engagement Monitoring",
      icon: "Activity",
      description: "AI tracks engagement - attendance, assignment submissions, portal logins. Flags at-risk students early so you can intervene before they drop out.",
      benefit: "Save students before you lose them"
    },
    {
      title: "Compliance Automation",
      icon: "ClipboardCheck",
      description: "AI generates AVETMISS data, tracks qualification currency, maintains evidence portfolios, and prepares audit documentation.",
      benefit: "Audit-ready without the panic"
    },
    {
      title: "Intelligent Enquiry Handling",
      icon: "MessageSquare",
      description: "AI answers prospective student questions 24/7 - course info, fees, schedules, entry requirements. Books consultations with your team for serious enquiries.",
      benefit: "Convert more enquiries without answering each one"
    },
    {
      title: "Automated Progress Updates",
      icon: "Send",
      description: "AI sends students (and employers/parents where appropriate) regular progress updates. Reminders for upcoming assessments, celebrations for completions.",
      benefit: "Keep everyone informed automatically"
    },
    {
      title: "Course Feedback & Improvement",
      icon: "ThumbsUp",
      description: "AI collects and analyses student feedback, identifies trends, and suggests course improvements. Continuous improvement without spreadsheet analysis.",
      benefit: "Better courses, better outcomes"
    }
  ],
  resultsStatement: "Education clients typically reduce enrolment admin time by 70%",
  faqs: [
    {
      question: "How can AI help my training organisation?",
      answer: "AI handles enrolment processing, student communication, compliance documentation, and enquiry management. Most RTOs reduce admin time by 70% and see improved student retention through earlier intervention."
    },
    {
      question: "Will this help with ASQA compliance?",
      answer: "Yes. AI maintains documentation, generates AVETMISS-compliant data, tracks trainer qualifications and industry currency, and keeps evidence portfolios organised. You're always audit-ready."
    },
    {
      question: "Does it integrate with our student management system?",
      answer: "We work with common systems - aXcelerate, VETtrak, Wisenet, and others. Plus integrations with your LMS, payment gateways, and communication tools."
    },
    {
      question: "How does student engagement monitoring work?",
      answer: "AI aggregates data from multiple touchpoints - LMS logins, attendance, assignment submissions, email opens. When patterns suggest a student is disengaging, you're alerted early enough to act."
    },
    {
      question: "Can it handle enquiries about multiple courses?",
      answer: "Absolutely. AI knows your entire course catalogue, entry requirements, fees, and schedules. Handles enquiries for everything from short courses to full qualifications."
    },
    {
      question: "What about fee-help and VET student loans?",
      answer: "AI can explain eligibility, help with applications, and track compliance requirements. Integration with the VSL system depends on your SMS capabilities."
    },
    {
      question: "We do corporate training - does this work for us?",
      answer: "Yes. AI handles corporate enquiries, custom quote generation, group enrolments, progress reporting to employers, and completion certification."
    },
    {
      question: "How much does it cost?",
      answer: "Pricing from $500-1500/month based on student numbers and features. The admin time saved typically frees up multiple hours per week - often equivalent to a part-time staff member. Book a demo for exact pricing."
    }
  ],
  relatedIndustries: ["recruitment", "professional-services", "healthcare"]
}
```

### Industry 8: Financial Services

```typescript
{
  slug: "financial-services",
  name: "Financial Services",
  tagline: "Compliant without the burden",
  displayOrder: 8,
  metadata: {
    title: "AI for Financial Advisers Australia | Mortgage Broker AI | JOURN3Y",
    description: "AI consulting for Australian financial planners, mortgage brokers, and insurance advisers. Automate client onboarding, compliance documentation, and review preparation. Serve more clients while staying compliant. 4-week setup.",
    keywords: ["AI for financial advisers Australia", "mortgage broker AI software", "financial planning automation", "AFSL compliance AI", "client onboarding AI", "SOA generation AI", "Australian fintech", "financial services automation", "insurance broker AI", "advice documentation AI"]
  },
  hero: {
    headline: "AI That Keeps You Compliant",
    subhead: "More clients, better documentation, less risk. All without the admin burden."
  },
  painPoints: [
    {
      title: "Compliance documentation takes forever",
      description: "SOAs, ROAs, file notes, fee disclosure. The paperwork to give advice takes longer than giving the advice."
    },
    {
      title: "Client reviews are always behind",
      description: "You're supposed to do annual reviews but actually doing them for every client? Impossible."
    },
    {
      title: "Onboarding new clients is painful",
      description: "Fact finds, identity verification, risk profiles. Getting everything you need takes weeks."
    },
    {
      title: "ASIC audits terrify me",
      description: "You think your documentation is good, but there's always that nagging doubt."
    }
  ],
  useCases: [
    {
      title: "Smart SOA Generation",
      icon: "FileText",
      description: "AI drafts SOAs and ROAs based on client data and your advice. Compliant structure, personalised content, ready for your review. Hours of work in minutes.",
      benefit: "Compliant documents in a fraction of the time"
    },
    {
      title: "Automated Client Reviews",
      icon: "Calendar",
      description: "AI prepares review documents, identifies changes in circumstances, suggests discussion points, and schedules the meeting. Annual reviews actually happen.",
      benefit: "Every client reviewed, every year"
    },
    {
      title: "Digital Onboarding Portal",
      icon: "UserPlus",
      description: "AI-powered onboarding collects fact find data, verifies identity, assesses risk profile, and organises documentation. Clients do it on their own time.",
      benefit: "Complete client files before the first meeting"
    },
    {
      title: "Compliance File Audits",
      icon: "ClipboardCheck",
      description: "AI reviews client files against compliance requirements, identifies gaps, and suggests remediation. Know your issues before ASIC does.",
      benefit: "Sleep better before audits"
    },
    {
      title: "Fee Disclosure Automation",
      icon: "DollarSign",
      description: "AI tracks fee consent requirements, generates disclosure documents, and manages opt-in renewals. Stay compliant with fee rules automatically.",
      benefit: "Never miss a fee disclosure deadline"
    },
    {
      title: "Client Communication Tracking",
      icon: "MessageSquare",
      description: "AI logs all client interactions, summarises conversations, and flags required follow-ups. Complete audit trail without manual note-taking.",
      benefit: "Perfect records without the effort"
    }
  ],
  resultsStatement: "Financial services clients typically reduce documentation time by 60%",
  faqs: [
    {
      question: "How can AI help my financial services business?",
      answer: "AI handles documentation - SOAs, ROAs, file notes, fee disclosures, review preparation. Most advisers reduce documentation time by 60% while improving compliance quality."
    },
    {
      question: "Will AI-generated documents pass ASIC review?",
      answer: "AI creates drafts following compliant structures and your practice's templates. You review and approve everything. The documentation quality typically improves because AI doesn't skip sections or forget requirements."
    },
    {
      question: "How does this work with my AFSL obligations?",
      answer: "We're designed around AFSL compliance requirements. AI understands best interest duty documentation, SOA requirements, fee disclosure rules, and record-keeping obligations."
    },
    {
      question: "Does it integrate with financial planning software?",
      answer: "We work with common platforms - Xplan, Midwinter, Advice Intelligence, Morningstar, and others. Plus CRMs, portfolio platforms, and document management."
    },
    {
      question: "What about mortgage broking?",
      answer: "Yes. AI handles loan application preparation, lender comparison documentation, compliance notes, and client communication throughout the settlement process."
    },
    {
      question: "How does AI handle sensitive financial data?",
      answer: "Bank-grade security. Data encrypted, stored in Australia, access controlled and audited. We meet the security expectations of major licensees."
    },
    {
      question: "Can it help with client segmentation?",
      answer: "Yes. AI analyses your client base, identifies service levels, flags clients due for reviews, and helps prioritise your time on high-value relationships."
    },
    {
      question: "How much does it cost?",
      answer: "Pricing from $600-1800/month per adviser depending on features. The documentation time saved typically equates to multiple hours per week - time you can spend with clients or winning new business. Book a demo for exact pricing."
    }
  ],
  relatedIndustries: ["professional-services", "real-estate", "insurance"]
}
```

### Industry 9: Hospitality & Food

```typescript
{
  slug: "hospitality",
  name: "Hospitality & Food",
  tagline: "Smoother service, less chaos",
  displayOrder: 9,
  metadata: {
    title: "AI for Restaurants & Cafes Australia | Hospitality AI Solutions | JOURN3Y",
    description: "AI consulting for Australian restaurants, cafes, and hospitality businesses. Automate reservations, customer service, inventory, and staff scheduling. Run smoother service with less chaos. 4-week setup.",
    keywords: ["AI for restaurants Australia", "hospitality AI software", "cafe automation", "restaurant reservation AI", "food service automation", "hospitality customer service AI", "Australian hospitality technology", "restaurant inventory AI", "hospitality staff scheduling AI", "food business automation"]
  },
  hero: {
    headline: "AI That Runs a Smooth Service",
    subhead: "Reservations, rosters, inventory - handled. So you can focus on the food and the customers."
  },
  painPoints: [
    {
      title: "The phone never stops",
      description: "Reservation calls during prep, during service, during clean-up. Someone's always calling."
    },
    {
      title: "Rostering is a nightmare",
      description: "Availability changes, sick calls, award rates, fatigue management. Sunday nights spent on next week's roster."
    },
    {
      title: "We always run out of something",
      description: "Inventory management by gut feel means 86ing items mid-service and over-ordering on others."
    },
    {
      title: "No-shows kill our margins",
      description: "Empty tables that should be full. Revenue you can't get back."
    }
  ],
  useCases: [
    {
      title: "24/7 Booking Management",
      icon: "Phone",
      description: "AI handles reservation calls, online bookings, and enquiries around the clock. Manages the waitlist, handles changes, and fills cancellations automatically.",
      benefit: "Never miss a booking because you were slammed"
    },
    {
      title: "Smart Rostering",
      icon: "Calendar",
      description: "AI builds rosters based on predicted demand, staff availability, award requirements, and budget. Handles shift swaps and sick calls automatically.",
      benefit: "Rosters done in minutes, not hours"
    },
    {
      title: "Intelligent Inventory",
      icon: "Package",
      description: "AI tracks stock levels, predicts what you'll need based on bookings and history, and generates orders. Never 86 popular items again.",
      benefit: "Right stock levels without the guesswork"
    },
    {
      title: "No-Show Prevention",
      icon: "Bell",
      description: "AI sends booking reminders, confirms attendance, takes deposits where appropriate, and fills cancellations from the waitlist automatically.",
      benefit: "Fewer empty tables, more revenue"
    },
    {
      title: "Customer Feedback Loop",
      icon: "Star",
      description: "AI collects feedback after visits, monitors reviews, alerts you to issues, and drafts responses. Catch problems before they hit TripAdvisor.",
      benefit: "Fix issues before they become public"
    },
    {
      title: "Menu Performance Analysis",
      icon: "BarChart",
      description: "AI analyses what sells, what doesn't, profit margins by dish, and suggests menu optimisations. Data-driven menu decisions.",
      benefit: "Know exactly what's making you money"
    }
  ],
  resultsStatement: "Hospitality clients typically reduce no-shows by 35% and save 5+ hours per week on rostering",
  faqs: [
    {
      question: "How can AI help my restaurant or cafe?",
      answer: "AI handles reservations, rostering, inventory management, and customer communication. Most venues reduce no-shows by 35% and save hours on admin every week."
    },
    {
      question: "Can it handle phone reservations?",
      answer: "Yes. AI can take calls, make bookings, answer common questions, and handle changes. Callers talk to AI and most can't tell the difference. Complex requests transfer to your team."
    },
    {
      question: "How does AI rostering handle award complexity?",
      answer: "AI knows hospitality awards - casual vs permanent rates, penalties, overtime, split shifts, youth rates. Builds compliant rosters that optimise for both coverage and cost."
    },
    {
      question: "Does it integrate with our POS?",
      answer: "We work with common systems - Lightspeed, Square, Kounta, Revel, and others. Plus reservation platforms like ResDiary, SevenRooms, and OpenTable."
    },
    {
      question: "What about multiple venues?",
      answer: "Perfect for groups. Manage inventory, rostering, and performance across venues from one dashboard. Move staff between venues as needed."
    },
    {
      question: "How does inventory prediction work?",
      answer: "AI analyses your sales history, current bookings, day of week patterns, even weather and events. Suggests order quantities with impressive accuracy."
    },
    {
      question: "Will my staff be able to use it?",
      answer: "It's designed for hospitality - simple interfaces, mobile-friendly, and we train your team. Works in the chaos of a busy service."
    },
    {
      question: "How much does it cost?",
      answer: "Pricing from $400-1200/month depending on venue size and features. The reduction in no-shows and rostering efficiency typically delivers clear ROI. Book a demo for exact pricing."
    }
  ],
  relatedIndustries: ["retail", "education", "healthcare"]
}
```

### Industry 10: Manufacturing & Logistics

```typescript
{
  slug: "manufacturing",
  name: "Manufacturing & Logistics",
  tagline: "Fewer delays, less waste",
  displayOrder: 10,
  metadata: {
    title: "AI for Manufacturing & Logistics Australia | Supply Chain AI | JOURN3Y",
    description: "AI consulting for Australian manufacturers and logistics businesses. Automate production scheduling, inventory management, and quality control. Produce more with less waste and delay. 4-week setup.",
    keywords: ["AI for manufacturing Australia", "logistics AI software", "production scheduling AI", "supply chain automation", "warehouse AI", "inventory management AI", "Australian manufacturing technology", "quality control AI", "logistics automation", "manufacturing admin automation"]
  },
  hero: {
    headline: "AI That Keeps Production Moving",
    subhead: "Fewer delays, less waste, better visibility. Production running like clockwork."
  },
  painPoints: [
    {
      title: "We're always waiting on something",
      description: "Materials, approvals, information from suppliers. Production delays cascade through everything."
    },
    {
      title: "Inventory is either too much or not enough",
      description: "Dead stock ties up cash. Stockouts stop production. Finding the balance is impossible."
    },
    {
      title: "Quality issues catch us late",
      description: "Problems discovered at final inspection mean rework, waste, and unhappy customers."
    },
    {
      title: "We can't see what's happening",
      description: "Production status, inventory levels, order progress. Getting a clear picture requires a dozen spreadsheets."
    }
  ],
  useCases: [
    {
      title: "Smart Production Scheduling",
      icon: "Calendar",
      description: "AI schedules production runs based on orders, materials availability, machine capacity, and staff. Optimises for efficiency and delivery dates.",
      benefit: "Realistic schedules that actually work"
    },
    {
      title: "Predictive Inventory",
      icon: "Package",
      description: "AI forecasts material needs based on orders and production schedules. Generates purchase orders, manages safety stock, reduces carrying costs.",
      benefit: "Right materials, right time, right quantity"
    },
    {
      title: "Early Quality Detection",
      icon: "AlertCircle",
      description: "AI monitors production data to identify quality issues early - before they become defects. Catch problems at the source.",
      benefit: "Fix issues before they multiply"
    },
    {
      title: "Real-Time Visibility",
      icon: "Eye",
      description: "AI aggregates data from across operations into clear dashboards. Know exactly where every order is, what's in stock, what's coming.",
      benefit: "One source of truth for everything"
    },
    {
      title: "Supplier Communication",
      icon: "Truck",
      description: "AI manages supplier relationships - tracks orders, chases deliveries, handles ASNs, and flags delays early.",
      benefit: "Know about problems before they hit the floor"
    },
    {
      title: "Maintenance Prediction",
      icon: "Wrench",
      description: "AI monitors equipment performance and predicts maintenance needs. Schedule downtime instead of experiencing breakdowns.",
      benefit: "Prevent problems, don't react to them"
    }
  ],
  resultsStatement: "Manufacturing clients typically reduce production delays by 30% and inventory costs by 15%",
  faqs: [
    {
      question: "How can AI help my manufacturing business?",
      answer: "AI handles production scheduling, inventory management, quality monitoring, and supplier coordination. Most manufacturers reduce delays by 30% and cut inventory costs by 15%."
    },
    {
      question: "Will this integrate with our existing systems?",
      answer: "We work with common ERP and MRP systems - SAP, MYOB Advanced, NetSuite, Fishbowl, and others. Plus machine interfaces, barcode systems, and warehouse management."
    },
    {
      question: "How does quality prediction work?",
      answer: "AI analyses production data - temperatures, speeds, pressures, timings - to identify patterns that precede quality issues. Alerts operators before defects occur."
    },
    {
      question: "What about different production types?",
      answer: "Works for discrete manufacturing, process manufacturing, make-to-order, make-to-stock. We configure AI for your specific production model."
    },
    {
      question: "Can it handle our supply chain complexity?",
      answer: "Yes. AI manages multiple suppliers, tracks lead times, handles partial shipments, and optimises safety stock across your entire supply chain."
    },
    {
      question: "How does this help with traceability?",
      answer: "AI maintains complete batch/lot traceability - raw materials to finished goods. Essential for recalls, compliance, and quality investigations."
    },
    {
      question: "We're a small operation - is this overkill?",
      answer: "Not at all. Small manufacturers often gain the most - you don't have systems and staff to do this manually. AI provides enterprise capability at SMB pricing."
    },
    {
      question: "How much does it cost?",
      answer: "Pricing from $800-2000/month depending on complexity and integration needs. The reduction in delays, inventory costs, and quality issues typically delivers significant ROI. Book a demo for exact pricing."
    }
  ],
  relatedIndustries: ["construction", "retail", "logistics"]
}
```

---

## Part 8: File Structure Summary

After implementation, the project should have:

```
/src/app/
  smb/
    page.tsx                      # Landing page with industry selector
    [industry]/
      page.tsx                    # Dynamic industry page
  admin/
    login/
      page.tsx                    # Admin login
    smb/
      page.tsx                    # Industry list
      [slug]/
        page.tsx                  # Edit industry
      new/
        page.tsx                  # Create industry
  api/
    match-industry/
      route.ts                    # LLM industry matching

/src/components/
  smb/
    IndustrySelector.tsx          # Grid of industry cards
    IndustryCard.tsx              # Single industry card
    SmartMatcher.tsx              # "Don't see your industry" input
    IndustryHero.tsx              # Industry page hero section
    PainPointsSection.tsx         # Pain points grid
    UseCasesSection.tsx           # Use cases list
    FAQSection.tsx                # Accordion FAQs with schema
    RelatedIndustries.tsx         # Related industry links
    HowItWorks.tsx                # 4-step process
    StatsBar.tsx                  # Social proof stats
  admin/
    AdminLayout.tsx               # Admin shell
    IndustryList.tsx              # Sortable industry list
    IndustryForm.tsx              # Main edit form
    PainPointEditor.tsx           # CRUD for pain points
    UseCaseEditor.tsx             # CRUD for use cases
    FAQEditor.tsx                 # CRUD for FAQs
    ImageUploader.tsx             # Drag-drop image upload
    IconPicker.tsx                # Lucide icon selector
    CharacterCounter.tsx          # SEO field counter
    StatusToggle.tsx              # Draft/Active toggle

/src/lib/
  smb.ts                          # Data fetching functions
  schemas.ts                      # Schema.org generators

/scripts/
  seed-smb-industries.ts          # Initial data seeding
```

---

## Part 9: Testing Checklist

Before considering complete:

### Public Pages
- [ ] `/smb` renders all active industries from Supabase
- [ ] Industry cards link correctly to `/smb/[slug]`
- [ ] Smart matcher returns appropriate results
- [ ] Each industry page renders full content server-side (test with `curl`)
- [ ] All metadata is unique and correct per industry
- [ ] FAQ schema validates at validator.schema.org
- [ ] Service schema validates
- [ ] Breadcrumb schema validates
- [ ] Related industries link correctly
- [ ] CTAs link to /contact with appropriate params
- [ ] Pages are responsive (mobile, tablet, desktop)
- [ ] Matches existing site design language

### Admin Pages
- [ ] Only whitelisted emails can access /admin/*
- [ ] Industry list shows all industries (active and draft)
- [ ] Drag-to-reorder works and persists
- [ ] Status toggle works and persists
- [ ] Edit form loads existing data correctly
- [ ] All fields save correctly
- [ ] Image upload works to Supabase Storage
- [ ] Icon picker shows Lucide icons
- [ ] Pain points CRUD works with reorder
- [ ] Use cases CRUD works with reorder
- [ ] FAQs CRUD works with reorder
- [ ] Preview opens public page
- [ ] New industry creation works
- [ ] Delete industry works (with confirmation)

### Data
- [ ] Seed script runs without errors
- [ ] All 10 industries seeded correctly
- [ ] All pain points, use cases, FAQs populated
- [ ] Placeholder images accessible

---

## Part 10: Design Notes

### Match Existing Site
- Review homepage and existing product pages for:
  - Font sizes and weights
  - Color palette (check Tailwind config)
  - Button styles
  - Card styles
  - Spacing patterns
  - Animation/hover effects

### Component Library
- Use shadcn/ui components where possible:
  - Accordion (for FAQs)
  - Button
  - Card
  - Input
  - Label
  - Select
  - Tabs (admin)
  - Dialog (admin modals)
  - Toast (admin feedback)

### Icons
- Use Lucide React consistently
- Icon size in cards: 24-32px
- Icon size in use cases: 20-24px
- Create IconPicker component showing common business icons

### Images
- Hero images: 16:9 aspect ratio, 1200x675px recommended
- Use Next.js Image component with proper sizing
- Implement blur placeholder for loading states
- Default to gradient/abstract placeholder if no image set

---

End of specification. Build this incrementally:
1. Database tables first
2. Seed script and run it
3. Public pages (read-only, fetch from Supabase)
4. Admin authentication
5. Admin CRUD functionality
6. Polish and testing
