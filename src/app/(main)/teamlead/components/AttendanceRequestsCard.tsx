"use client"

import { CaretRight } from "phosphor-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface AttendanceRequestsCardProps {
  newApprovalCount?: number
  pendingCount?: number
  newApprovalHref?: string
  pendingHref?: string
  href?: string
}

export default function AttendanceRequestsCard({
  newApprovalCount = 3,
  pendingCount = 2,
  newApprovalHref,
  pendingHref,
  href,
}: AttendanceRequestsCardProps) {
  const pathname = usePathname()
  const isEmployee = pathname?.startsWith("/employee")
  const isAsstManager = pathname?.startsWith("/asstmanager")

  const targetHref =
    href ||
    (isAsstManager
      ? "/asstmanager/attendance?tab=requests&subtab=team-requests"
      : isEmployee
      ? "/employee/attendance?tab=requests&subtab=my-requests"
      : "/teamlead?tab=requests")
  const targetNewApprovalHref =
    newApprovalHref ||
    (isAsstManager
      ? "/asstmanager/attendance?tab=requests&subtab=team-requests&status=Pending"
      : isEmployee
      ? "/employee/attendance?tab=requests&subtab=my-requests"
      : "/teamlead?tab=requests&status=Pending")
  const targetPendingHref =
    pendingHref ||
    (isAsstManager
      ? "/asstmanager/attendance?tab=requests&subtab=team-requests&status=Pending"
      : isEmployee
      ? "/employee/attendance?tab=requests&subtab=my-requests&status=Pending"
      : "/teamlead?tab=requests&status=Pending")

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col justify-between transition-all hover:shadow-md min-h-[110px] h-auto">
      <Link
        href={targetHref}
        className="text-sm font-bold text-[#1F2433] hover:text-[#5B50EC] transition-colors w-fit"
      >
        Attendance Requests
      </Link>

      <div className="flex flex-col gap-1.5 pt-1">
        <Link
          href={targetNewApprovalHref}
          className="flex items-center justify-between text-xs text-gray-700 hover:text-[#5B50EC] transition-colors py-0.5 group"
        >
          <span className="font-medium group-hover:translate-x-0.5 transition-transform">
            {isEmployee ? "My Submissions" : "New Approval"}
          </span>
          <div className="flex items-center gap-1.5 text-gray-400 group-hover:text-[#5B50EC]">
            {newApprovalCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#5B50EC]/10 text-[#5B50EC] text-[10px] font-bold flex items-center justify-center">
                {newApprovalCount}
              </span>
            )}
            <CaretRight size={14} weight="bold" />
          </div>
        </Link>

        <Link
          href={targetPendingHref}
          className="flex items-center justify-between text-xs text-gray-700 hover:text-[#5B50EC] transition-colors py-0.5 group"
        >
          <span className="font-medium group-hover:translate-x-0.5 transition-transform">
            Pending
          </span>
          <div className="flex items-center gap-1.5 text-gray-400 group-hover:text-[#5B50EC]">
            {pendingCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#F59E0B]/10 text-[#F59E0B] text-[10px] font-bold flex items-center justify-center">
                {pendingCount}
              </span>
            )}
            <CaretRight size={14} weight="bold" />
          </div>
        </Link>
      </div>
    </div>
  )
}
