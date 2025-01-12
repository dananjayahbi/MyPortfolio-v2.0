import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Disables TypeScript errors during build
  },
  eslint: {
    ignoreDuringBuilds: true, // Disables ESLint during build
  },
};

export default nextConfig;
