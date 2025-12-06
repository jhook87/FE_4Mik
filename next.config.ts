import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    optimizePackageImports: ['@react-three/drei', 'three'],
  },
};

export default nextConfig;
