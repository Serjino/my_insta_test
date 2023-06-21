/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'via.placeholder.com',
            // port: '',
            // pathname: ['/150/**', '/600/**'],
          },
        ],
      },
}

module.exports = nextConfig
