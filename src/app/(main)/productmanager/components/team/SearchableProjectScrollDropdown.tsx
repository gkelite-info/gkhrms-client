"use client"

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react"
import { CaretDown, MagnifyingGlass, Check, X } from "phosphor-react"
import { EXTENDED_PROJECTS_LIST } from "../../data/productAttendanceData"
import ProjectDropdownShimmer from "./ProjectDropdownShimmer"

interface SearchableProjectScrollDropdownProps {
  value: string
  onChange: (projectId: string) => void
  className?: string
}

const PAGE_SIZE = 5

export default function SearchableProjectScrollDropdown({
  value,
  onChange,
  className = "",
}: SearchableProjectScrollDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [displayedCount, setDisplayedCount] = useState(PAGE_SIZE)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const selectedProject = useMemo(() => {
    return EXTENDED_PROJECTS_LIST.find((p) => p.id === value) || EXTENDED_PROJECTS_LIST[0]
  }, [value])

  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return EXTENDED_PROJECTS_LIST
    const q = searchQuery.toLowerCase().trim()
    return EXTENDED_PROJECTS_LIST.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q))
    )
  }, [searchQuery])

  const visibleProjects = useMemo(() => {
    return filteredProjects.slice(0, displayedCount)
  }, [filteredProjects, displayedCount])

  const hasMore = visibleProjects.length < filteredProjects.length

  const handleScroll = useCallback(() => {
    if (!listRef.current || isLoadingMore || !hasMore) return
    const { scrollTop, scrollHeight, clientHeight } = listRef.current
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      setIsLoadingMore(true)
      setTimeout(() => {
        setDisplayedCount((prev) => prev + PAGE_SIZE)
        setIsLoadingMore(false)
      }, 500)
    }
  }, [isLoadingMore, hasMore])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full sm:w-52 h-10 px-3.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-semibold text-gray-800 bg-white hover:bg-gray-50 flex items-center justify-between shadow-2xs transition-colors cursor-pointer"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="truncate">{selectedProject?.name || "Select Project"}</span>
        <CaretDown
          size={14}
          weight="bold"
          className={`text-gray-400 transition-transform duration-200 shrink-0 ml-2 ${
            isOpen ? "rotate-180 text-[#5B50EC]" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1.5 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
          <div className="p-2.5 border-b border-gray-100 bg-[#FAFAFD]">
            <div className="relative w-full">
              <MagnifyingGlass
                size={15}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setDisplayedCount(PAGE_SIZE)
                }}
                placeholder="Search projects..."
                autoFocus
                className="w-full h-8 pl-8 pr-7 text-xs rounded-lg border border-gray-200 bg-white placeholder-gray-400 text-gray-800 focus:outline-none focus:border-[#5B50EC] transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={12} weight="bold" />
                </button>
              )}
            </div>
          </div>

          <div
            ref={listRef}
            onScroll={handleScroll}
            className="max-h-60 overflow-y-auto p-1.5 flex flex-col gap-1 select-none"
            role="listbox"
          >
            {visibleProjects.length === 0 ? (
              <div className="py-6 text-center text-xs text-gray-400">
                No projects found
              </div>
            ) : (
              visibleProjects.map((p) => {
                const isSelected = p.id === value
                const code = p.name.split(" ").map((w) => w[0]).join("").slice(0, 2)
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      onChange(p.id)
                      setIsOpen(false)
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#EEF2FF] text-[#5B50EC]"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-7 h-7 rounded-lg text-[10px] font-bold flex items-center justify-center shrink-0 ${
                          isSelected
                            ? "bg-[#5B50EC] text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {code}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-semibold truncate leading-tight">
                          {p.name}
                        </span>
                        <span className="text-[10px] text-gray-400 leading-tight mt-0.5">
                          {p.totalCount} members
                        </span>
                      </div>
                    </div>
                    {isSelected && (
                      <Check size={14} weight="bold" className="shrink-0 text-[#5B50EC]" />
                    )}
                  </button>
                )
              })
            )}

            {isLoadingMore && <ProjectDropdownShimmer />}
          </div>
        </div>
      )}
    </div>
  )
}
