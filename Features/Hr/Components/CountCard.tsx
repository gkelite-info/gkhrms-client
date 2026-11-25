"use client"

import { useEffect, useState, type ReactNode } from "react"
import { motion } from "framer-motion"

type CountCardProps = {
  title: string
  count: number
  icon: ReactNode
  iconBg?: string
  style?: string
}

export default function CountCard({
  title,
  count,
  icon,
  iconBg = "#E0DEFBD6",
  style = "min-h-[85px] sm:h-[100px]",
}: CountCardProps) {
  const [displayCount, setDisplayCount] = useState(0)

  useEffect(() => {
    let start = 0
    const end = count
    if (start === end) return

    const increment = end / 50
    const counter = setInterval(() => {
      start += increment
      if (start >= end) {
        start = end
        clearInterval(counter)
      }
      setDisplayCount(Math.floor(start))
    }, 30)

    return () => clearInterval(counter)
  }, [count])

  return (
    <motion.div
      className={`w-full shadow-xs rounded-2xl cursor-pointer flex justify-between sm:justify-around items-center transition-all hover:shadow-md px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-gray-100 ${style}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.span
        className="w-[38px] h-[38px] sm:w-[48px] sm:h-[48px] rounded-full flex justify-center items-center shrink-0"
        style={{ backgroundColor: iconBg }}
      >
        {icon}
      </motion.span>
      <div className="flex flex-col text-right sm:text-center pl-2 sm:pl-0 min-w-0">
        <span className="text-[#323232] font-semibold text-[11px] sm:text-xs leading-tight truncate">
          {title}
        </span>
        <span className="text-lg sm:text-2xl font-bold text-[#323232] mt-0.5">
          {displayCount}
        </span>
      </div>
    </motion.div>
  )
}
