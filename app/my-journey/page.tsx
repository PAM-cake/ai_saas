/**
 * My Journey page component
 * Displays user profile, learning statistics, and learning history
 * Shows recent sessions and created companions
 */

import CompanionList from "@/components/CompanionList"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { getUserCompanions, getUserSessions } from "@/lib/actions/companion.actions"
import { currentUser } from "@clerk/nextjs/server"
import Image from "next/image"
import { redirect } from "next/navigation"

/**
 * Profile page that displays user's learning journey
 * Shows user profile, statistics, and learning history
 * Requires authentication
 * @returns The profile page with user information and learning data
 */
const ProfilePage = async () => {
  // Get current authenticated user
  const user = await currentUser()
  if(!user) redirect('/sign-in')

  // Fetch user's companions and session history
  const companions = await getUserCompanions(user.id)
  const sessionsHistory = await getUserSessions(user.id)

  return (
    <main className="min-lg:w-3/4">
      {/* User profile section with avatar and stats */}
      <section className="flex justify-between gap-4 max-sm:flex-col items-center">
        {/* User information */}
        <div className="flex gap-4 items-center">
              <Image
                src={user.imageUrl}
                alt={user.firstName!}
                width={110}
                height={110}
              />
              <div className="flex flex-col gap-2 ">
                  <h1 className="font-bold text-2xl">
                      {user.firstName}{user.lastName}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                      {user.emailAddresses[0].emailAddress}
                  </p>
              </div>
        </div>
        {/* Learning statistics */}
        <div className="flex gap-4 ">
              {/* Completed lessons counter */}
              <div className="border border-black rounded-lg p-3 gap-2 flex flex-col">
                <div className="flex gap-2 items-center">
                    <Image
                    src="/icons/check.svg"
                    alt="checkmark"
                    width={22}
                    height={22}
                    />
                    <p className="text-2x font-bold ">
                        {sessionsHistory.length}
                    </p>
                </div>
                <div>
                  Lessons Completed
                </div>
              </div>
              {/* Created companions counter */}
              <div className="border border-black rounded-lg p-3 gap-2 flex flex-col">
                <div className="flex gap-2 items-center">
                    <Image
                    src="/icons/cap.svg"
                    alt="cap"
                    width={22}
                    height={22}
                    />
                    <p className="text-2x font-bold ">
                        {companions.length}
                    </p>
                </div>
                <div>
                  Lessons Completed
                </div>
              </div>
        </div>
      </section>

      {/* Learning history accordion */}
      <Accordion type="multiple" defaultValue={[]}>
        {/* Recent sessions section */}
        <AccordionItem value="recent">
          <AccordionTrigger className="text-2xl font-bold">
            Recent Sessions
          </AccordionTrigger>
          <AccordionContent>
            <CompanionList title="Recent Sessions" companions={sessionsHistory} />
          </AccordionContent>
        </AccordionItem>
        {/* User's companions section */}
        <AccordionItem value="companions">
          <AccordionTrigger className="text-2xl font-bold">
            My Companions{`(${companions.length})`}
          </AccordionTrigger>
          <AccordionContent>
            <CompanionList title="My Companions" companions={companions} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
    </main>
  )
}

export default ProfilePage