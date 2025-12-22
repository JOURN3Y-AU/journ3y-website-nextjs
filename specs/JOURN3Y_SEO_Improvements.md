# JOURN3Y Website SEO & AI Discoverability Improvements

## Overview

This document contains specific improvements needed for each page on journ3y.com.au to improve AI search discoverability (ChatGPT, Claude, Perplexity) and traditional SEO. The focus is on Small Business AI positioning.

**Priority Levels:**
- 🔴 CRITICAL - Page is broken or severely impacting discoverability
- 🟠 HIGH - Major improvements needed
- 🟡 MEDIUM - Important optimizations
- 🟢 LOW - Nice to have

---

## 🔴 CRITICAL ISSUES - Fix First

### Three pages are serving a generic fallback instead of their actual content:

1. **`/products/services`** - Shows generic "Glean Implementation Partner" fallback
2. **`/team`** - Shows same generic fallback (should show team members)
3. **`/blog/journ3y-partners-with-glean`** - Shows same generic fallback

**Diagnosis:** These pages are likely failing to render their actual React components and falling back to a catch-all or error page. Check:
- Route configuration in Next.js app router
- Data fetching errors (Supabase queries failing?)
- Component import errors
- Check if these pages have `page.tsx` files in the correct locations

**Action Required:**
1. Debug why these three routes are not rendering their intended components
2. Ensure each route has proper error boundaries
3. Test SSR output with `curl` after fixing

---

## Homepage (`/`)

**Current Title:** "JOURN3Y - AI Consulting & Glean Implementation Experts"

### 🟠 HIGH Priority Changes

1. **Update meta title to target SMB:**
   ```
   Current: "JOURN3Y - AI Consulting & Glean Implementation Experts"
   New: "AI Consulting Australia | Small Business AI Solutions | JOURN3Y"
   ```

2. **Add meta description (missing or not rendering):**
   ```html
   <meta name="description" content="Australia's AI consulting experts for small business and enterprise. Get practical AI solutions that save 10+ hours per week. Glean implementation partner. 4-week deployment." />
   ```

3. **Fix typos:**
   - "relavance" → "relevance" (in "Focus on relavance" section)
   - "delivery AI" → "deliver AI" (in Services card: "to delivery AI into your organisation")

4. **Add Organization schema:**
   ```json
   {
     "@context": "https://schema.org",
     "@type": "Organization",
     "name": "JOURN3Y",
     "alternateName": "Journey AI",
     "url": "https://www.journ3y.com.au",
     "logo": "https://www.journ3y.com.au/JOURN3Y-logo.svg",
     "description": "AI consulting and implementation for Australian businesses",
     "address": {
       "@type": "PostalAddress",
       "addressLocality": "Sydney",
       "addressRegion": "NSW",
       "postalCode": "2000",
       "addressCountry": "AU"
     },
     "sameAs": [
       "https://www.linkedin.com/company/journ3y-au"
     ],
     "areaServed": {
       "@type": "Country",
       "name": "Australia"
     }
   }
   ```

5. **Improve hero section for AI discoverability:**
   - Add more specific keywords visible to crawlers
   - Current: "JOURN3Y delivers bold business visions with AI that drives real impact."
   - Consider adding a subtitle that mentions "Australia" and "small business"

### 🟡 MEDIUM Priority Changes

6. **Add prominent SMB section to homepage:**
   - Add a dedicated section highlighting Small Business AI
   - Link prominently to `/small-business-ai`
   - Include some industry icons/cards on homepage

7. **Add LocalBusiness schema for local SEO:**
   ```json
   {
     "@context": "https://schema.org",
     "@type": "LocalBusiness",
     "name": "JOURN3Y",
     "@id": "https://www.journ3y.com.au",
     "url": "https://www.journ3y.com.au",
     "telephone": "+61-XXX-XXX-XXX",
     "address": {
       "@type": "PostalAddress",
       "streetAddress": "",
       "addressLocality": "Sydney",
       "addressRegion": "NSW",
       "postalCode": "2000",
       "addressCountry": "AU"
     },
     "geo": {
       "@type": "GeoCoordinates",
       "latitude": -33.8688,
       "longitude": 151.2093
     },
     "openingHoursSpecification": {
       "@type": "OpeningHoursSpecification",
       "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
       "opens": "09:00",
       "closes": "17:00"
     }
   }
   ```

---

## Products Pages

### `/products/glean`

**Current Title:** "Glean Implementation Services | Expert Glean Consultants | JOURN3Y"

### 🟡 MEDIUM Priority Changes

1. **Update meta title to include Australia:**
   ```
   New: "Glean Implementation Partner Australia | Enterprise AI Search | JOURN3Y"
   ```

2. **Add/improve meta description:**
   ```
   "Official Glean implementation partner in Australia. Deploy enterprise AI search in 4 weeks. 100+ integrations, SOC 2 compliant. Sydney, Melbourne, Brisbane."
   ```

3. **Add Service schema:**
   ```json
   {
     "@context": "https://schema.org",
     "@type": "Service",
     "name": "Glean Implementation Services",
     "provider": {
       "@type": "Organization",
       "name": "JOURN3Y"
     },
     "description": "Enterprise AI search implementation with Glean platform",
     "areaServed": {
       "@type": "Country",
       "name": "Australia"
     },
     "serviceType": "AI Implementation Consulting"
   }
   ```

4. **Add city-specific keywords** in content where natural:
   - "serving businesses across Sydney, Melbourne, Brisbane, Perth, and Adelaide"

---

### `/products/blueprint`

**Current Title:** "AI Strategy Blueprint | Enterprise AI Consulting | JOURN3Y"

### 🟡 MEDIUM Priority Changes

1. **Update meta title:**
   ```
   New: "AI Strategy Blueprint | Enterprise AI Roadmap Australia | JOURN3Y"
   ```

2. **Add meta description:**
   ```
   "Transform AI ambition into action. JOURN3Y Blueprint delivers prioritised AI implementation roadmaps for Australian businesses. Strategy workshops to executable plans in weeks."
   ```

3. **Fix typo:** "prioiritised" → "prioritised" in hero section

4. **Add testimonial schema** for the success story quote:
   ```json
   {
     "@context": "https://schema.org",
     "@type": "Review",
     "reviewBody": "JOURN3Y's AI Blueprint process helped us identify multiple high-impact AI opportunities...",
     "author": {
       "@type": "Person",
       "name": "CEO"
     },
     "itemReviewed": {
       "@type": "Service",
       "name": "JOURN3Y Blueprint"
     }
   }
   ```

---

### `/products/services` 🔴 CRITICAL

**Status:** BROKEN - Showing generic fallback page

**Required Actions:**
1. Fix the route - page is not rendering correctly
2. Once fixed, ensure proper meta title: "AI Consulting Services Australia | Implementation & Support | JOURN3Y"
3. Add meta description about the range of services offered
4. This page should showcase ALL services, not just Glean

---

## Small Business AI Section

### `/small-business-ai`

**Current Title:** "AI Solutions for Small Business Australia | Industry-Specific AI | JOURN3Y"

### 🟢 Good - Minor Improvements

1. **Add BreadcrumbList schema:**
   ```json
   {
     "@context": "https://schema.org",
     "@type": "BreadcrumbList",
     "itemListElement": [
       {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.journ3y.com.au"},
       {"@type": "ListItem", "position": 2, "name": "Small Business AI", "item": "https://www.journ3y.com.au/small-business-ai"}
     ]
   }
   ```

2. **Add ItemList schema for industries:**
   ```json
   {
     "@context": "https://schema.org",
     "@type": "ItemList",
     "name": "AI Solutions by Industry",
     "itemListElement": [
       {"@type": "ListItem", "position": 1, "name": "Construction & Trades", "url": "https://www.journ3y.com.au/small-business-ai/construction"},
       // ... all 10 industries
     ]
   }
   ```

---

### All Industry Pages (`/small-business-ai/[industry]`)

Pages checked: construction, real-estate, recruitment, healthcare, professional-services, retail, education, financial-services, hospitality, manufacturing

**Current Status:** ✅ All rendering correctly with good meta titles

### 🟠 HIGH Priority - FAQ Answers Not Visible

**Issue:** FAQ questions are visible in HTML but answers appear to be client-side rendered (accordion). This means AI crawlers cannot see the FAQ answers.

**Fix Required:**
1. Ensure FAQ answers are rendered in the HTML even when accordion is collapsed
2. Use CSS to hide them visually if needed, but they MUST be in the HTML
3. Example fix:
   ```jsx
   // BAD - Answer only renders when open
   {isOpen && <p>{faq.answer}</p>}
   
   // GOOD - Answer always in HTML, CSS controls visibility
   <p className={isOpen ? 'block' : 'sr-only'}>{faq.answer}</p>
   ```

### 🟠 HIGH Priority - Add Schema Markup

Add to each industry page:

1. **FAQPage Schema** (CRITICAL for AI visibility):
   ```json
   {
     "@context": "https://schema.org",
     "@type": "FAQPage",
     "mainEntity": [
       {
         "@type": "Question",
         "name": "How can AI help my construction business?",
         "acceptedAnswer": {
           "@type": "Answer",
           "text": "AI handles the admin that's eating your time - quoting, documentation, subcontractor coordination, cash flow tracking, and client communication. Most builders we work with get back 8-12 hours per week..."
         }
       }
       // Include ALL 8 FAQs with full answers
     ]
   }
   ```

2. **Service Schema:**
   ```json
   {
     "@context": "https://schema.org",
     "@type": "Service",
     "name": "AI Solutions for Construction & Trades",
     "provider": {
       "@type": "Organization",
       "name": "JOURN3Y",
       "url": "https://www.journ3y.com.au"
     },
     "description": "AI consulting for Australian builders, tradies and construction businesses...",
     "areaServed": {"@type": "Country", "name": "Australia"},
     "serviceType": "AI Consulting"
   }
   ```

3. **BreadcrumbList Schema:**
   ```json
   {
     "@context": "https://schema.org",
     "@type": "BreadcrumbList",
     "itemListElement": [
       {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.journ3y.com.au"},
       {"@type": "ListItem", "position": 2, "name": "Small Business AI", "item": "https://www.journ3y.com.au/small-business-ai"},
       {"@type": "ListItem", "position": 3, "name": "Construction & Trades", "item": "https://www.journ3y.com.au/small-business-ai/construction"}
     ]
   }
   ```

### 🟡 MEDIUM Priority Improvements

4. **Add more specific Australia keywords** in content:
   - Reference Australian regulations (AHPRA for healthcare, ASQA for education, ASIC for financial services)
   - Mention Australian cities
   - Reference Australian business tools (MYOB, Xero, etc.)

5. **Add industry-specific integrations** to each page:
   - Construction: Buildxact, Procore, ServiceM8
   - Real Estate: Rex, Agentbox, VaultRE
   - Healthcare: Best Practice, Medical Director, Cliniko
   - etc.

---

## Blog Section

### `/blog` (Index)

**Current Title:** "AI & Glean Insights Blog | JOURN3Y AI Consulting"

### 🟡 MEDIUM Priority Changes

1. **Update meta title:**
   ```
   New: "AI Insights Blog | Small Business AI Tips | JOURN3Y Australia"
   ```

2. **Add meta description:**
   ```
   "Practical AI insights for Australian businesses. Learn about AI implementation, automation, and digital transformation from JOURN3Y's consulting experts."
   ```

3. **Add Blog schema:**
   ```json
   {
     "@context": "https://schema.org",
     "@type": "Blog",
     "name": "JOURN3Y AI Insights",
     "description": "AI consulting insights for Australian businesses",
     "url": "https://www.journ3y.com.au/blog",
     "publisher": {
       "@type": "Organization",
       "name": "JOURN3Y"
     }
   }
   ```

---

### `/blog/journ3y-partners-with-glean` 🔴 CRITICAL

**Status:** BROKEN - Showing generic fallback page

**Required Actions:**
1. Debug why this specific blog post is not rendering
2. Check if the slug in Supabase matches the URL
3. Once fixed, ensure proper rendering of the actual blog content

---

### Other Blog Posts (Working Correctly)

Pages checked: vibe-coding-our-website, mcp-why-you-should-be-interested, why-prompting-is-your-new-superpower, digital-transformation-roadmap, strategic-ai-applications

### 🟡 MEDIUM Priority - Add to ALL blog posts:

1. **Article Schema:**
   ```json
   {
     "@context": "https://schema.org",
     "@type": "Article",
     "headline": "[Post Title]",
     "description": "[First 160 chars of content]",
     "image": "[Featured image URL]",
     "author": {
       "@type": "Person",
       "name": "Kevin Morrell",
       "url": "https://www.journ3y.com.au/team"
     },
     "publisher": {
       "@type": "Organization",
       "name": "JOURN3Y",
       "logo": {
         "@type": "ImageObject",
         "url": "https://www.journ3y.com.au/JOURN3Y-logo.svg"
       }
     },
     "datePublished": "[ISO date]",
     "dateModified": "[ISO date]"
   }
   ```

2. **Add author bylines** visible in HTML:
   - "By Kevin Morrell, Partner at JOURN3Y" or similar
   - Links to author's team profile

3. **Improve meta descriptions** for each post (unique, 150-160 chars)

4. **`/blog/digital-transformation-roadmap`** - Content is very thin (~200 words). Consider:
   - Expanding with more detailed content
   - Or redirecting to a more comprehensive post
   - This is the weakest content piece

---

## Other Pages

### `/contact`

**Current Title:** "Contact Us | AI Consulting & Glean Implementation | JOURN3Y"

### 🟠 HIGH Priority Changes

1. **Page is very thin** - only shows email and location, no form visible in SSR output

2. **Add more contact information visible to crawlers:**
   - Phone number
   - Full address
   - Business hours
   - Contact form should render (or at least placeholder text)

3. **Add ContactPage schema:**
   ```json
   {
     "@context": "https://schema.org",
     "@type": "ContactPage",
     "name": "Contact JOURN3Y",
     "description": "Get in touch with JOURN3Y for AI consulting and implementation services",
     "url": "https://www.journ3y.com.au/contact",
     "mainEntity": {
       "@type": "Organization",
       "name": "JOURN3Y",
       "email": "info@journ3y.com.au",
       "address": {
         "@type": "PostalAddress",
         "addressLocality": "Sydney",
         "addressRegion": "NSW",
         "addressCountry": "AU"
       }
     }
   }
   ```

4. **Update meta description:**
   ```
   "Contact JOURN3Y for AI consulting in Australia. Book a free demo, discuss your AI strategy, or learn about Glean implementation. Sydney-based, serving all of Australia."
   ```

---

### `/team` 🔴 CRITICAL

**Status:** BROKEN - Showing generic fallback page instead of team members

**Required Actions:**
1. Debug why this page is not rendering team members
2. Previously this page WAS working (we verified it earlier)
3. Check if something broke during recent deployments
4. Once fixed, add:
   - Person schema for each team member
   - Proper meta title: "Our Team | AI Consulting Experts | JOURN3Y Australia"
   - Meta description with team member names

---

### `/privacy`

**Current Title:** "Privacy Policy | JOURN3Y"

### 🟢 LOW Priority - Looks Good

Content is comprehensive and renders correctly. Minor improvement:

1. Add a "Last updated" date visible in meta or early in content
2. Consider adding legal/compliance schema if needed

---

## Global Improvements

### 1. Create/Update robots.txt

Ensure `/robots.txt` exists and is properly configured:
```
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: Anthropic-AI
Allow: /

Sitemap: https://www.journ3y.com.au/sitemap.xml
```

### 2. Create/Update XML Sitemap

Ensure `/sitemap.xml` exists with all pages:
- Include all industry pages
- Include all blog posts
- Include proper lastmod dates
- Include priority hints (homepage = 1.0, industries = 0.8, blogs = 0.6)

### 3. Add Canonical URLs

Ensure every page has a canonical URL tag:
```html
<link rel="canonical" href="https://www.journ3y.com.au/[current-path]" />
```

### 4. Ensure Open Graph Tags

Every page should have:
```html
<meta property="og:title" content="[Page Title]" />
<meta property="og:description" content="[Description]" />
<meta property="og:url" content="https://www.journ3y.com.au/[path]" />
<meta property="og:type" content="website" />
<meta property="og:image" content="[Featured image or default]" />
<meta property="og:site_name" content="JOURN3Y" />
<meta property="og:locale" content="en_AU" />
```

### 5. Add Twitter Card Tags

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="[Title]" />
<meta name="twitter:description" content="[Description]" />
<meta name="twitter:image" content="[Image]" />
```

---

## Summary Checklist

### 🔴 CRITICAL (Fix Immediately)
- [ ] Fix `/products/services` - currently broken
- [ ] Fix `/team` - currently broken
- [ ] Fix `/blog/journ3y-partners-with-glean` - currently broken

### 🟠 HIGH Priority
- [ ] Render FAQ answers in HTML on all industry pages
- [ ] Add FAQPage schema to all 10 industry pages
- [ ] Add Service schema to all industry pages
- [ ] Fix homepage typos ("relavance", "delivery")
- [ ] Update homepage meta title/description for SMB focus
- [ ] Add more content to /contact page

### 🟡 MEDIUM Priority
- [ ] Add Organization schema to homepage
- [ ] Add Article schema to all blog posts
- [ ] Add author bylines to blog posts
- [ ] Add BreadcrumbList schema to all pages
- [ ] Update meta titles/descriptions across all product pages
- [ ] Create/verify robots.txt with AI crawler permissions
- [ ] Create/verify sitemap.xml

### 🟢 LOW Priority
- [ ] Add LocalBusiness schema
- [ ] Add Open Graph tags to all pages
- [ ] Add Twitter Card tags to all pages
- [ ] Expand thin content on /blog/digital-transformation-roadmap
- [ ] Add city-specific content where relevant

---

## Testing After Changes

After implementing changes, verify each page with:

```bash
# Test SSR rendering
curl -s https://www.journ3y.com.au/[page] | head -200

# Check for schema markup
curl -s https://www.journ3y.com.au/[page] | grep -A 50 "application/ld+json"

# Validate schema at
# https://validator.schema.org/
# https://search.google.com/test/rich-results
```

Test AI visibility by asking ChatGPT/Claude:
- "Who can help my construction business with AI in Australia?"
- "Best AI consultants for small business in Sydney"
- "Glean implementation partner Australia"
