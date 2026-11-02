"use client"

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react"
import { CaretLeft, CaretRight } from "phosphor-react"

interface YearViewProps {
  navYear: number
  selectedYear?: number
  minYear?: number
  onPrevDecade: () => void
  onNextDecade: () => void
  onSelectYear: (year: number) => void
}

const SCROLL_STEP = 168

export default function YearView({
  navYear,
  selectedYear,
  minYear,
  onSelectYear,
}: YearViewProps) {
  const currentYear = new Date().getFullYear()
  const activeYear = selectedYear || navYear || currentYear

  const startYear = useMemo(() => {
    if (minYear !== undefined) return minYear
    return Math.min(2025, activeYear, currentYear)
  }, [minYear, activeYear, currentYear])

  const [maxYear, setMaxYear] = useState(() =>
    Math.max(startYear + 35, activeYear + 15)
  )

  const [visibleDecade, setVisibleDecade] = useState(
    Math.floor(activeYear / 10) * 10
  )

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const selectedYearRef = useRef<HTMLButtonElement>(null)

  const yearsList = useMemo(() => {
    const list: number[] = []
    for (let yr = startYear; yr <= maxYear; yr++) {
      list.push(yr)
    }
    return list
  }, [startYear, maxYear])

  const scrollToActiveYear = useCallback((smooth = false) => {
    const container = scrollContainerRef.current
    const target = selectedYearRef.current
    if (!container || !target) return

    const containerTop = container.getBoundingClientRect().top
    const targetTop = target.getBoundingClientRect().top
    const relativeTop = targetTop - containerTop + container.scrollTop
    const centeredTop =
      relativeTop - container.clientHeight / 2 + target.clientHeight / 2

    container.scrollTo({
      top: Math.max(0, centeredTop),
      behavior: smooth ? "smooth" : "auto",
    })
  }, [])

  useEffect(() => {
    scrollToActiveYear(false)
    const frameId = requestAnimationFrame(() => scrollToActiveYear(false))
    const timer = setTimeout(() => scrollToActiveYear(false), 50)
    return () => {
      cancelAnimationFrame(frameId)
      clearTimeout(timer)
    }
  }, [activeYear, scrollToActiveYear])

  const handleScroll = () => {
    const el = scrollContainerRef.current
    if (!el) return

    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 50) {
      setMaxYear((prev) => prev + 24)
    }

    const rowIdx = Math.floor((el.scrollTop + 36) / 42)
    const topYear = startYear + rowIdx * 3
    const newDecade = Math.floor(Math.max(startYear, topYear) / 10) * 10
    setVisibleDecade(newDecade)
  }

  const handleStepDecade = (delta: number) => {
    const el = scrollContainerRef.current
    if (!el) return

    if (delta > 0 && el.scrollTop + el.clientHeight >= el.scrollHeight - 100) {
      setMaxYear((prev) => prev + 24)
    }

    el.scrollBy({
      top: delta * SCROLL_STEP,
      behavior: "smooth",
    })
  }

  const decadeEnd = visibleDecade + 9

  return (
    <div className="w-full flex flex-col gap-2 pt-0.5">
      <div className="flex items-center justify-between text-xs font-bold text-gray-800 px-2.5 py-1.5 bg-gray-50/90 rounded-xl border border-gray-100 shrink-0">
        <span>{visibleDecade} – {decadeEnd}</span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => handleStepDecade(-1)}
            title="Scroll Up"
            className="p-1 rounded-lg hover:bg-white text-gray-600 hover:text-[#5B50EC] transition-all cursor-pointer shadow-2xs"
          >
            <CaretLeft size={14} weight="bold" />
          </button>
          <button
            type="button"
            onClick={() => handleStepDecade(1)}
            title="Scroll Down"
            className="p-1 rounded-lg hover:bg-white text-gray-600 hover:text-[#5B50EC] transition-all cursor-pointer shadow-2xs"
          >
            <CaretRight size={14} weight="bold" />
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="h-[200px] overflow-y-auto pr-1 space-y-1 custom-scrollbar my-0.5"
      >
        <div className="grid grid-cols-3 gap-1.5 pt-0.5">
          {yearsList.map((yr) => {
            const isSelected = activeYear === yr
            const isCurrent = currentYear === yr

            return (
              <button
                key={yr}
                ref={isSelected ? selectedYearRef : undefined}
                type="button"
                onClick={() => onSelectYear(yr)}
                className={`h-9 px-1 rounded-xl text-xs font-semibold transition-all cursor-pointer select-none text-center flex items-center justify-center ${
                  isSelected
                    ? "bg-[#5B50EC] text-white shadow-xs font-bold"
                    : isCurrent
                    ? "bg-[#F1F0FD] text-[#5B50EC] border border-[#5B50EC]/40 font-bold"
                    : "bg-gray-50 hover:bg-[#F1F0FD] text-gray-700 hover:text-[#5B50EC]"
                }`}
              >
                {yr}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-gray-400 font-medium pt-2 border-t border-gray-100 px-1 shrink-0">
        <span className="text-[10px]">{startYear} – Future Years</span>
        <button
          type="button"
          onClick={() => {
            onSelectYear(currentYear)
            scrollToActiveYear(true)
          }}
          className="text-[#5B50EC] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
        >
          <span>Current Year ({currentYear})</span>
        </button>
      </div>
    </div>
  )
}
