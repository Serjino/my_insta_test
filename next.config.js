/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: '/gh-pages-test',
    experimental: {
      appDir: true,
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
