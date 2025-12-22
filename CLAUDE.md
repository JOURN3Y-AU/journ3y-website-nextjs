# JOURN3Y Website - Claude Code Guidelines

This is a Next.js 14+ App Router project for JOURN3Y, an AI consulting firm specializing in Glean enterprise search implementation.

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS + shadcn/ui components
- **Backend**: Supabase (auth, database, storage, edge functions)
- **Typography**: Manrope font family
- **Analytics**: Google Analytics 4, LinkedIn Insight, Meta Pixel

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (main)/            # Pages with navbar/footer
│   ├── (landing)/         # Standalone landing pages (no nav)
│   ├── admin/             # Protected admin pages
│   └── api/               # API routes
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Navbar, Footer
│   ├── home/             # Homepage sections
│   ├── admin/            # Admin components
│   └── ...
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and configurations
│   └── supabase/         # Supabase client (server & client)
└── integrations/          # External integrations
```

## Design System

### Brand Colors

The JOURN3Y brand uses a purple-to-blue gradient palette:

```css
/* Primary Brand Colors */
journey-purple: #9b87f5     /* Main brand purple */
journey-dark-purple: #6E59A5 /* Darker purple for hover/emphasis */
journey-blue: #33C3F0        /* Accent blue */
journey-dark-blue: #0EA5E9   /* Darker blue */

/* Neutrals */
journey-gray: #8E9196
journey-light-gray: #f3f3f3
journey-dark-gray: #222222
```

### CSS Variables (HSL)

```css
--primary: 255 70% 74%;     /* Purple */
--secondary: 225 70% 60%;   /* Blue */
--accent: 262 83% 58%;      /* Accent purple */
--background: 0 0% 100%;    /* White */
--foreground: 222.2 84% 4.9%; /* Dark text */
--muted-foreground: 215.4 16.3% 46.9%; /* Gray text */
```

### Typography

- **Font Family**: Manrope (sans-serif)
- **Headings**: font-bold, tracking-tight
- **Body**: Regular weight, tracking-tight on body

```tsx
// Heading examples
<h1 className="text-5xl font-bold tracking-tight">...</h1>
<h2 className="text-4xl font-bold tracking-tight">...</h2>
<h3 className="text-2xl font-semibold tracking-tight">...</h3>

// Body text
<p className="text-xl text-gray-700">...</p>
<p className="text-lg text-muted-foreground">...</p>
```

### Common Gradients

```tsx
// Primary gradient (purple to blue)
className="bg-gradient-to-r from-journey-purple to-journey-blue"

// Text gradient
className="bg-clip-text text-transparent bg-gradient-to-r from-journey-purple to-journey-blue"

// Section backgrounds
className="bg-gradient-to-br from-journey-purple/5 to-journey-blue/5"
className="bg-gradient-to-r from-primary/20 via-secondary/10 to-accent/20"
```

### Buttons

```tsx
// Primary CTA button
<Button className="bg-gradient-to-r from-journey-purple to-journey-blue text-white py-6 px-8 text-lg">
  Get Started
</Button>

// Secondary/Glean button
<Button className="bg-gradient-to-r from-lime-400 to-lime-300 text-blue-600 py-6 px-8 text-lg font-semibold">
  Get Glean
</Button>

// Outline button
<Button variant="outline" className="border-journey-purple text-journey-purple hover:bg-journey-purple/10">
  Learn More
</Button>

// White button on colored background
<Button className="bg-white text-journey-purple hover:bg-gray-100">
  Contact Us
</Button>
```

### Cards

```tsx
<Card className="overflow-hidden hover:shadow-md transition-shadow">
  <CardContent className="p-6">
    {/* Content */}
  </CardContent>
</Card>
```

### Section Layouts

```tsx
// Standard section with container
<section className="py-24">
  <div className="container mx-auto px-4">
    {/* Content */}
  </div>
</section>

// Hero section
<section className="relative min-h-screen flex items-center pt-16">
  <div className="container mx-auto px-4">
    {/* Content */}
  </div>
</section>

// CTA section with gradient background
<section className="py-24 bg-gradient-to-r from-journey-purple to-journey-blue text-white">
  <div className="container mx-auto px-4 text-center">
    {/* Content */}
  </div>
</section>
```

### Scroll Reveal Animations

```tsx
import useScrollReveal from '@/hooks/useScrollReveal'

const MyComponent = () => {
  const sectionRef = useScrollReveal()

  return (
    <div ref={sectionRef} className="reveal transition-all duration-500 ease-out">
      {/* Content animates in on scroll */}
    </div>
  )
}
```

### Grid Layouts

```tsx
// 3-column grid
<div className="grid md:grid-cols-3 gap-8">
  {/* Cards */}
</div>

// 2-column grid with image
<div className="grid lg:grid-cols-2 gap-12 items-center">
  <div>{/* Content */}</div>
  <div>{/* Image */}</div>
</div>
```

## Component Patterns

### Page Structure (Server Component + Client Component)

For pages that need SEO metadata AND client-side interactivity:

```tsx
// page.tsx (Server Component)
import { Metadata } from 'next'
import PageClient from './PageClient'

export const metadata: Metadata = {
  title: 'Page Title | JOURN3Y',
  description: '...',
  openGraph: { ... },
}

export default function Page() {
  return <PageClient />
}

// PageClient.tsx (Client Component)
'use client'

import { useState, useEffect } from 'react'
// ... component with interactivity
```

### Supabase Usage

```tsx
// Client-side (hooks, event handlers)
import { supabase } from '@/lib/supabase/client'

// Server-side (page.tsx, API routes)
import { createClient } from '@/lib/supabase/server'
const supabase = await createClient()
```

### Link Usage

```tsx
import Link from 'next/link'

<Link href="/contact">Contact Us</Link>
<Link href={`/blog/${slug}`}>Read More</Link>
```

### Router Usage

```tsx
'use client'
import { useRouter } from 'next/navigation'

const router = useRouter()
router.push('/destination')
```

## Icons

Using Lucide React icons:

```tsx
import { ArrowRight, CheckCircle, Users, Clock } from 'lucide-react'

<ArrowRight className="w-5 h-5" />
<CheckCircle className="w-6 h-6 text-journey-purple" />
```

## Forms

```tsx
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

<form onSubmit={handleSubmit} className="space-y-4">
  <div>
    <Label htmlFor="name">Full Name *</Label>
    <Input
      id="name"
      name="name"
      type="text"
      required
      value={formData.name}
      onChange={handleInputChange}
      className="mt-1"
    />
  </div>
  <Button type="submit" disabled={isSubmitting}>
    {isSubmitting ? 'Submitting...' : 'Submit'}
  </Button>
</form>
```

## Metadata Pattern

```tsx
export const metadata: Metadata = {
  title: 'Page Title | JOURN3Y',
  description: 'Page description for SEO',
  keywords: ['keyword1', 'keyword2'],
  openGraph: {
    title: 'Page Title | JOURN3Y',
    description: 'Description for social sharing',
    url: 'https://journ3y.com.au/page-path',
    siteName: 'JOURN3Y',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Page Title | JOURN3Y',
    description: 'Twitter description',
  },
  alternates: {
    canonical: 'https://journ3y.com.au/page-path',
  },
  robots: {
    index: true,
    follow: true,
  },
}
```

## Important Conventions

1. **Always use 'use client'** for components with:
   - useState, useEffect, useRef
   - Event handlers (onClick, onSubmit, etc.)
   - Browser APIs (window, document)
   - Next.js client hooks (useRouter, useSearchParams, usePathname)

2. **Keep server components** for:
   - Static content
   - Metadata exports
   - Data fetching with async/await

3. **Supabase paths**:
   - Client: `@/lib/supabase/client`
   - Server: `@/lib/supabase/server`

4. **Link attributes**:
   - Use `href` not `to` (Next.js Link, not React Router)

5. **Image optimization**:
   - Use Next.js Image component for internal images
   - External images need domains in next.config.js

## Testing Locally

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint
```

## Deployment

Deployed on Vercel. Push to main branch triggers automatic deployment.

Live site: https://www.journ3y.com.au

## Site Structure

### Navigation Pages
- `/` - Homepage
- `/products/blueprint` - AI Readiness Blueprint
- `/products/glean` - Glean Enterprise Search
- `/products/services` - Consulting Services
- `/small-business-ai` - Small Business AI Landing Page
- `/small-business-ai/[industry]` - Industry-specific pages (10 industries)
- `/blog` - Blog listing
- `/blog/[slug]` - Individual blog posts
- `/contact` - Contact form
- `/team` - Team page (conditionally shown via Supabase setting)

### Small Business AI Industries (Database-driven)
Content stored in Supabase tables: `smb_industries`, `smb_pain_points`, `smb_use_cases`, `smb_faqs`

Industries:
- construction, real-estate, recruitment, healthcare, professional-services
- retail, education, financial-services, hospitality, manufacturing

### Sitemap
Static sitemap at `/public/sitemap.xml` - 25 pages total
Update manually when adding/removing pages

### SEO & Schema Markup
- All pages have Next.js Metadata exports
- Industry pages include FAQ, Service, and Breadcrumb schema (see `src/lib/schemas.ts`)
- Canonical URLs use `https://www.journ3y.com.au`

## Database (Supabase)

### Key Tables
- `site_settings` - Feature flags (e.g., show_team_page)
- `smb_industries` - Industry landing page content
- `smb_pain_points` - Pain points per industry
- `smb_use_cases` - Solutions/use cases per industry
- `smb_faqs` - FAQs per industry
- `blog_posts` - Blog content
- `contact_submissions` - Form submissions

### Admin
Protected admin pages at `/admin/*` for managing SMB content
