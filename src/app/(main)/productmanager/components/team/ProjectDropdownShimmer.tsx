"use client"

import React from "react"

export default function ProjectDropdownShimmer() {
  return (
    <div className="flex flex-col gap-1 pt-1">
      {[1, 2].map((k) => (
        <div
          key={k}
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl animate-pulse"
        >
          <div className="w-7 h-7 rounded-lg bg-gray-200 shrink-0" />
          <div className="flex flex-col gap-1.5 flex-1 min-w-0">
            <div className="h-3 w-28 bg-gray-200 rounded" />
            <div className="h-2 w-16 bg-gray-100 rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}

