import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  basePath: process.env.NODE_ENV === "development" ? '' : '/activity-manager-front', 
  assetPrefix: process.env.NODE_ENV === "development" ? '' : '/activity-manager-front/'  
};

export default withPWA({
    dest: "public",  
    disable: process.env.NODE_ENV === "development",
    register: true,   
    skipWaiting: true, 
})(nextConfig);
