/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        appDir: true,
      },
    pwa: {
      dest: "public",
    }
  };
  
  export default nextConfig;