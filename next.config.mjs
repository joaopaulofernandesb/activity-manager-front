/* eslint-disable @typescript-eslint/no-require-imports */
const withPWA = require('next-pwa')({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development', // Desabilita o PWA no ambiente de desenvolvimento
    register: true,
    skipWaiting: true,
  });
  
  /** @type {import('next').NextConfig} */
  const nextConfig = withPWA({
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
      appDir: true,
    },
  });
  
  export default nextConfig;
  