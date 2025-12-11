import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [],
    unoptimized: true, // Required for static export
  },
  // Enable static export for S3 deployment
  output: 'export',
  // Disable image optimization for static export
  trailingSlash: true,
};

export default nextConfig;
