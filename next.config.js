/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://lt-99-pharmacy.vercel.app/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
