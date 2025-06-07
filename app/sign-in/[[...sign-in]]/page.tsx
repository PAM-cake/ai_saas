/**
 * Sign-in page component
 * Uses Clerk's SignIn component for authentication
 * Provides custom styling and navigation options
 */

import { SignIn } from '@clerk/nextjs';

/**
 * Sign-in page that renders Clerk's authentication component
 * Customizes the appearance with brand colors
 * Handles redirects after successful sign-in
 * @returns The sign-in page with authentication form
 */
export default function Page() {
    return (
        <main className='flex items-center justify-center min-h-screen'>
            <SignIn 
                // Redirect to home page after successful sign-in
                afterSignInUrl="/"
                // Link to sign-up page for new users
                signUpUrl="/sign-up"
                // Custom styling for the sign-in form
                appearance={{
                    elements: {
                        formButtonPrimary: {
                            backgroundColor: "#fe5933",
                            "&:hover": {
                                backgroundColor: "#e54e2a"
                            }
                        }
                    }
                }}
            />
        </main>
    );
}