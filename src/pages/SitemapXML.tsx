import { useEffect } from 'react';

export default function SitemapXML() {
  useEffect(() => {
    // Immediately redirect to the Supabase edge function which serves proper XML
    window.location.replace('https://ghtqdgkfbfdlnowrowpw.supabase.co/functions/v1/sitemap');
  }, []);

  return (
    <div>
      <p>Redirecting to XML sitemap...</p>
    </div>
  );
}