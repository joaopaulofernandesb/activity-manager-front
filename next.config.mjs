/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    pwa: {
      dest: "public",
    }
  };
  
  export default nextConfig;