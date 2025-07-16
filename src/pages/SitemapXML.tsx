import { useEffect, useState } from 'react';

export default function SitemapXML() {
  const [xmlContent, setXmlContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSitemap = async () => {
      try {
        const response = await fetch('https://ghtqdgkfbfdlnowrowpw.supabase.co/functions/v1/sitemap');
        const xml = await response.text();
        setXmlContent(xml);
      } catch (error) {
        console.error('Error fetching sitemap:', error);
        setXmlContent('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>');
      } finally {
        setLoading(false);
      }
    };

    fetchSitemap();
  }, []);

  useEffect(() => {
    // Add meta tag to hint at XML content type
    const metaTag = document.createElement('meta');
    metaTag.setAttribute('http-equiv', 'Content-Type');
    metaTag.setAttribute('content', 'application/xml; charset=utf-8');
    document.head.appendChild(metaTag);
    
    return () => {
      document.head.removeChild(metaTag);
    };
  }, []);

  if (loading) {
    return <div>Loading sitemap...</div>;
  }

  return (
    <div 
      style={{ 
        fontFamily: 'monospace', 
        whiteSpace: 'pre-wrap',
        margin: 0,
        padding: 0 
      }}
      dangerouslySetInnerHTML={{ __html: xmlContent }}
    />
  );
}