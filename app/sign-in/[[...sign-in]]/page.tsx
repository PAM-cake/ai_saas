import { SignIn } from '@clerk/nextjs';

export default function Page() {
    return (
        <main className='flex items-center justify-center min-h-screen'>
            <SignIn 
                afterSignInUrl="/"
                signUpUrl="/sign-up"
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