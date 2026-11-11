"use client"

import { useRouter, usePathname } from "next/navigation"
import { CalendarBlank, ArrowLeft } from "phosphor-react"

interface AttendanceBannerProps {
  onBack?: () => void
}

export default function AttendanceBanner({ onBack }: AttendanceBannerProps) {
  const router = useRouter()
  const pathname = usePathname()
  const defaultBack = pathname?.startsWith("/superadmin")
    ? "/superadmin/attendance"
    : pathname?.startsWith("/chairman")
    ? "/chairman/attendance"
    : pathname?.startsWith("/asstmanager")
    ? "/asstmanager/attendance"
    : pathname?.startsWith("/techadmin")
    ? "/techadmin/attendance"
    : pathname?.startsWith("/accountantmanager")
    ? "/accountantmanager/attendance"
    : pathname?.startsWith("/accountantexecutive")
    ? "/accountantexecutive/attendance"
    : pathname?.startsWith("/financeexecutive")
    ? "/financeexecutive/attendance"
    : pathname?.startsWith("/financemanager")
    ? "/financemanager/attendance"
    : pathname?.startsWith("/finance")
    ? "/financemanager/attendance"
    : pathname?.startsWith("/hrmanager")
    ? "/hrmanager/attendance"
    : pathname?.startsWith("/hr")
    ? "/hr/attendance"
    : pathname?.startsWith("/manager")
    ? "/manager/attendance"
    : pathname?.startsWith("/productmanager")
    ? "/productmanager/attendance"
    : pathname?.startsWith("/employee")
    ? "/employee/attendance"
    : "/teamlead/attendance"

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      router.push(defaultBack)
    }
  }

  return (
    <div className="bg-white rounded-2xl p-3.5 sm:p-5 border border-gray-100 shadow-xs flex items-center justify-between gap-3 sm:gap-4 min-w-0 transition-all">
      <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
        <button
          type="button"
          onClick={handleBack}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 hover:border-[#5B50EC] text-gray-700 flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-2xs group"
          aria-label="Back to Attendance"
        >
          <ArrowLeft
            size={18}
            weight="bold"
            className="group-hover:-translate-x-0.5 transition-transform"
          />
        </button>

        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#EEF2FF] text-[#5B50EC] flex items-center justify-center shrink-0">
          <CalendarBlank size={22} weight="bold" />
        </div>

        <div className="flex flex-col min-w-0">
          <h1 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
            Attendance
          </h1>
          <p className="text-[11px] sm:text-sm text-gray-400 font-medium mt-0.5 break-words">
            Track attendance, manage leaves and view team attendance details.
          </p>
        </div>
      </div>
    </div>
  )
}
