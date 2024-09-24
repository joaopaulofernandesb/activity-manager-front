import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  basePath: '/activity-manager-front',
  assetPrefix: '/activity-manager-front/',
  pwa: {
    dest: 'public',  // Define onde o service worker será gerado
    register: true,  // Se deve registrar o service worker automaticamente
    skipWaiting: true,  // Permite que o SW seja ativado assim que for instalado
  },
});

export default nextConfig;
