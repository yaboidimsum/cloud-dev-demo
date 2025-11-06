import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["uccareer.id", "images.genius.com", "i.scdn.co", "scontent-cgk2-2.cdninstagram.com", "i.scdn.co"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Add the experimental section for outputFileTracingIncludes
  experimental: {
    outputFileTracingIncludes: {
      "/**/*": ["./content/**/*"], // Include all files under ./content for all pages/routes
    },
  },
};

export default nextConfig;
