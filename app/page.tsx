/**
 * Home page component
 * Displays user's companions and recent sessions
 * Provides call-to-action for new users
 */

import React from 'react'
import { Button } from '@/components/ui/button'
import CompanionCard from '@/components/CompanionCard'
import CompanionList from '@/components/CompanionList'
import CTA from '@/components/CTA'
import { getUserCompanions, getRecentSessions } from '@/lib/actions/companion.actions'
import { getSubjectColor } from '@/lib/utils'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

/**
 * Home page component that displays user's learning companions and recent sessions
 * Redirects to sign-in if user is not authenticated
 * Shows different content based on whether user has companions or sessions
 * @returns The home page layout with companions and sessions
 */
const Page = async () => {
  // Get current authenticated user
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  // Fetch user's companions and recent sessions
  const companions = await getUserCompanions(user.id);
  const recentSessionsCompanions = await getRecentSessions(10);

  // Check if user has any companions or recent sessions
  const hasCompanions = companions && companions.length > 0;
  const hasRecentSessions = recentSessionsCompanions && recentSessionsCompanions.length > 0;

  return (
    <main className="px-4 md:px-16 py-8">
      <h1 className="text-4xl font-bold mb-8">My Companions</h1>

      {/* Show welcome message and CTA for new users */}
      {!hasCompanions && !hasRecentSessions ? (
        <section className="flex flex-col items-center justify-center text-center space-y-8">
          <p className="text-lg font-semibold">It looks like you haven't created any companions or completed any sessions yet.</p>
          <p className="text-lg">Get started by building your first learning companion!</p>
          <CTA className="w-full max-w-md"/> {/* Adjust width for centering */}
          <Link href="/companions/new" className="btn-primary hover:opacity-90 transition-opacity">Build a New Companion</Link>
        </section>
      ) : (
        <>
          {/* Display user's companions (up to 3) */}
          <section className="home-section">
            {companions.slice(0, 3).map((companion) => (
              <CompanionCard
                key={companion.id}
                {...companion}
                color={getSubjectColor(companion.subject)}
              />
            ))}
          </section>

          {/* Show recent sessions if they exist */}
          {hasRecentSessions && (
            <section className="home-section mt-8">
              <CompanionList
                title="Recent Completed Sessions"
                companions={recentSessionsCompanions}
                classNames="w-2/3 max-lg:w-full"
              />
              <CTA />
            </section>
          )}

          {/* Show CTA if user has companions but no recent sessions */}
          {!hasRecentSessions && hasCompanions && (
             <section className="home-section mt-8 justify-end">
                <CTA />
             </section>
          )}

        </>
      )}

    </main>
  )
}

export default Page