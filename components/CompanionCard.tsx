/**
 * Companion Card Component
 * Displays a single learning companion with its details and actions
 * Handles companion deletion and navigation to learning session
 */

"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteCompanion } from "@/lib/actions/companion.actions";
import { useRouter } from "next/navigation";

/**
 * Props interface for the Companion Card component
 * @property id - Unique identifier for the companion
 * @property name - Name of the companion
 * @property topic - Learning topic
 * @property subject - Subject area
 * @property duration - Session duration in minutes
 * @property color - Background color based on subject
 */
interface ComapanionCardProps {
    id: string;
    name: string;
    topic: string;
    subject: string;
    duration: number;
    color: string;
}

/**
 * Companion Card component that displays companion information and actions
 * @param props - CompanionCardProps containing companion details
 * @returns A card component displaying companion information with actions
 */
const CompanionCard = ({id, name, topic, subject, duration, color}:
    ComapanionCardProps) => {
  const router = useRouter();

  /**
   * Handles companion deletion
   * Calls the delete action and refreshes the page
   */
  const handleDelete = async () => {
    try {
      await deleteCompanion(id);
      router.refresh(); // Refresh the page to update the list
    } catch (error) {
      console.error("Error deleting companion:", error);
    }
  };

  return (
    <article className="companion-card lg:max-w-[410px]" style={{backgroundColor: color}}>
        {/* Header section with subject badge and actions */}
        <div className="flex justify-between items-center">
            <div className="subject-badge">
                {subject}
            </div>
            <div className="flex gap-2">
                {/* Bookmark button */}
                <button className="companion-bookmark">
                    <Image src="icons/bookmark.svg" alt="Bookmark" width={12.5} height={15} />
                </button>
                {/* Delete button */}
                <Button 
                    variant="destructive" 
                    size="icon"
                    onClick={handleDelete}
                    className="h-8 w-8"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </div>

        {/* Companion details */}
        <h2 className="text-2xl font-bold mb-2">{name}</h2>
        <p className="text-sm">{topic}</p>

        {/* Duration indicator */}
        <div className="flex items-center gap-2 mt-4">
            <Image src="icons/clock.svg" alt="Clock" width={13.5} height={13.5} />
            <p className="text-sm">
              {duration} minutes
            </p>
        </div>

        {/* Start learning button */}
        <Link 
            href={`/companions/${id}`} 
            className="btn-primary w-full justify-center transition-all hover:opacity-90 block text-center py-2"
            prefetch={true}
        >
            Start Learning
        </Link>
    </article>
  )
}

export default CompanionCard