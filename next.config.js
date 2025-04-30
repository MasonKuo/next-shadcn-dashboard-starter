/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'api.slingacademy.com',
        port: ''
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/bkapi/:path*',
        destination: 'http://192.168.1.104:8080/v1/:path*'
      }
    ];
  }
};

module.exports = nextConfig;
