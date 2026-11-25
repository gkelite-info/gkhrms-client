"use client"

import React from "react"
import { motion } from "framer-motion"
import { Bank, ClockAfternoon, FileText } from "phosphor-react"

type DashboardItemProps = {
  icon: React.ReactNode
  title: string
  subtitle: string
  circleBgColor?: string
}

const PayroleDashboardCard: React.FC = () => {
  const dashboardItems: DashboardItemProps[] = [
    {
      icon: <FileText size={18} color="#fff" className="sm:w-5 sm:h-5" />,
      title: "Salary File Generated",
      subtitle: "Completed on June 25, 2025",
      circleBgColor: "#51B677",
    },
    {
      icon: <ClockAfternoon size={18} color="#fff" className="sm:w-5 sm:h-5" />,
      title: "Approvals Pending",
      subtitle: "3 departments pending approval",
      circleBgColor: "#3B82F6",
    },
    {
      icon: <Bank size={18} color="#fff" className="sm:w-5 sm:h-5" />,
      title: "Disbursement",
      subtitle: "Scheduled for June 30, 2025",
      circleBgColor: "#D1D5DB",
    },
  ]

  const complianceItems = [
    { label: "PF", color: "#5EC38A" },
    { label: "ESI", color: "#FBD56B" },
    { label: "TDS", color: "#F67062" },
  ]

  return (
    <div className="w-full lg:w-1/2 bg-[#F9FAFB] shadow-xs border border-gray-100 rounded-2xl p-4 sm:p-5 flex flex-col items-center gap-5 sm:gap-6 min-w-0">
      <h3 className="text-[#323232] font-semibold text-center text-xs sm:text-sm">
        Payroll Cycle Status
      </h3>

      <div className="w-full flex flex-col gap-6 sm:gap-8 px-2 sm:px-4">
        {dashboardItems.map((item, idx) => (
          <DashboardItem
            key={idx}
            {...item}
            isLast={idx === dashboardItems.length - 1}
          />
        ))}
      </div>

      <div className="w-full border-t border-gray-200/60 pt-4 flex flex-col items-center gap-3">
        <h3 className="text-[#323232] text-xs sm:text-sm font-semibold text-center">
          Compliance Alerts
        </h3>

        <div className="w-full flex flex-col gap-2.5 px-2 sm:px-4">
          {complianceItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 w-full">
              <span className="font-semibold w-[36px] text-xs sm:text-sm text-[#323232] shrink-0">
                {item.label}
              </span>
              <span
                className="flex-1 max-w-[200px] h-[22px] sm:h-[25px] rounded-md transition-all shadow-2xs"
                style={{ backgroundColor: item.color }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PayroleDashboardCard

const DashboardItem: React.FC<DashboardItemProps & { isLast?: boolean }> = ({
  icon,
  title,
  subtitle,
  circleBgColor = "#51B677",
  isLast,
}) => (
  <div className="flex items-start gap-3 sm:gap-4 relative min-w-0">
    <motion.span
      className="w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] flex justify-center items-center rounded-full relative shrink-0"
      style={{ backgroundColor: circleBgColor }}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {icon}

      {!isLast && (
        <motion.span
          className="absolute top-full left-1/2 -translate-x-1/2 w-px border-l-2 border-dotted border-gray-400"
          initial={{ height: 0 }}
          whileInView={{ height: 28 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      )}
    </motion.span>

    <div className="flex flex-col gap-0.5 min-w-0">
      <span className="text-[#323232] text-xs sm:text-sm font-medium truncate">
        {title}
      </span>
      <span className="text-[11px] sm:text-xs text-[#585858] truncate">
        {subtitle}
      </span>
    </div>
  </div>
)
