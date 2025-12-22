'use client'

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const PageSpecificSEO = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Remove any existing page-specific SEO content
    const existingNoscript = document.getElementById('page-specific-noscript');
    const existingStructuredData = document.getElementById('page-specific-structured-data');
    
    if (existingNoscript) {
      existingNoscript.remove();
    }
    if (existingStructuredData) {
      existingStructuredData.remove();
    }

    // Add Glean-specific SEO content only for the Glean page
    if (pathname === '/products/glean') {
      // Add noscript content for search engines
      const noscriptElement = document.createElement('noscript');
      noscriptElement.id = 'page-specific-noscript';
      noscriptElement.innerHTML = `
        <main itemscope itemtype="https://schema.org/Organization">
          <header>
            <h1 itemprop="name">Glean Implementation Partner Australia - JOURN3Y</h1>
            <p itemprop="description">Australia's certified Glean partner providing enterprise search implementation, AI-powered workplace search deployment, and ongoing support services across Sydney, Melbourne, Brisbane, and nationwide.</p>
          </header>
          
          <section>
            <h2>Expert Glean Enterprise Search Implementation Services</h2>
            <p>JOURN3Y specializes in Glean implementation for Australian enterprises, helping organizations unlock the power of AI-driven workplace search. Our certified consultants ensure seamless deployment, user adoption, and ongoing optimization of your Glean platform.</p>
            
            <h3>Comprehensive Glean Services</h3>
            <ul>
              <li><strong>Glean Implementation & Deployment:</strong> Full-service setup including connectors, indexing, and configuration</li>
              <li><strong>Enterprise Search Consulting:</strong> Strategic planning for optimal search experiences</li>
              <li><strong>Training & User Adoption:</strong> Comprehensive training programs and change management</li>
              <li><strong>Ongoing Support & Optimization:</strong> 24/7 support and continuous performance improvements</li>
              <li><strong>Integration Services:</strong> Connect Glean with your existing enterprise systems</li>
              <li><strong>Security & Compliance:</strong> Ensure data governance and regulatory compliance</li>
            </ul>
            
            <h3>Why Choose JOURN3Y as Your Glean Partner?</h3>
            <div>
              <h4>🏆 Certified Expertise</h4>
              <p>Official Glean implementation partner with certified consultants and proven methodologies.</p>
              
              <h4>🇦🇺 Local Australian Support</h4>
              <p>Based in Australia with deep understanding of local business requirements and compliance needs.</p>
              
              <h4>📈 Proven Track Record</h4>
              <p>Successfully implemented Glean for dozens of Australian enterprises across various industries.</p>
              
              <h4>🔧 End-to-End Service</h4>
              <p>From initial consultation to ongoing support, we handle every aspect of your Glean journey.</p>
            </div>
            
            <h3>Glean Platform Benefits</h3>
            <ul>
              <li><strong>AI-Powered Search:</strong> Find information instantly across all your enterprise applications</li>
              <li><strong>Universal Knowledge Graph:</strong> Connect data from 100+ enterprise applications</li>
              <li><strong>Contextual Results:</strong> Personalized search results based on user context and permissions</li>
              <li><strong>Enterprise Security:</strong> Bank-grade security with role-based access controls</li>
              <li><strong>Easy Integration:</strong> Quick setup with pre-built connectors for popular enterprise tools</li>
            </ul>
            
            <h3>Industries We Serve</h3>
            <p>Our Glean implementation expertise spans across multiple industries including:</p>
            <ul>
              <li>Financial Services & Banking</li>
              <li>Healthcare & Life Sciences</li>
              <li>Technology & Software</li>
              <li>Manufacturing & Engineering</li>
              <li>Professional Services</li>
              <li>Government & Public Sector</li>
            </ul>
            
            <h3>Get Started with Glean Today</h3>
            <p>Ready to transform your enterprise search experience? Contact JOURN3Y for a personalized Glean demo and implementation consultation.</p>
            
            <div itemscope itemtype="https://schema.org/ContactPoint">
              <p><strong>Contact Information:</strong></p>
              <p>📧 Email: <span itemprop="email">info@journ3y.com.au</span></p>
              <p>📞 Phone: <span itemprop="telephone">+61 (0)2 1234 5678</span></p>
              <p>🏢 Locations: <span itemprop="areaServed">Sydney, Melbourne, Brisbane, Perth, Adelaide</span></p>
            </div>
          </section>
          
          <footer>
            <p>© 2024 JOURN3Y - Australia's leading Glean implementation partner. All rights reserved.</p>
          </footer>
        </main>
      `;
      
      // Add structured data for search engines
      const structuredDataElement = document.createElement('script');
      structuredDataElement.id = 'page-specific-structured-data';
      structuredDataElement.type = 'application/ld+json';
      structuredDataElement.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "JOURN3Y",
        "description": "Australia's certified Glean implementation partner providing enterprise search solutions",
        "url": "https://www.journ3y.com.au/products/glean",
        "logo": "https://www.journ3y.com.au/JOURN3Y-logo.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+61-2-1234-5678",
          "contactType": "sales",
          "areaServed": "AU",
          "availableLanguage": "English"
        },
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "AU",
          "addressRegion": "NSW"
        },
        "sameAs": [
          "https://www.linkedin.com/company/journ3y"
        ],
        "offers": {
          "@type": "Service",
          "name": "Glean Implementation Services",
          "description": "Professional Glean enterprise search implementation, consulting, and support services",
          "provider": {
            "@type": "Organization",
            "name": "JOURN3Y"
          },
          "areaServed": "Australia"
        }
      });

      // Append to document body
      document.body.appendChild(noscriptElement);
      document.head.appendChild(structuredDataElement);
    }

    // Cleanup function
    return () => {
      const noscriptToRemove = document.getElementById('page-specific-noscript');
      const structuredDataToRemove = document.getElementById('page-specific-structured-data');
      
      if (noscriptToRemove) {
        noscriptToRemove.remove();
      }
      if (structuredDataToRemove) {
        structuredDataToRemove.remove();
      }
    };
  }, [pathname]);

  return null;
};

export default PageSpecificSEO;