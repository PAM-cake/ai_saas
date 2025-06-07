/**
 * Next.js middleware configuration
 * Handles authentication and route protection using Clerk
 * Defines public and protected routes
 */

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define routes that don't require authentication
const publicRoutes = createRouteMatcher([
  "/",                    // Home page
  "/sign-in(.*)",        // Sign-in page and related routes
  "/sign-up(.*)",        // Sign-up page and related routes
  "/api/webhook(.*)",    // Webhook endpoints
]);

// Configure Clerk middleware with public routes and ignored routes
export default clerkMiddleware({
  publicRoutes,
  ignoredRoutes: [
    "/api/webhook(.*)",  // Webhook routes that should be ignored by Clerk
  ],
});

// Configure middleware matcher patterns
export const config = {
  matcher: [
    // Skip Next.js internals and static files
    // Excludes common file extensions and Next.js system files
    "/((?!_next|[^?]*.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run middleware for API routes
    "/(api|trpc)(.*)",
  ],
};
