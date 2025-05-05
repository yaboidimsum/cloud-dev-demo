import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["uccareer.id"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
