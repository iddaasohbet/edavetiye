import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Disable ESLint during production builds (Vercel)
    ignoreDuringBuilds: true,
  },
  typescript: {
    // If there are type errors you want to tolerate during CI builds, enable this.
    // Safer to keep false locally; CI can proceed.
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "altinbilgi.com" },
      { protocol: "https", hostname: "api.qrserver.com" },
    ],
  },
};

export default nextConfig;
