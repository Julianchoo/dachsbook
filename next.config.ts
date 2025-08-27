import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.dog.ceo',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'dog.ceo',
        port: '',
        pathname: '/**',
      },
      // Add more image domains if needed
      {
        protocol: 'https',
        hostname: 'cdn2.thedogapi.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
