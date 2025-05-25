import Image from "next/image";
import Link from "next/link";

interface ComapanionCardProps {
    id: string;
    name: string;
    topic: string;
    subject: string;
    duration: number;
    color: string;
}

const CompanionCard = ({id, name, topic, subject, duration, color}:
    ComapanionCardProps) => {
  return (
    <article className="companion-card lg:max-w-[410px]" style={{backgroundColor: color}}>
        <div className="flex justify-between items-center">
            <div className="subject-badge">
                {subject}
            </div>
            <button className="companion-bookmark">
                <Image src="icons/bookmark.svg" alt="Bookmark" width={12.5} height={15} />
            </button>
        </div>
        <h2 className="text-2xl font-bold mb-2">{name}</h2>
        <p className="text-sm">{topic}</p>
        <div className="flex items-center gap-2 mt-4">
            <Image src="icons/clock.svg" alt="Clock" width={13.5} height={13.5} />
            <p className="text-sm">
              {duration} minutes
            </p>
        </div>
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