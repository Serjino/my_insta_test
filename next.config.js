/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
        scrollRestoration: true,
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'via.placeholder.com',
          },
        ],
      },
}

module.exports = nextConfig
