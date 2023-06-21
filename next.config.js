/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    experimental: {
        serverActions: true,
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
