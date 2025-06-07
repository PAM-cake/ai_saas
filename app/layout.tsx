/**
 * Root layout component for the entire application
 * Sets up the base HTML structure, fonts, and authentication provider
 */

import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/Navbar";

// Initialize the Bricolage Grotesque font with Latin subset
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

// Define metadata for the application
export const metadata: Metadata = {
  title: "PAM",
  description: "Real-time AI Teaching Platform",
};

/**
 * Root layout component that wraps all pages
 * Provides authentication context and consistent layout structure
 * @param children - Child components to be rendered within the layout
 * @returns The root layout with authentication and navigation
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body className={`${bricolage.variable} antialiased`}>
        {/* Clerk authentication provider with custom primary color */}
        <ClerkProvider appearance={{variables: {colorPrimary: "#fe5933"}}}>
          <Navbar />
          {children}
        </ClerkProvider>
        </body>
      </html>
  );
}
