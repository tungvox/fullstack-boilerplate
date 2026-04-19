import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Playwright (and other tools) often hit the dev server via 127.0.0.1 while Next binds localhost.
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
