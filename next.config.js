/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");

module.exports = withPWA({
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
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
});

