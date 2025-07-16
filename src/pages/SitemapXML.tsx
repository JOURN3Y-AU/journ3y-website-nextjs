import { useEffect } from 'react';

const SitemapXML = () => {
  useEffect(() => {
    // Set the content type to XML
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.journ3y.com.au/</loc>
    <lastmod>2025-01-16</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.journ3y.com.au/products/blueprint</loc>
    <lastmod>2025-01-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.journ3y.com.au/products/glean</loc>
    <lastmod>2025-01-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.journ3y.com.au/products/brand3y</loc>
    <lastmod>2025-01-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.journ3y.com.au/products/services</loc>
    <lastmod>2025-01-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.journ3y.com.au/products/ai-assessment</loc>
    <lastmod>2025-01-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.journ3y.com.au/products/ai-assessment-full</loc>
    <lastmod>2025-01-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.journ3y.com.au/blog</loc>
    <lastmod>2025-01-16</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.journ3y.com.au/contact</loc>
    <lastmod>2025-01-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.journ3y.com.au/team</loc>
    <lastmod>2025-01-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://www.journ3y.com.au/resources</loc>
    <lastmod>2025-01-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://www.journ3y.com.au/privacy</loc>
    <lastmod>2025-01-16</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>`;

    // Replace the page content with XML
    document.open();
    document.write(sitemapContent);
    document.close();
    
    // Set the title for better UX
    document.title = 'Sitemap';
  }, []);

  // Return just the XML content as text
  return (
    <pre style={{ 
      fontFamily: 'monospace', 
      whiteSpace: 'pre-wrap',
      margin: 0,
      padding: '20px',
      backgroundColor: '#f5f5f5'
    }}>
{`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.journ3y.com.au/</loc>
    <lastmod>2025-01-16</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.journ3y.com.au/products/blueprint</loc>
    <lastmod>2025-01-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.journ3y.com.au/products/glean</loc>
    <lastmod>2025-01-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.journ3y.com.au/products/brand3y</loc>
    <lastmod>2025-01-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.journ3y.com.au/products/services</loc>
    <lastmod>2025-01-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.journ3y.com.au/products/ai-assessment</loc>
    <lastmod>2025-01-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.journ3y.com.au/products/ai-assessment-full</loc>
    <lastmod>2025-01-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.journ3y.com.au/blog</loc>
    <lastmod>2025-01-16</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.journ3y.com.au/contact</loc>
    <lastmod>2025-01-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.journ3y.com.au/team</loc>
    <lastmod>2025-01-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://www.journ3y.com.au/resources</loc>
    <lastmod>2025-01-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://www.journ3y.com.au/privacy</loc>
    <lastmod>2025-01-16</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>`}
    </pre>
  );
};

export default SitemapXML;