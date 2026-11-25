"use client"

import React from "react"

type InfoItemProps = {
  icon: React.ReactNode
  count: number | string
  label: string
  bgColor?: string
}

const Approvals: React.FC<InfoItemProps> = ({
  icon,
  count,
  label,
  bgColor,
}) => {
  return (
    <div className="w-full flex items-center gap-3 sm:gap-4">
      <span
        className="w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] rounded-full flex justify-center items-center shrink-0 shadow-2xs"
        style={{ backgroundColor: bgColor || "#51B677" }}
      >
        {icon}
      </span>
      <span className="font-bold text-lg sm:text-xl text-[#323232] min-w-[28px] sm:min-w-[32px]">
        {count}
      </span>
      <span className="text-[#323232] font-medium text-xs truncate">{label}</span>
    </div>
  )
}

export default Approvals
