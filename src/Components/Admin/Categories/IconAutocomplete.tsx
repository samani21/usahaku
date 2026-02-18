'use client'

import { useEffect, useRef, useState } from 'react'
import { Icon } from '@iconify/react'

type Props = {
    value?: string
    onChange?: (val: string) => void
    prefix?: string
}

export default function IconAutocomplete({
    value = '',
    onChange,
    prefix = 'mdi',
}: Props) {
    const wrapperRef = useRef<HTMLDivElement>(null)

    const [search, setSearch] = useState('')
    const [filtered, setFiltered] = useState<string[]>([])
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    // 🔹 SEARCH via API (lebih ringan dari fetch collection)
    useEffect(() => {
        const delay = setTimeout(async () => {
            if (!search) {
                setFiltered([])
                return
            }

            setLoading(true)

            try {
                const res = await fetch(
                    `https://api.iconify.design/search?query=${search}`
                )
                const data = await res.json()
                setFiltered(data.icons || [])
            } catch (err) {
                console.error(err)
            }

            setLoading(false)
        }, 300)

        return () => clearTimeout(delay)
    }, [search])

    // 🔥 CLICK OUTSIDE HANDLER
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div ref={wrapperRef} className="relative w-full">
            <div className="flex items-center border rounded px-2">
                {value && (
                    <Icon icon={value} width={20} className="mr-2 text-gray-600" />
                )}

                <input
                    type="text"
                    value={search}
                    onFocus={() => setOpen(true)}
                    onChange={(e) => {
                        setSearch(e.target.value)
                        setOpen(true)
                    }}
                    placeholder="Search icon..."
                    className="w-full py-2 outline-none"
                />
            </div>

            {/* DROPDOWN */}
            {open && (
                <div className="absolute z-50 w-full max-h-64 overflow-auto bg-white border rounded mt-1 shadow">
                    {loading && (
                        <div className="p-3 text-sm text-gray-500">
                            Loading...
                        </div>
                    )}

                    {!loading && filtered.length === 0 && search && (
                        <div className="p-3 text-sm text-gray-500">
                            Icon tidak ditemukan
                        </div>
                    )}

                    {filtered.map((icon) => (
                        <div
                            key={icon}
                            onClick={() => {
                                onChange?.(icon)
                                setSearch(icon)
                                setOpen(false)
                            }}
                            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            <Icon icon={icon} width={20} />
                            <span>{icon}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
