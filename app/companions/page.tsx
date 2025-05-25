import CompanionCard from "@/components/CompanionCard";
import Searchinput from "@/components/Searchinput";
import SubjectFilter from "@/components/SubjectFilter";
import { getAllCompanions } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import Link from "next/link";

const CompanionsLibrary = async ({searchParams}: SearchParams) => {
  try {
    const filters = await searchParams;
    const subject = filters.subject || "";
    const topic = filters.topic || "";
    
    const companions = await getAllCompanions({ subject, topic });

    return (
      <main className="min-h-screen p-8">
        <section className="flex justify-between gap-4 max-sm:flex-col mb-8">
            <h1 className="text-2xl font-bold">
              Companion Library
            </h1>
            <div className="flex gap-4">
              <Searchinput/>
              <SubjectFilter/>
            </div>
        </section>
        <section className="companions-grid">
          {companions && companions.length > 0 ? (
            companions.map((companion) => (
              <CompanionCard 
                key={companion.id} 
                {...companion}
                color={getSubjectColor(companion.subject)}
              />
            ))
          ) : (
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
    console.error('Error in CompanionsLibrary:', error);
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-lg mb-4">Something went wrong</p>
        <Link href="/" className="btn-primary">
          Go Back Home
        </Link>
      </div>
    );
  }
}

export default CompanionsLibrary