"use client"

import { useState, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Clock } from "phosphor-react"
import toast, { Toaster } from "react-hot-toast"
import { DateFilterValue, ReusablePagination } from "@/components/reusableComponents"
import {
  INITIAL_HR_EXCEPTIONS,
  HrExceptionItem,
  ExceptionType,
  getExceptionRole,
} from "./hrExceptionData"
import HrExceptionStatsCards from "./HrExceptionStatsCards"
import HrExceptionFilterBar from "./HrExceptionFilterBar"
import HrExceptionSubtabs, { HrExceptionSubtabKey } from "./HrExceptionSubtabs"
import HrExceptionCardItem from "./HrExceptionCardItem"
import HrExceptionDetailsModal from "./HrExceptionDetailsModal"

interface HrExceptionHistorySectionProps {
  hideHrDepartment?: boolean
}

export default function HrExceptionHistorySection({
  hideHrDepartment = false,
}: HrExceptionHistorySectionProps = {}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const subtabParam = searchParams.get("subtab") as HrExceptionSubtabKey | null
  const activeSubtab: HrExceptionSubtabKey =
    subtabParam &&
    ["all", "late-check-in", "missed-check-out", "low-hours", "repeated-absences"].includes(
      subtabParam
    )
      ? subtabParam
      : "all"

  const [exceptions, setExceptions] = useState<HrExceptionItem[]>(() =>
    hideHrDepartment
      ? INITIAL_HR_EXCEPTIONS.filter(
          (e) =>
            e.department !== "Human Resources" && getExceptionRole(e) !== "HR"
        )
      : INITIAL_HR_EXCEPTIONS
  )
  const [appliedFilters, setAppliedFilters] = useState<{
    department: string
    selectedRoles: string[]
    status: string
    fromDate: DateFilterValue
    toDate: DateFilterValue
  }>({
    department: "All Departments",
    selectedRoles: [],
    status: "All",
    fromDate: new Date(2025, 7, 25),
    toDate: new Date(2025, 7, 25),
  })

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [selectedItemForModal, setSelectedItemForModal] = useState<HrExceptionItem | null>(null)

  const counts = useMemo(() => {
    return {
      all: exceptions.length,
      lateCheckIn: exceptions.filter((e) => e.exceptionType === "Late Check-in").length,
      missedCheckOut: exceptions.filter((e) => e.exceptionType === "Missed Check-out").length,
      lowHours: exceptions.filter((e) => e.exceptionType === "Low Working Hours").length,
      repeatedAbsences: exceptions.filter((e) => e.exceptionType === "Repeated Absences").length,
    }
  }, [exceptions])

  const filteredExceptions = useMemo(() => {
    return exceptions.filter((item) => {
      if (activeSubtab === "late-check-in" && item.exceptionType !== "Late Check-in") {
        return false
      }
      if (activeSubtab === "missed-check-out" && item.exceptionType !== "Missed Check-out") {
        return false
      }
      if (activeSubtab === "low-hours" && item.exceptionType !== "Low Working Hours") {
        return false
      }
      if (activeSubtab === "repeated-absences" && item.exceptionType !== "Repeated Absences") {
        return false
      }

      if (
        appliedFilters.department !== "All Departments" &&
        item.department.toLowerCase() !== appliedFilters.department.toLowerCase()
      ) {
        return false
      }

      if (
        appliedFilters.selectedRoles.length > 0 &&
        !appliedFilters.selectedRoles.includes(getExceptionRole(item))
      ) {
        return false
      }

      if (
        appliedFilters.status &&
        appliedFilters.status !== "All" &&
        item.status !== appliedFilters.status
      ) {
        return false
      }

      return true
    })
  }, [exceptions, activeSubtab, appliedFilters])

  const totalPages = Math.max(1, Math.ceil(filteredExceptions.length / pageSize))
  const paginatedExceptions = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredExceptions.slice(start, start + pageSize)
  }, [filteredExceptions, currentPage, pageSize])

  const handleApplyFilters = (filters: {
    department: string
    selectedRoles: string[]
    status: string
    fromDate: DateFilterValue
    toDate: DateFilterValue
  }) => {
    setAppliedFilters(filters)
    setCurrentPage(1)
  }

  const handleResetFilters = () => {
    setAppliedFilters({
      department: "All Departments",
      selectedRoles: [],
      status: "All",
      fromDate: new Date(2025, 7, 25),
      toDate: new Date(2025, 7, 25),
    })
    setCurrentPage(1)
    const params = new URLSearchParams(searchParams.toString())
    params.set("tab", "exception-history")
    params.set("subtab", "all")
    router.push(`?${params.toString()}`, { scroll: false })
  }

  const handleSelectStatCard = (type: ExceptionType | "All") => {
    const keyMap: Record<string, HrExceptionSubtabKey> = {
      "Late Check-in": "late-check-in",
      "Missed Check-out": "missed-check-out",
      "Low Working Hours": "low-hours",
      "Repeated Absences": "repeated-absences",
      All: "all",
    }
    const targetSubtab = keyMap[type] || "all"
    const params = new URLSearchParams(searchParams.toString())
    params.set("tab", "exception-history")
    params.set("subtab", targetSubtab)
    router.push(`?${params.toString()}`, { scroll: false })
    setCurrentPage(1)
  }

  const handleRegularize = (id: string, correctedTime: string, reason: string) => {
    setExceptions((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "Regularized",
              correctedCheckInTime: correctedTime,
              regularizationReason: reason,
            }
          : item
      )
    )
    toast.success("Attendance regularized successfully")
    setSelectedItemForModal(null)
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-5 w-full min-w-0">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs flex items-center justify-between gap-4 min-w-0 transition-all">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#FFF1F2] text-[#E11D48] flex items-center justify-center shrink-0">
            <Clock size={24} weight="bold" />
          </div>
          <div className="flex flex-col min-w-0">
            <h1 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
              Attendance Exceptions
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 font-medium mt-0.5">
              Identify and review attendance issues across the organization.
            </p>
          </div>
        </div>
      </div>

      <HrExceptionStatsCards
        lateCheckInsCount={counts.lateCheckIn}
        missedCheckOutsCount={counts.missedCheckOut}
        lowWorkingHoursCount={counts.lowHours}
        repeatedAbsencesCount={counts.repeatedAbsences}
        selectedType={
          activeSubtab === "late-check-in"
            ? "Late Check-in"
            : activeSubtab === "missed-check-out"
            ? "Missed Check-out"
            : activeSubtab === "low-hours"
            ? "Low Working Hours"
            : activeSubtab === "repeated-absences"
            ? "Repeated Absences"
            : null
        }
        onSelectType={handleSelectStatCard}
      />

      <HrExceptionFilterBar
        hideHrDepartment={hideHrDepartment}
        department={appliedFilters.department}
        selectedRoles={appliedFilters.selectedRoles}
        status={appliedFilters.status}
        fromDate={appliedFilters.fromDate}
        toDate={appliedFilters.toDate}
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
      />

      <div className="flex flex-col gap-3 min-w-0">
        <HrExceptionSubtabs
          activeSubtab={activeSubtab}
          counts={counts}
          onSubtabChange={() => setCurrentPage(1)}
        />

        <div className="flex flex-col gap-3 mt-1 min-w-0">
          {paginatedExceptions.length > 0 ? (
            paginatedExceptions.map((item) => (
              <HrExceptionCardItem
                key={item.id}
                item={item}
                onViewDetails={setSelectedItemForModal}
              />
            ))
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 flex flex-col items-center justify-center gap-2">
              <span className="text-sm font-semibold text-gray-700">
                No exceptions found
              </span>
              <span className="text-xs text-gray-400">
                Try adjusting your filters or date range to see results.
              </span>
            </div>
          )}
        </div>

        {filteredExceptions.length > 0 && (
          <div className="pt-2">
            <ReusablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredExceptions.length}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
              onPageSizeChange={(newSize) => {
                setPageSize(newSize)
                setCurrentPage(1)
              }}
              pageSizeOptions={[5, 10, 20, 50]}
              showPageSize={true}
              showTotalInfo={true}
              showJumpToPage={true}
              align="between"
            />
          </div>
        )}
      </div>

      <HrExceptionDetailsModal
        isOpen={Boolean(selectedItemForModal)}
        onClose={() => setSelectedItemForModal(null)}
        item={selectedItemForModal}
        onRegularize={handleRegularize}
      />
    </div>
  )
}
