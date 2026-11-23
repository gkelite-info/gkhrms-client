"use client"

import { motion } from "framer-motion"

const leaveItems = [
  {
    label: "Sick Leaves",
    dotColor: "#4C43DB",
    fromColor: "from-[#4C43DB]",
    toColor: "to-[#A7A2F2]",
    percent: 60,
  },
  {
    label: "Paid Leaves",
    dotColor: "#9D338E",
    fromColor: "from-[#9D338E]",
    toColor: "to-[#FF9FF1]",
    percent: 50,
  },
  {
    label: "Holidays",
    dotColor: "#CA8106",
    fromColor: "from-[#CA8106]",
    toColor: "to-[#FFC055]",
    percent: 42,
  },
  {
    label: "Unpaid Leaves",
    dotColor: "#82230F",
    fromColor: "from-[#82230F]",
    toColor: "to-[#E83E1B]",
    percent: 35,
  },
  {
    label: "Vacation",
    dotColor: "#B8C500",
    fromColor: "from-[#B8C500]",
    toColor: "to-[#F8FF91]",
    percent: 30,
  },
]

export default function EmployeeLeaveBalance() {
  return (
    <div className="w-full mt-4 sm:mt-5">
      <h3 className="text-xs sm:text-sm font-bold text-[#1F2937] mb-2 sm:mb-2.5">Leave Balance</h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3.5 w-full">
        {leaveItems.map((item, index) => (
          <div key={index} className="flex flex-col min-w-0">
            <div className="h-5 sm:h-6 w-full bg-[#E6E6E6] rounded-full overflow-hidden shadow-inner p-0.5">
              <motion.div
                className={`h-full rounded-full bg-gradient-to-r ${item.fromColor} ${item.toColor}`}
                initial={{ width: "0%" }}
                animate={{ width: `${item.percent}%` }}
                transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 }}
              />
            </div>

            <div className="flex items-center justify-center gap-1.5 mt-1.5 text-center">
              <span
                className="h-2 w-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.dotColor }}
              />
              <span className="text-[10px] sm:text-[11px] text-gray-600 font-medium truncate">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
