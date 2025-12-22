import { useEffect } from 'react';

export interface MetaTagsConfig {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  structuredData?: object;
}

const DEFAULT_META = {
  title: "JOURN3Y - AI Consulting & Glean Implementation Experts",
  description: "Leading AI consulting firm specializing in Glean enterprise search, AI strategy, and business transformation. Expert implementation of Glean, AI readiness assessments, and strategic AI consulting services.",
  keywords: "AI consulting, Glean implementation, enterprise search, AI strategy, business transformation, AI readiness assessment, Glean consultant, AI transformation",
  ogTitle: "JOURN3Y - AI Consulting & Glean Implementation Experts",
  ogDescription: "Leading AI consulting firm specializing in Glean enterprise search, AI strategy, and business transformation. Expert implementation of Glean, AI readiness assessments, and strategic AI consulting services.",
  ogImage: "https://www.journ3y.com.au/JOURN3Y-logo.png",
  ogUrl: "https://www.journ3y.com.au",
  twitterCard: "summary_large_image",
  twitterTitle: "JOURN3Y - AI Consulting & Glean Implementation Experts",
  twitterDescription: "Leading AI consulting firm specializing in Glean enterprise search, AI strategy, and business transformation.",
  twitterImage: "https://www.journ3y.com.au/JOURN3Y-logo.png"
};

export const useMetaTags = (config: MetaTagsConfig = {}) => {
  useEffect(() => {
    const metaConfig = { ...DEFAULT_META, ...config };
    
    // Update document title
    if (metaConfig.title) {
      document.title = metaConfig.title;
    }
    
    // Helper function to update or create meta tag
    const updateMetaTag = (selector: string, content: string) => {
      let tag = document.querySelector(selector) as HTMLMetaElement;
      if (tag) {
        tag.content = content;
      } else {
        tag = document.createElement('meta');
        const isProperty = selector.includes('property=');
        if (isProperty) {
          tag.setAttribute('property', selector.match(/property="([^"]*)"/)![1]);
        } else {
          tag.setAttribute('name', selector.match(/name="([^"]*)"/)![1]);
        }
        tag.content = content;
        document.head.appendChild(tag);
      }
    };
    
    // Update all meta tags
    updateMetaTag('meta[name="description"]', metaConfig.description);
    updateMetaTag('meta[name="keywords"]', metaConfig.keywords);
    
    // Update canonical link
    if (metaConfig.canonical) {
      let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (canonicalTag) {
        canonicalTag.href = metaConfig.canonical;
      } else {
        canonicalTag = document.createElement('link');
        canonicalTag.rel = 'canonical';
        canonicalTag.href = metaConfig.canonical;
        document.head.appendChild(canonicalTag);
      }
    }
    
    // Open Graph tags
    updateMetaTag('meta[property="og:title"]', metaConfig.ogTitle);
    updateMetaTag('meta[property="og:description"]', metaConfig.ogDescription);
    updateMetaTag('meta[property="og:image"]', metaConfig.ogImage);
    updateMetaTag('meta[property="og:url"]', metaConfig.ogUrl);
    
    // Twitter Card tags
    updateMetaTag('meta[name="twitter:card"]', metaConfig.twitterCard);
    updateMetaTag('meta[name="twitter:title"]', metaConfig.twitterTitle);
    updateMetaTag('meta[name="twitter:description"]', metaConfig.twitterDescription);
    updateMetaTag('meta[name="twitter:image"]', metaConfig.twitterImage);
    
    // Handle structured data (JSON-LD)
    if (metaConfig.structuredData) {
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        existingScript.textContent = JSON.stringify(metaConfig.structuredData);
      } else {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(metaConfig.structuredData);
        document.head.appendChild(script);
      }
    }
    
    // Cleanup function to remove structured data when component unmounts
    return () => {
      if (metaConfig.structuredData) {
        const script = document.querySelector('script[type="application/ld+json"]');
        if (script) {
          script.remove();
        }
      }
    };
    
  }, [config]);
};

// Predefined meta configurations for different pages
export const META_CONFIGS = {
  home: {
    title: "JOURN3Y - AI Consulting & Glean Implementation Experts",
    description: "Leading AI consulting firm specializing in Glean enterprise search implementation, AI strategy development, and business transformation. Expert Glean consultants delivering AI readiness assessments and strategic AI solutions.",
    keywords: "AI consulting, Glean implementation, Glean consultant, enterprise search, AI strategy, business transformation, AI readiness assessment, Glean experts, AI transformation services",
    canonical: "https://www.journ3y.com.au/",
    ogTitle: "JOURN3Y - AI Consulting & Glean Implementation Experts",
    ogDescription: "Leading AI consulting firm specializing in Glean enterprise search implementation, AI strategy development, and business transformation.",
    ogUrl: "https://www.journ3y.com.au"
  },
  
  blog: {
    title: "AI & Glean Insights Blog | JOURN3Y AI Consulting",
    description: "Expert insights on AI consulting, Glean implementation best practices, enterprise search optimization, and AI transformation strategies from leading AI consultants and Glean specialists.",
    keywords: "AI blog, Glean insights, AI consulting tips, enterprise search best practices, Glean implementation guide, AI transformation insights, Glean consultant advice",
    canonical: "https://www.journ3y.com.au/blog",
    ogTitle: "AI & Glean Insights Blog | JOURN3Y AI Consulting",
    ogDescription: "Expert insights on AI consulting, Glean implementation, and enterprise search optimization from leading AI consultants.",
    ogUrl: "https://www.journ3y.com.au/blog"
  },
  
  contact: {
    title: "Contact JOURN3Y - AI Consulting & Glean Implementation Services",
    description: "Get in touch with JOURN3Y's expert AI consultants and Glean implementation specialists. Schedule a consultation for AI strategy, Glean deployment, or enterprise search optimization.",
    keywords: "contact AI consultant, Glean implementation consultation, AI strategy consultation, enterprise search consultant, Glean expert contact, AI transformation consultation",
    canonical: "https://www.journ3y.com.au/contact",
    ogTitle: "Contact JOURN3Y - AI Consulting & Glean Implementation Services",
    ogDescription: "Get in touch with expert AI consultants and Glean implementation specialists for your enterprise AI transformation.",
    ogUrl: "https://www.journ3y.com.au/contact"
  },
  
  team: {
    title: "Meet Our AI & Glean Experts | JOURN3Y Consulting Team",
    description: "Meet JOURN3Y's team of expert AI consultants and certified Glean implementation specialists. Our experienced team delivers world-class AI strategy and Glean enterprise search solutions.",
    keywords: "AI consulting team, Glean experts, AI consultants, Glean implementation specialists, AI strategy experts, enterprise search consultants, Glean certified consultants",
    canonical: "https://www.journ3y.com.au/team",
    ogTitle: "Meet Our AI & Glean Experts | JOURN3Y Consulting Team",
    ogDescription: "Meet our team of expert AI consultants and certified Glean implementation specialists delivering world-class AI solutions.",
    ogUrl: "https://www.journ3y.com.au/team"
  },
  
  gleanProduct: {
    title: "Glean Implementation Services | Expert Glean Consultants | JOURN3Y",
    description: "Professional Glean implementation and optimization services from certified Glean consultants. Transform your enterprise search with expert Glean deployment, configuration, and ongoing support.",
    keywords: "Glean implementation, Glean consultant, Glean services, enterprise search, Glean deployment, Glean optimization, Glean configuration, Glean support, Glean experts",
    canonical: "https://www.journ3y.com.au/products/glean",
    ogTitle: "Glean Implementation Services | Expert Glean Consultants | JOURN3Y",
    ogDescription: "Professional Glean implementation and optimization services from certified Glean consultants. Transform your enterprise search capabilities.",
    ogUrl: "https://www.journ3y.com.au/products/glean",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Glean Implementation and Support Services",
      "description": "Professional Glean enterprise search implementation, training, and ongoing support services for Australian businesses",
      "provider": {
        "@type": "Organization",
        "name": "JOURN3Y",
        "url": "https://www.journ3y.com.au",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "AU"
        }
      },
      "areaServed": [
        {
          "@type": "Country",
          "name": "Australia"
        },
        {
          "@type": "City", 
          "name": "Sydney"
        },
        {
          "@type": "City",
          "name": "Melbourne"
        },
        {
          "@type": "City",
          "name": "Brisbane"
        }
      ],
      "serviceType": [
        "Enterprise Search Implementation",
        "Glean Installation",
        "Software Implementation",
        "AI Workplace Solutions"
      ],
      "offers": {
        "@type": "Offer",
        "description": "Glean implementation and support services"
      }
    }
  },
  
  aiAssessment: {
    title: "AI Readiness Assessment | Free AI Strategy Evaluation | JOURN3Y",
    description: "Take our comprehensive AI readiness assessment to evaluate your organization's AI maturity. Get expert insights from AI consultants and personalized recommendations for AI transformation including Glean implementation.",
    keywords: "AI readiness assessment, AI maturity assessment, AI strategy evaluation, AI consulting assessment, free AI assessment, AI transformation readiness, Glean readiness assessment",
    canonical: "https://www.journ3y.com.au/products/ai-assessment",
    ogTitle: "AI Readiness Assessment | Free AI Strategy Evaluation | JOURN3Y",
    ogDescription: "Comprehensive AI readiness assessment with expert insights and personalized recommendations for AI transformation.",
    ogUrl: "https://www.journ3y.com.au/products/ai-assessment"
  },
  
  services: {
    title: "AI Consulting Services | Glean Implementation | JOURN3Y",
    description: "Comprehensive AI consulting services including Glean implementation, AI strategy development, enterprise search optimization, and AI transformation consulting from certified experts.",
    keywords: "AI consulting services, Glean implementation services, AI strategy consulting, enterprise search consulting, AI transformation services, Glean consultant services",
    canonical: "https://www.journ3y.com.au/products/services",
    ogTitle: "AI Consulting Services | Glean Implementation | JOURN3Y",
    ogDescription: "Comprehensive AI consulting services including Glean implementation, AI strategy development, and enterprise search optimization.",
    ogUrl: "https://www.journ3y.com.au/products/services"
  },

  blueprint: {
    title: "AI Strategy Blueprint | Enterprise AI Consulting | JOURN3Y",
    description: "Comprehensive AI strategy development and roadmap creation from expert AI consultants. Get a personalized AI transformation blueprint including Glean implementation planning.",
    keywords: "AI strategy, AI blueprint, AI transformation roadmap, AI consulting, strategic AI planning, enterprise AI strategy, AI implementation planning, Glean strategy",
    canonical: "https://www.journ3y.com.au/products/blueprint",
    ogTitle: "AI Strategy Blueprint | Enterprise AI Consulting | JOURN3Y",
    ogDescription: "Comprehensive AI strategy development and roadmap creation from expert AI consultants and Glean specialists.",
    ogUrl: "https://www.journ3y.com.au/products/blueprint"
  },

  accelerators: {
    title: "AI Accelerators & Solutions | Glean & Databricks | JOURN3Y",
    description: "Rapid AI implementation with our accelerator solutions including Glean enterprise search deployment, Databricks optimization, and custom AI acceleration frameworks.",
    keywords: "AI accelerators, Glean accelerator, Databricks consulting, rapid AI deployment, AI implementation solutions, enterprise AI accelerators, Glean deployment accelerator",
    canonical: "https://www.journ3y.com.au/products/accelerators",
    ogTitle: "AI Accelerators & Solutions | Glean & Databricks | JOURN3Y",
    ogDescription: "Rapid AI implementation with accelerator solutions including Glean deployment and Databricks optimization.",
    ogUrl: "https://www.journ3y.com.au/products/accelerators"
  },

  brand3y: {
    title: "Brand3y AI Platform | Next-Gen AI Solutions | JOURN3Y",
    description: "Discover Brand3y, our cutting-edge AI platform for enterprise transformation. Advanced AI capabilities integrated with Glean enterprise search for comprehensive business intelligence.",
    keywords: "Brand3y, AI platform, enterprise AI, AI transformation platform, advanced AI solutions, AI business intelligence, Glean integration, enterprise AI platform",
    canonical: "https://www.journ3y.com.au/products/brand3y",
    ogTitle: "Brand3y AI Platform | Next-Gen AI Solutions | JOURN3Y",
    ogDescription: "Cutting-edge AI platform for enterprise transformation with advanced AI capabilities and Glean integration.",
    ogUrl: "https://www.journ3y.com.au/products/brand3y"
  },

  smallBusiness: {
    title: 'AI Solutions for Small Business | Real Estate, Construction, Recruitment | JOURN3Y',
    description: 'AI-powered productivity solutions for small businesses. Managed AI platform for Teams with industry-specific configuration for Real Estate, Construction, and Recruitment.',
    keywords: 'AI for small business, AI platform for Teams, real estate AI, construction AI, recruitment AI, business automation, productivity tools',
    canonical: 'https://www.journ3y.com.au/products/small-business',
    ogTitle: 'AI Solutions for Small Business | JOURN3Y',
    ogDescription: 'Transform your small business with AI-powered productivity solutions. Industry-specific AI platform for Teams implementation.',
    ogUrl: 'https://www.journ3y.com.au/products/small-business',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "AI Solutions for Small Business",
      "description": "Managed AI platform for Teams with industry-specific configuration for small businesses",
      "serviceType": ["Real Estate AI", "Construction AI", "Recruitment AI"],
      "provider": {
        "@type": "Organization",
        "name": "JOURN3Y"
      }
    }
  }
};