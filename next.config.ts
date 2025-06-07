/**
 * Next.js configuration file
 * Defines custom configuration for the Next.js application
 * Configures image optimization and allowed domains
 */

import type { NextConfig } from "next";

/**
 * Next.js configuration object
 * Configures image optimization settings and allowed remote patterns
 * Currently allows images from Clerk's domain for user avatars
 */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'img.clerk.com' }  // Allow images from Clerk's CDN
    ]
  }
};

export default nextConfig;
