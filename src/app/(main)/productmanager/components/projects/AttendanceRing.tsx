"use client"

import React from "react"

export default function AttendanceRing({ percentage }: { percentage: number }) {
  const radius = 16
  const stroke = 3.5
  const normalizedRadius = radius - stroke / 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
      <svg height="40" width="40" className="transform -rotate-90">
        <circle
          stroke="#E5E7EB"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx="20"
          cy="20"
        />
        <circle
          stroke="#5B50EC"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx="20"
          cy="20"
        />
      </svg>
    </div>
  )
}

