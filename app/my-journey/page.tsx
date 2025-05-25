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


const ProfilePage = async () => {
  const user = await currentUser()
  if(!user) redirect('/sign-in')

  const companions = await getUserCompanions(user.id)
  const sessionsHistory = await getUserSessions(user.id)

  return (
    <main className="min-lg:w-3/4">
      <section className="flex justify-between gap-4 max-sm:flex-col items-center">
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
          <div className="flex gap-4 ">
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
      <Accordion type="multiple" defaultValue={[]}>
        <AccordionItem value="recent">
          <AccordionTrigger className="text-2xl font-bold">
            Recent Sessions
          </AccordionTrigger>
          <AccordionContent>
            <CompanionList title="Recent Sessions" companions={sessionsHistory} />
          </AccordionContent>
        </AccordionItem>
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