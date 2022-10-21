const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching
});

const nextConfig = withPWA({
  reactStrictMode: false,
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development'
  },
  i18n: {
    locales: ['en', 'fr', 'no'],
    defaultLocale: 'en',
  },
  experimental: {
    styledComponents: true
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
});
module.exports = nextConfig;
