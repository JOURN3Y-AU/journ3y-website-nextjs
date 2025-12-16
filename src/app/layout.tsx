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
  metadataBase: new URL('https://journ3y.com.au'),
  title: {
    default: 'JOURN3Y - AI Consulting & Glean Implementation Experts',
    template: '%s | JOURN3Y',
  },
  description: 'Leading AI consulting firm specializing in Glean enterprise search implementation, AI strategy development, and business transformation. Expert Glean consultants delivering AI readiness assessments and strategic AI solutions.',
  keywords: ['AI consulting', 'Glean implementation', 'Glean consultant', 'enterprise search', 'AI strategy', 'business transformation', 'AI readiness assessment', 'Glean experts', 'AI transformation services'],
  authors: [{ name: 'Journey AI' }],
  openGraph: {
    title: 'JOURN3Y - Transforming Business with AI Solutions',
    description: 'AI-powered solutions to accelerate your business transformation',
    type: 'website',
    locale: 'en_AU',
    url: 'https://journ3y.com.au',
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
              "description": "Australia's certified Glean implementation partner providing enterprise search solutions",
              "url": "https://journ3y.com.au",
              "logo": "https://journ3y.com.au/JOURN3Y-logo.png",
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
