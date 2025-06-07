/**
 * Companions Library Page Component
 * Displays a grid of user's learning companions with search and filter functionality
 * Handles companion filtering based on subject and topic search
 */

import CompanionCard from "@/components/CompanionCard";
import Searchinput from "@/components/Searchinput";
import SubjectFilter from "@/components/SubjectFilter";
import { getUserCompanions } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

/**
 * Companions Library component that displays and filters user's companions
 * @param searchParams - URL search parameters for filtering companions
 * @returns The companions library page with search and filter functionality
 */
const CompanionsLibrary = async ({searchParams}: SearchParams) => {
  // Get current authenticated user
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  try {
    // Extract filter parameters from URL
    const filters = await searchParams;
    const subject = filters.subject || "";
    const topic = filters.topic || "";
    
    // Fetch user's companions from the database
    const companions = await getUserCompanions(user.id);
    
    // Filter companions based on search parameters
    const filteredCompanions = companions.filter(companion => {
      const matchesSubject = !subject || companion.subject.toLowerCase().includes(subject.toLowerCase());
      const matchesTopic = !topic || 
        companion.topic.toLowerCase().includes(topic.toLowerCase()) || 
        companion.name.toLowerCase().includes(topic.toLowerCase());
      return matchesSubject && matchesTopic;
    });

    return (
      <main className="min-h-screen p-8">
        {/* Header section with title and search filters */}
        <section className="flex justify-between gap-4 max-sm:flex-col mb-8">
            <h1 className="text-2xl font-bold">
              My Companions
            </h1>
            <div className="flex gap-4">
              <Searchinput/>      {/* Search input for topic/name */}
              <SubjectFilter/>    {/* Filter dropdown for subjects */}
            </div>
        </section>

        {/* Grid of companion cards */}
        <section className="companions-grid">
          {filteredCompanions && filteredCompanions.length > 0 ? (
            // Map through filtered companions and render cards
            filteredCompanions.map((companion) => (
              <CompanionCard 
                key={companion.id} 
                {...companion}
                color={getSubjectColor(companion.subject)}  // Get subject-specific color
              />
            ))
          ) : (
            // Show empty state with create button
            <div className="col-span-full flex flex-col items-center justify-center min-h-[200px] text-center">
              <p className="text-lg font-semibold mb-4">No companions found</p>
              <Link 
                href="/companions/new" 
                className="btn-primary hover:opacity-90 transition-opacity"
              >
                Create a New Companion
              </Link>
            </div>
          )}
        </section>
      </main>
    );
  } catch (error) {
    // Error handling with user-friendly message
    console.error("Error in CompanionsLibrary:", error);
    return (
      <main className="min-h-screen p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error Loading Companions</h1>
          <p>Please try again later</p>
        </div>
      </main>
    );
  }
}

export default CompanionsLibrary;