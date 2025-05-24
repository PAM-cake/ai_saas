import React from 'react'
import { Button } from '@/components/ui/button'
import CompanionCard from '@/components/CompanionCard'
import CompanionList from '@/components/CompanionList'
import CTA from '@/components/CTA'
import { recentSessions } from '@/constants'

const Page = () => {
  return (
    <main className="px-4 md:px-16 py-8">
      <h1 className="text-4xl font-bold mb-8">Popular Companions</h1>
      <section className="home-section">
        <CompanionCard 
          id="123"
          name="Companion 1"
          topic="Math"
          subject="Algebra"
          duration={30}
          color="#ffda6e"
        />
        <CompanionCard 
          id="456"
          name="Companion 2"
          topic="ENG"
          subject="Literature"
          duration={30}
          color="#e5d0ff"

        />
        <CompanionCard 
          id="789"
          name="Companion 3"
          topic="Sci"
          subject="Algebra"
          duration={30}
          color="#BDE7FF"
        />

      </section>
      <section className="home-section mt-8">
        <CompanionList 
            title ="Recent Completed Sessions"
            companions={recentSessions}
            classNames="w-2/3 max-lg:w-full"
        />
        <CTA />
      </section>
    </main>
  )
}

export default Page