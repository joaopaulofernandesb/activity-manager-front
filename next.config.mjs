import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  dest: "public", // Local onde o service worker será gerado
  disable: process.env.NODE_ENV === "development", // Desabilita o PWA no desenvolvimento
  register: true,
  skipWaiting: true,
});

export default nextConfig;
