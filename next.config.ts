import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  },
  async redirects() {
    return [
      {
        source: "/resources/api-docs",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/resources/tech-reports",
        destination: "/contact",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
