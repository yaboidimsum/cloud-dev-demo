import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uccareer.id",
      },
      {
        protocol: "https",
        hostname: "images.genius.com",
      },
      {
        protocol: "https",
        // The previous config had 'i.scdn.co' listed twice.
        hostname: "i.scdn.co",
      },
      {
        protocol: "https",
        hostname: "scontent-cgk2-2.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "is1-ssl.mzstatic.com",
      },
      {
        protocol: "https",
        hostname: "static.wikia.nocookie.net",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "api.microlink.io",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Add the experimental section for outputFileTracingIncludes

  outputFileTracingIncludes: {
    "/**/*": ["./content/**/*"], // Include all files under ./content for all pages/routes
  },
};

export default nextConfig;
