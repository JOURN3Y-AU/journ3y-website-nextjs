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
}

module.exports = nextConfig
