/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ghtqdgkfbfdlnowrowpw.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'journ3y.com.au',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Ensure trailing slashes are handled consistently
  trailingSlash: false,
  // Redirects for old/alternative URLs
  async redirects() {
    return [
      {
        source: '/products/small-business',
        destination: '/small-business-ai',
        permanent: true, // 301 redirect for SEO
      },
    ]
  },
}

module.exports = nextConfig
