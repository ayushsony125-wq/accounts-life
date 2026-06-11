/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.icai.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'icai.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.mca.gov.in',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'mca.gov.in',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/vi/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '/**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://accounts.one',
  },
}

module.exports = nextConfig
