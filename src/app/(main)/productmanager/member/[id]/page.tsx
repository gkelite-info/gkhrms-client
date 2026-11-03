"use client"

import { Suspense, useMemo } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft } from "phosphor-react"
import {
  getMemberById,
} from "@/app/(main)/teamlead/data/teamAttendanceData"
import { getProductMemberDetailsById } from "../../data/productAttendanceData"
import MemberProfileBanner from "@/app/(main)/teamlead/member/[id]/components/MemberProfileBanner"
import MemberStatCards from "@/app/(main)/teamlead/member/[id]/components/MemberStatCards"
import MonthlyTrendChart from "@/app/(main)/teamlead/member/[id]/components/MonthlyTrendChart"
import MemberAttendanceHistoryCard from "./components/MemberAttendanceHistoryCard"

function ProductMemberDetailsContent() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const memberId = (params?.id as string) || "EMP1821"
  const projectParam = searchParams.get("project")

  const member = useMemo(() => {
    const pmMember = getProductMemberDetailsById(memberId)
    if (pmMember) return pmMember
    return getMemberById(memberId) || getMemberById("EMP001")!
  }, [memberId])

  const handleBack = () => {
    const query = projectParam ? `&project=${projectParam}` : ""
    router.push(`/productmanager/attendance?tab=team-attendance${query}`)
  }

  return (
    <div className="w-full flex-1 p-3 sm:p-4 md:p-6 pb-16 sm:pb-8 flex flex-col gap-4 sm:gap-5 max-w-[1600px] mx-auto animate-in fade-in duration-200 min-w-0">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleBack}
          className="p-2 sm:p-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-[#5B50EC] hover:border-[#5B50EC] transition-all cursor-pointer shadow-2xs shrink-0 flex items-center justify-center"
          title="Back to Product Team Attendance"
          aria-label="Back to Product Team Attendance"
        >
          <ArrowLeft size={18} weight="bold" />
        </button>
        <div className="flex flex-col min-w-0">
          <h1 className="text-base sm:text-lg font-bold text-gray-900 leading-tight truncate">
            Team Member Attendance Details
          </h1>
          <p className="text-xs text-gray-400 font-medium mt-0.5 truncate">
            View detailed attendance records, monthly statistics and history.
          </p>
        </div>
      </div>

      <MemberProfileBanner
        member={{
          avatar: member.avatar || undefined,
          name: member.name,
          designation: member.designation,
          employeeId: member.employeeId,
          department: member.department,
        }}
      />

      <MemberStatCards
        attendancePercentage={member.attendancePercentage}
        presentDays={member.presentDays}
        leaveDays={member.leaveDays}
        lateDays={member.lateDays}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <MonthlyTrendChart monthlyTrends={member.monthlyTrends} />
        <MemberAttendanceHistoryCard history={member.history} />
      </div>
    </div>
  )
}

export default function ProductMemberDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-[400px] flex items-center justify-center text-xs text-gray-400">
          Loading...
        </div>
      }
    >
      <ProductMemberDetailsContent />
    </Suspense>
  )
}
