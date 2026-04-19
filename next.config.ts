import withPWAInit from "@ducanh2912/next-pwa";
import type { NextConfig } from "next";

const withPWA = withPWAInit({
  dest: "public",
  // Avoid stale auth/billing during local dev; production builds still emit a SW.
  disable: process.env.NODE_ENV === "development",
  register: true,
  scope: "/",
  extendDefaultRuntimeCaching: true,
  workboxOptions: {
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/[^/]+\.supabase\.co\/.*/i,
        handler: "NetworkOnly",
      },
      {
        urlPattern: ({ url }) => url.pathname.startsWith("/api/"),
        handler: "NetworkOnly",
      },
    ],
  },
});

const nextConfig: NextConfig = {
  // Playwright (and other tools) often hit the dev server via 127.0.0.1 while Next binds localhost.
  allowedDevOrigins: ["127.0.0.1"],
};

export default withPWA(nextConfig);
