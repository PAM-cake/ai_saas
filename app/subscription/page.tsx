/**
 * Subscription page component
 * Displays pricing plans and subscription options
 * Uses Clerk's PricingTable component for subscription management
 */

import { PricingTable } from "@clerk/nextjs"

/**
 * Subscription page that renders Clerk's pricing table
 * Allows users to view and select subscription plans
 * @returns The subscription page with pricing options
 */
const Subscription = () => {
  return (
    <main>
      <PricingTable/>
    </main>
  )
}

export default Subscription