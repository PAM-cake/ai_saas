/**
 * Navbar Component
 * Main navigation bar component with authentication controls
 * Displays logo, navigation items, and sign-in/user button
 */

import Link from "next/link";
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Navitems from "./Navitems";

/**
 * Navbar component that provides main navigation and authentication controls
 * @returns A navigation bar with logo, nav items, and auth controls
 */
const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo/Home link */}
      <Link href="/">
        <h1 className="text-3xl font-bold" style={{ color: '#fe5933' }}>
          PAM
        </h1>
      </Link>
      {/* Navigation items and auth controls */}
      <div className="flex items-center gap-8">
        {/* Navigation menu items */}
        <Navitems />
        {/* User button for signed-in users */}
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        {/* Sign in button for signed-out users */}
        <SignedOut>
          <div className="flex gap-4">
            <SignInButton mode="modal">
              <button className="text-sm font-medium">
                Sign In
              </button>
            </SignInButton>
          </div>
        </SignedOut>
      </div>
    </nav>
  );
};

export default Navbar;