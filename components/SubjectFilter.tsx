/**
 * Subject Filter Component
 * A dropdown filter for filtering companions by subject
 * Updates URL query parameters with selected subject
 */

"use client";
import React, { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { subjects } from "@/constants";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

/**
 * Subject Filter component for filtering companions by subject
 * Updates URL query parameters with selected subject
 * @returns A select dropdown for subject filtering
 */
const SubjectFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("subject") || "";

    // State for selected subject
    const [subject, setSubject] = useState(query);

    /**
     * Effect to handle subject selection changes
     * Updates URL query parameters with selected subject
     * Removes subject parameter when "all" is selected
     */
    useEffect(() => {
        const updateUrl = () => {
            let newUrl = "";
            if (subject === "all") {
                // Remove subject parameter when "all" is selected
                newUrl = removeKeysFromUrlQuery({
                    params: searchParams.toString(),
                    keysToRemove: ["subject"],
                });
            } else if (subject) {
                // Add selected subject to URL query parameters
                newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: "subject",
                    value: subject,
                });
            }
            router.push(newUrl, { scroll: false });
        };

        // Debounce URL updates
        const timeoutId = setTimeout(updateUrl, 100);
        return () => clearTimeout(timeoutId);
    }, [subject, searchParams, router]);

    return (
        <Select onValueChange={setSubject} value={subject}>
            {/* Select trigger with placeholder */}
            <SelectTrigger className="input capitalize">
                <SelectValue placeholder="Subject" />
            </SelectTrigger>
            {/* Select content with options */}
            <SelectContent>
                <SelectItem value="all">All subjects</SelectItem>
                {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject} className="capitalize">
                        {subject}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default SubjectFilter;