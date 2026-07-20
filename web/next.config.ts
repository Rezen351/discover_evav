import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Izinkan domain development mengakses Next.js dev resources (webpack HMR)
  // tanpa ini, JavaScript hydration gagal dan loading screen stuck
  allowedDevOrigins: ["dev.discoverevav.id"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
