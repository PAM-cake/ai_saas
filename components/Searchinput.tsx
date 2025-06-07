/**
 * Search Input Component
 * A search input field for filtering companions by topic
 * Updates URL query parameters with debounced search input
 */

"use client"

import Image from 'next/image';
import { usePathname,useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils';

/**
 * Search Input component for filtering companions
 * Updates URL query parameters with debounced search input
 * @returns A search input field with icon
 */
const Searchinput = () => {
    const pathname = usePathname()
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("topic") || "";

    // State for search input value
    const [search, setSearch] = useState("");

    /**
     * Effect to handle search input changes
     * Updates URL query parameters with debounced search value
     * Removes topic parameter when search is empty
     */
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (search) {
                // Add search term to URL query parameters
                const newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: "topic",
                    value: search
                });
                router.push(newUrl, { scroll: false });
            } else if (pathname === "/companions") {
                // Remove topic parameter when search is empty
                const newUrl = removeKeysFromUrlQuery({
                    params: searchParams.toString(),
                    keysToRemove: ["topic"]
                });
                router.push(newUrl, { scroll: false });
            }
        }, 300);

    },[search, router, searchParams, pathname])

  return (
    <div className='relative border border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit'>
        {/* Search icon */}
        <Image
            src="/icons/search.svg"
            alt="search"
            width={15}
            height={15}
        />
        {/* Search input field */}
        <input
            placeholder='Search Companion...'
            className='outline-none'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
    </div>
  )
}

export default Searchinput