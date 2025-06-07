/**
 * Sign-up page component
 * Uses Clerk's SignUp component for user registration
 * Provides custom styling and navigation options
 */

import { SignUp } from '@clerk/nextjs';

/**
 * Sign-up page that renders Clerk's registration component
 * Customizes the appearance with brand colors
 * Handles redirects after successful sign-up
 * @returns The sign-up page with registration form
 */
export default function Page() {
    return (
        <main className='flex items-center justify-center min-h-screen'>
            <SignUp 
                // Redirect to home page after successful sign-up
                afterSignUpUrl="/"
                // Link to sign-in page for existing users
                signInUrl="/sign-in"
                // Custom styling for the sign-up form
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