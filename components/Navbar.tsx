import Link from "next/link";
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Navitems from "./Navitems";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link href="/">
        <h1 className="text-3xl font-bold" style={{ color: '#fe5933' }}>
          PAM
        </h1>
      </Link>
      <div className="flex items-center gap-8">
        <Navitems />
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
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