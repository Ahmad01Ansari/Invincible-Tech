import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Universal support for external assets
      },
      {
        protocol: "http",
        hostname: "**", 
      },
    ],
  },
};

export default nextConfig;
