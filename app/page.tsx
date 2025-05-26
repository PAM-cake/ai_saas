import React from 'react'
import { Button } from '@/components/ui/button'
import CompanionCard from '@/components/CompanionCard'
import CompanionList from '@/components/CompanionList'
import CTA from '@/components/CTA'
import { recentSessions } from '@/constants'
import { getAllCompanions, getRecentSessions } from '@/lib/actions/companion.actions'
import { getSubjectColor } from '@/lib/utils'

const Page = async () => {
  const companions = await getAllCompanions({limit: 3})
  const recentSessionsCompanions = await getRecentSessions(10)

  return (
    <main className="px-4 md:px-16 py-8">
      <h1 className="text-4xl font-bold mb-8">Popular Companions</h1>
      <section className="home-section">
        {companions.map((companion)=>(
          <CompanionCard 
          key={companion.id}
          {...companion}
          color={getSubjectColor(companion.subject)}
        />
        ))}
      </section>
      <section className="home-section mt-8">
        <CompanionList 
            title ="Recent Completed Sessions"
            companions={recentSessionsCompanions}
            classNames="w-2/3 max-lg:w-full"
        />
        <CTA />
      </section>
    </main>
  )
}

export default Page