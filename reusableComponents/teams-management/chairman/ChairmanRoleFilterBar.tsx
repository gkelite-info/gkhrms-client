"use client"

import React from "react"
import { ChairmanRoleCategory, ChairmanRoleCategoryId } from "./types"

interface ChairmanRoleFilterBarProps {
  categories: ChairmanRoleCategory[]
  activeCategory: ChairmanRoleCategoryId
  onSelectCategory: (category: ChairmanRoleCategoryId) => void
}

export default function ChairmanRoleFilterBar({
  categories,
  activeCategory,
  onSelectCategory,
}: ChairmanRoleFilterBarProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100/80 shadow-2xs p-1.5 sm:p-2 flex items-center gap-1.5 sm:gap-2 overflow-x-auto custom-scrollbar">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={`shrink-0 px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              isActive
                ? "bg-[#EEF2FF] text-[#5046E5] font-semibold shadow-2xs"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium"
            }`}
          >
            <span>{cat.label}</span>
            {cat.count !== undefined && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                  isActive
                    ? "bg-[#5046E5]/15 text-[#5046E5]"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {cat.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
