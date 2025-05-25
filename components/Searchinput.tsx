"use client"

import Image from 'next/image';
import { usePathname,useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils';

const Searchinput = () => {
    const pathname = usePathname()
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("topic") || "";

    const [search, setSearch] = useState("");

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
        if (search) {
            const newUrl = formUrlQuery({
                params: toString(),
                key : "topic",
                value: search
            })
            router.push(newUrl,{scroll: false});
        }
        else {
            if(pathname === "/companions") {
                const newUrl = removeKeysFromUrlQuery({
                    params: toString(),
                    keysToRemove: ["topic"]
                })
                router.push(newUrl,{scroll: false});
            }
        }
        })

    },[search, router, searchParams, pathname])

  return (
    <div className='relative border border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit'>
        <Image
            src="/icons/search.svg"
            alt="search"
            width={15}
            height={15}
        />
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