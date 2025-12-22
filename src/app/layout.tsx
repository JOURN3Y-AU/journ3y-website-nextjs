import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import '@/index.css'
import { Toaster } from '@/components/ui/toaster'
import Script from 'next/script'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.journ3y.com.au'),
  title: {
    default: 'AI Consulting Australia | Small Business & Enterprise AI Solutions | JOURN3Y',
    template: '%s | JOURN3Y',
  },
  description: 'Australia\'s AI consulting experts for small business and enterprise. Practical AI solutions that save 10+ hours per week. Official Glean implementation partner. Serving Sydney, Melbourne, Brisbane, Perth, Adelaide & Hobart.',
  keywords: ['AI consulting Australia', 'small business AI', 'Glean implementation', 'enterprise AI search', 'AI strategy', 'business automation', 'AI consultants Sydney', 'AI consultants Melbourne'],
  authors: [{ name: 'JOURN3Y' }],
  openGraph: {
    title: 'AI Consulting Australia | Small Business & Enterprise AI | JOURN3Y',
    description: 'Australia\'s AI consulting experts. Practical AI solutions for small business and enterprise. Official Glean partner.',
    type: 'website',
    locale: 'en_AU',
    url: 'https://www.journ3y.com.au',
    siteName: 'JOURN3Y',
    images: [
      {
        url: '/JOURN3Y-logo.png',
        width: 1200,
        height: 630,
        alt: 'JOURN3Y Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@journey_ai',
    images: ['/JOURN3Y-logo.png'],
  },
  icons: {
    icon: '/JOURN3Y-logo.svg',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={manrope.variable}>
      <head>
        {/* LinkedIn Insight Tag */}
        <Script id="linkedin-partner-id" strategy="afterInteractive">
          {`
            _linkedin_partner_id = "7309420";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          `}
        </Script>
        <Script id="linkedin-insight" strategy="afterInteractive">
          {`
            (function(l) {
            if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
            window.lintrk.q=[]}
            var s = document.getElementsByTagName("script")[0];
            var b = document.createElement("script");
            b.type = "text/javascript";b.async = true;
            b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
            s.parentNode.insertBefore(b, s);})(window.lintrk);
          `}
        </Script>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4YG1ZE7T3V"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4YG1ZE7T3V');
          `}
        </Script>

        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '2566267367080759');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* Structured Data for Search Engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "JOURN3Y",
              "alternateName": "Journey AI",
              "description": "AI consulting and implementation for Australian businesses. Official Glean partner. Small business AI solutions and enterprise search.",
              "url": "https://www.journ3y.com.au",
              "logo": "https://www.journ3y.com.au/JOURN3Y-logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "sales",
                "email": "info@journ3y.com.au",
                "availableLanguage": ["English"]
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "AU"
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
                },
                {
                  "@type": "City",
                  "name": "Perth"
                },
                {
                  "@type": "City",
                  "name": "Adelaide"
                },
                {
                  "@type": "City",
                  "name": "Hobart"
                },
                {
                  "@type": "Country",
                  "name": "United States"
                },
                {
                  "@type": "Country",
                  "name": "Israel"
                }
              ],
              "sameAs": [
                "https://www.linkedin.com/company/journ3y-au"
              ],
              "knowsAbout": [
                "Artificial Intelligence",
                "Enterprise Search",
                "Glean",
                "Small Business AI",
                "AI Consulting",
                "Business Automation"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "AI Consulting Services",
                "itemListElement": [
                  {
                    "@type": "Service",
                    "name": "Glean Implementation",
                    "description": "Enterprise AI search implementation with Glean platform"
                  },
                  {
                    "@type": "Service",
                    "name": "Small Business AI Solutions",
                    "description": "Industry-specific AI tools for Australian small businesses"
                  },
                  {
                    "@type": "Service",
                    "name": "AI Strategy Blueprint",
                    "description": "AI readiness assessment and implementation roadmap"
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body className="bg-background text-foreground font-sans tracking-tight">
        {/* LinkedIn noscript fallback */}
        <noscript>
          <img height="1" width="1" style={{ display: 'none' }} alt="" src="https://px.ads.linkedin.com/collect/?pid=7309420&fmt=gif" />
        </noscript>

        {/* Meta Pixel noscript fallback */}
        <noscript>
          <img height="1" width="1" style={{ display: 'none' }} src="https://www.facebook.com/tr?id=2566267367080759&ev=PageView&noscript=1" alt="" />
        </noscript>

        {children}
        <Toaster />
      </body>
    </html>
  )
}
