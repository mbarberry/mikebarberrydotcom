/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  env: {
    ENVIRONMENT: process.env.NODE_ENV === 'development' ? 'dev' : 'prod',
  },
};

module.exports = nextConfig;
