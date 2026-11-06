"use client"

import { useState, useMemo } from "react"
import { useParams, useRouter, usePathname } from "next/navigation"
import { ArrowLeft, Article } from "phosphor-react"
import {
  ReusableTable,
  ReusablePagination,
  ReusableDateFilter,
} from "@/components/reusableComponents"
import { getMemberById } from "../../data/teamAttendanceData"
import { HR_ATTENDANCE_RECORDS } from "../../../hr/attendance-leaves/data/hrAttendanceData"
import MemberProfileBanner from "./components/MemberProfileBanner"
import MemberStatCards from "./components/MemberStatCards"
import MonthlyTrendChart from "./components/MonthlyTrendChart"
import { memberHistoryColumns } from "./components/memberHistoryColumns"

export default function TeamMemberDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const pathname = usePathname()

  const isFinance =
    pathname?.startsWith("/financemanager") || pathname?.startsWith("/finance")
  const isHrManager = pathname?.startsWith("/hrmanager")
  const isHr = !isHrManager && pathname?.startsWith("/hr")
  const isProductManager = pathname?.startsWith("/productmanager")
  const isEmployee = pathname?.startsWith("/employee")

  const backHref = pathname?.startsWith("/financemanager")
    ? "/financemanager/attendance?tab=my-attendance"
    : isFinance
    ? "/finance/attendance?tab=my-attendance"
    : isHrManager
    ? "/hrmanager/attendance?tab=organization-attendance"
    : isHr
    ? "/hr/attendance?tab=organization-attendance"
    : isProductManager
    ? "/productmanager/attendance?tab=team-attendance"
    : isEmployee
    ? "/employee/attendance?tab=my-attendance"
    : "/teamlead/attendance?tab=team-attendance"

  const memberId = (params?.id as string) || "EMP001"

  const member = useMemo(() => {
    const base = getMemberById(memberId) || getMemberById("EMP001")!
    const hrRecord = HR_ATTENDANCE_RECORDS.find(
      (r) => r.id === memberId || r.employeeId.toLowerCase() === memberId.toLowerCase()
    )
    if (hrRecord) {
      return {
        ...base,
        id: hrRecord.id,
        name: hrRecord.name,
        employeeId: hrRecord.employeeId,
        department: hrRecord.department,
        designation: hrRecord.designation || hrRecord.role || base.designation,
        avatar: hrRecord.avatar || base.avatar,
      }
    }
    return base
  }, [memberId])

  const [historyPage, setHistoryPage] = useState(1)
  const [historyPageSize, setHistoryPageSize] = useState(5)
  const [historyDateFilter, setHistoryDateFilter] = useState<
    Date | { startDate: Date; endDate: Date } | null
  >(null)

  const totalHistoryPages = Math.max(
    1,
    Math.ceil(member.history.length / historyPageSize)
  )

  const paginatedHistory = useMemo(() => {
    const start = (historyPage - 1) * historyPageSize
    return member.history.slice(start, start + historyPageSize)
  }, [member.history, historyPage, historyPageSize])

  return (
    <div className="w-full flex-1 p-3 sm:p-4 md:p-6 pb-16 sm:pb-8 flex flex-col gap-4 sm:gap-5 max-w-[1600px] mx-auto animate-in fade-in duration-200 min-w-0">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => router.push(backHref)}
          className="p-2 rounded-xl bg-white border border-gray-100 hover:border-gray-200 hover:bg-gray-50 text-gray-700 shadow-2xs transition-all cursor-pointer inline-flex items-center justify-center shrink-0"
          aria-label="Back to attendance"
        >
          <ArrowLeft size={18} weight="bold" />
        </button>
        <span className="text-sm font-bold text-gray-800">
          Back to Attendance
        </span>
      </div>

      <MemberProfileBanner member={member} />

      <MemberStatCards
        attendancePercentage={member.attendancePercentage}
        presentDays={member.presentDays}
        leaveDays={member.leaveDays}
        lateDays={member.lateDays}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
        <div className="lg:col-span-5 h-full">
          <MonthlyTrendChart
            monthlyTrends={member.monthlyTrends}
            trends={member.monthlyTrends}
          />
        </div>

        <div className="lg:col-span-7 bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs flex flex-col justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#5B50EC]/10 text-[#5B50EC] flex items-center justify-center shrink-0">
                <Article size={16} weight="bold" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">
                Attendance History
              </h3>
            </div>

            <ReusableDateFilter
              value={historyDateFilter}
              onChange={setHistoryDateFilter}
              modes={["date", "month", "year"]}
              title="Attendance History Filter"
            />
          </div>

          <div className="flex-1 w-full">
            <ReusableTable
              columns={memberHistoryColumns}
              data={paginatedHistory}
              keyExtractor={(row) => row.id}
              headerBgColor="#F7F6FE"
              headerTextColor="#374151"
              headerRounded="rounded-xl"
              rowHover={true}
              tableClassName="text-xs min-w-[620px]"
              containerClassName="w-full rounded-xl border border-gray-100/60 pb-1"
              maxHeight="285px"
            />
          </div>

          <div className="flex-shrink-0">
            <ReusablePagination
              currentPage={historyPage}
              totalPages={totalHistoryPages}
              onPageChange={setHistoryPage}
              totalItems={member.history.length}
              pageSize={historyPageSize}
              onPageSizeChange={(newSize) => {
                setHistoryPageSize(newSize)
                setHistoryPage(1)
              }}
              pageSizeOptions={[5, 10, 20]}
              showPageSize={true}
              showTotalInfo={true}
              showJumpToPage={true}
              layout="two-row"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
