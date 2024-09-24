/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  basePath: '/activity-manager-front',  // O caminho base do seu projeto no GitHub Pages
  assetPrefix: '/activity-manager-front/',  // Prefixo para os arquivos estáticos
};

export default nextConfig;
