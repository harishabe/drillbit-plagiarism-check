// const runtimeCaching = require("next-pwa/cache");
// const withPWA = require("next-pwa")({
//   dest: "public",
//   register: true,
//   skipWaiting: true,
//   runtimeCaching,
// });

// const nextConfig = withPWA({
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
// });
// module.exports = nextConfig;

const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa");

module.exports = withPWA({
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
  },
  runtimeCaching
});

/**
 * Below code working in production
 */
// const runtimeCaching = require("next-pwa/cache");
// const withPWA = require("next-pwa")({
//     dest: "public",
//     register: true,
//     skipWaiting: true,
//     runtimeCaching,
// });

// const nextConfig = withPWA({
// eslint: {
//   ignoreDuringBuilds: true,
// },
// });
// module.exports = nextConfig;
