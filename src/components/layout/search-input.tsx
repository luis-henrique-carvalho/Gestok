"use client";

import React from 'react'
import { useQueryState } from 'nuqs';
import { Input } from '@/components/ui/input'

type Props = {
    placeholder: string;
}

const SearchInput = ({ placeholder }: Props) => {
    const [query, setQuery] = useQueryState('query', {
        defaultValue: '',
        parse: (value) => value || '',
        shallow: false,
        throttleMs: 300,
    });

    const handleSearch = (value: string) => {
        setQuery(value);
    }

    return (
        <div className="relative flex flex-1 flex-shrink-0">
            <Input
                placeholder={placeholder}
                value={query || ''}
                onChange={(e) => handleSearch(e.target.value)}
            />
        </div>
    )
}

export default SearchInput
