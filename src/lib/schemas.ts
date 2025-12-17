import type { SMBIndustryWithDetails, SMBFAQ } from '@/types/smb'

// Generate FAQ Schema for SEO
export function generateFAQSchema(faqs: SMBFAQ[]) {
  if (!faqs || faqs.length === 0) return null

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }
}

// Generate Service Schema for SEO
export function generateServiceSchema(industry: SMBIndustryWithDetails) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `AI Solutions for ${industry.name}`,
    "description": industry.metadata_description || `AI consulting and automation services for ${industry.name} businesses in Australia`,
    "provider": {
      "@type": "Organization",
      "name": "JOURN3Y",
      "url": "https://www.journ3y.com.au",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "AU"
      }
    },
    "areaServed": {
      "@type": "Country",
      "name": "Australia"
    },
    "serviceType": [
      "AI Consulting",
      "Business Automation",
      `${industry.name} AI Solutions`
    ]
  }
}

// Generate Breadcrumb Schema for SEO
export function generateBreadcrumbSchema(industry: SMBIndustryWithDetails) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.journ3y.com.au"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Small Business",
        "item": "https://www.journ3y.com.au/smb"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": industry.name,
        "item": `https://www.journ3y.com.au/smb/${industry.slug}`
      }
    ]
  }
}

// Generate Organization Schema
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "JOURN3Y",
    "url": "https://www.journ3y.com.au",
    "logo": "https://www.journ3y.com.au/logo.png",
    "description": "AI consulting and implementation services for Australian small businesses",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "AU"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "sales",
      "url": "https://www.journ3y.com.au/contact"
    }
  }
}
