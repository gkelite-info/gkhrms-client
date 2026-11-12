import React from "react"

export interface IndiaFlagProps {
  className?: string
}

export default function IndiaFlag({ className = "w-5 h-3.5" }: IndiaFlagProps) {
  return (
    <svg
      viewBox="0 0 900 600"
      className={`${className} inline-block shrink-0 rounded-xs shadow-xs`}
      aria-label="India Flag"
    >
      <rect width="900" height="200" fill="#FF9933" />
      <rect y="200" width="900" height="200" fill="#FFFFFF" />
      <rect y="400" width="900" height="200" fill="#138808" />
      <circle cx="450" cy="300" r="80" fill="none" stroke="#000080" strokeWidth="8" />
      <circle cx="450" cy="300" r="16" fill="#000080" />
      {Array.from({ length: 24 }).map((_, i) => {
        const rad = (i * 360 * Math.PI) / (24 * 180)
        return (
          <line
            key={i}
            x1="450"
            y1="300"
            x2={450 + 80 * Math.cos(rad)}
            y2={300 + 80 * Math.sin(rad)}
            stroke="#000080"
            strokeWidth="3"
          />
        )
      })}
    </svg>
  )
}

