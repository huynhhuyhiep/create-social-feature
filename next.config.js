const withTwin = require('./withTwin.js')

/**
 * @type {import('next').NextConfig}
 */
module.exports = withTwin({
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'supermomos-app-resources-us.s3.amazonaws.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/apis/:path*",
        destination: 'https://api.supermomos-dev.com/:path*',
      }
    ];
  },
})
