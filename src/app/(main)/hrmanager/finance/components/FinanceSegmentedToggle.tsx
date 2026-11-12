"use client"

import React from "react"

export interface SegmentedToggleOption<T extends string> {
  id: T
  label: string
}

export interface FinanceSegmentedToggleProps<T extends string> {
  options: SegmentedToggleOption<T>[]
  activeId: T
  onChange: (id: T) => void
  className?: string
}

export default function FinanceSegmentedToggle<T extends string>({
  options,
  activeId,
  onChange,
  className = "",
}: FinanceSegmentedToggleProps<T>) {
  return (
    <div
      className={`w-full bg-white rounded-2xl p-1.5 shadow-2xs border border-slate-100/80 flex items-center justify-between ${className}`}
    >
      <div
        className="grid gap-1.5 w-full"
        style={{
          gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))`,
        }}
      >
        {options.map((option) => {
          const isActive = option.id === activeId
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              className={`py-2.5 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer truncate text-center ${
                isActive
                  ? "bg-[#5B50EC] text-white shadow-xs"
                  : "bg-[#A3A3A3] text-white hover:bg-[#949494] shadow-2xs"
              }`}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

