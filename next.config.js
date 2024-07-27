/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "tough-bobcat-720.convex.cloud",
      },
      {
        protocol: "https",
        hostname: "convex.app",
        port: "",
        pathname: "/storage/**",
      },
    ],
  },
};

module.exports = nextConfig;
