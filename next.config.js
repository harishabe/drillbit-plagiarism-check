const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa");

const nextConfig = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
    runtimeCaching
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
});
module.exports = nextConfig;