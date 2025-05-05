import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["uccareer.id"],
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
