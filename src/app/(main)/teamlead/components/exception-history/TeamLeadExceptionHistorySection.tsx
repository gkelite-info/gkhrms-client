"use client"

import { useMemo } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { ExceptionSubTab } from "./types"
import { teamMembersExceptions } from "./exceptionHistoryData"
import ExceptionHistoryHeader from "./ExceptionHistoryHeader"
import ExceptionHistorySubTabs from "./ExceptionHistorySubTabs"
import MyExceptionDetailsSection from "./MyExceptionDetailsSection"
import TeamMembersExceptionSection from "./TeamMembersExceptionSection"
import EmployeeExceptionHistorySection from "./EmployeeExceptionHistorySection"

export default function TeamLeadExceptionHistorySection() {
  const router = useRouter()
  const pathname = usePathname()
  const isEmployee = pathname?.startsWith("/employee")
  const basePath = pathname?.startsWith("/manager")
    ? "/manager/attendance"
    : isEmployee
    ? "/employee/attendance"
    : "/teamlead/attendance"
  const searchParams = useSearchParams()
  const subParam = searchParams.get("sub") as ExceptionSubTab | null
  const memberIdParam = searchParams.get("memberId")

  const activeSubTab: ExceptionSubTab = isEmployee ? "me" : subParam === "team" ? "team" : "me"

  const selectedMember = useMemo(() => {
    if (isEmployee || !memberIdParam) return null
    return teamMembersExceptions.find((m) => m.id === memberIdParam) || teamMembersExceptions[0]
  }, [memberIdParam, isEmployee])

  const handleSubTabChange = (tab: ExceptionSubTab) => {
    router.replace(`${basePath}?tab=exception-history&sub=${tab}`, { scroll: false })
  }

  const handleSelectMember = (memberId: string) => {
    router.push(`${basePath}?tab=exception-history&sub=team&memberId=${memberId}`, { scroll: false })
  }

  const handleBackToTeam = () => {
    router.push(`${basePath}?tab=exception-history&sub=team`, { scroll: false })
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-5 w-full min-w-0">
      <ExceptionHistoryHeader
        title={
          isEmployee
            ? "My Exception Details"
            : selectedMember
            ? "Employee Exception History"
            : activeSubTab === "team"
            ? "Team Exception Records"
            : "Exception Details"
        }
        subtitle={
          isEmployee
            ? "Track and review your previous attendance regularization requests."
            : selectedMember
            ? "Review previous attendance regularizations and exception records before approving requests."
            : activeSubTab === "team"
            ? "Monitor team attendance regularizations and review member exception history."
            : "Track your previous attendance regularization requests."
        }
        onBack={selectedMember ? handleBackToTeam : undefined}
      />

      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs flex flex-col gap-4 min-w-0">
        {!selectedMember && !isEmployee && (
          <ExceptionHistorySubTabs
            activeSubTab={activeSubTab}
            onSubTabChange={handleSubTabChange}
          />
        )}

        {selectedMember && !isEmployee ? (
          <EmployeeExceptionHistorySection
            member={selectedMember}
            onBack={handleBackToTeam}
          />
        ) : activeSubTab === "team" && !isEmployee ? (
          <TeamMembersExceptionSection onSelectMember={handleSelectMember} />
        ) : (
          <MyExceptionDetailsSection />
        )}
      </div>
    </div>
  )
}
