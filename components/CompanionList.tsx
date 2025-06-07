/**
 * Companion List Component
 * Displays a table of learning companions with their details
 * Shows subject icons, names, topics, and durations
 */

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn, getSubjectColor } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Companion } from "@/types";

/**
 * Props interface for the Companion List component
 * @property title - Title of the companion list
 * @property companions - Array of companion objects to display
 * @property classNames - Optional additional CSS classes
 */
interface CompanionListProps {
  title: string;
  companions?: Companion[];
  classNames?: string;
}

/**
 * Companion List component that displays companions in a table format
 * @param props - CompanionListProps containing title, companions, and optional classes
 * @returns A table component displaying companion information
 */
const CompanionList = ({ title, companions, classNames }: CompanionListProps) => {
  return (
    <article className={cn("companion-list", classNames)}>
      {/* List title */}
      <h2 className="text-3xl font-bold">
        {title}
      </h2>
      <Table>
        {/* Table header with column names */}
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg w-2/3">Lessons</TableHead>
            <TableHead className="text-lg">Subject</TableHead>
            <TableHead className="text-lg text-right">Duration</TableHead>
          </TableRow>
        </TableHeader>
        {/* Table body with companion rows */}
        <TableBody>
          {companions?.filter(Boolean).map(({ id, subject, name, topic, duration }) => (
            <TableRow key={id}>
              {/* Lesson details cell with icon and name */}
              <TableCell>
                <Link href={`/companions/${id}`}>
                  <div className="flex items-center gap-2">
                    {/* Subject icon container */}
                    <div
                      className="size-[72px] flex item-center justify-center rounded-lg max-md:hidden"
                      style={{ backgroundColor: getSubjectColor(subject) }}
                    >
                      <Image src={`/icons/${subject}.svg`} alt={subject} width={35} height={35} />
                    </div>
                    {/* Lesson name and topic */}
                    <div className="flex flex-col gap-2">
                      <p className="font-bold text-2xl">{name}</p>
                      <p className="text-lg">{topic}</p>
                    </div>
                  </div>
                </Link>
              </TableCell>
              {/* Subject cell with badge/icon */}
              <TableCell>
                <div className="subject-badge w-fit max-md:hidden">{subject}</div>
                <div
                  className="item-center justify-center rounded-lg w-fit md:hidden p-2"
                  style={{ backgroundColor: getSubjectColor(subject) }}
                >
                  <Image src={`/icons/${subject}.svg`} alt={subject} width={18} height={18} />
                </div>
              </TableCell>
              {/* Duration cell with time and icon */}
              <TableCell>
                <div className="flex items-center justify-end gap-2 w-full">
                  <p className="text-2xl">
                    {duration} <span className="max-md:hidden">mins</span>
                  </p>
                  <Image src="/icons/clock.svg" alt="Clock" width={14} height={14} className="md:hidden" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </article>
  )
}

export default CompanionList
