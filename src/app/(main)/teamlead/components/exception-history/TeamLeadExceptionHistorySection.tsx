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
  const isAccountantExecutive = pathname?.startsWith("/accountantexecutive")
  const isFinance =
    pathname?.startsWith("/financeexecutive") ||
    pathname?.startsWith("/financemanager") ||
    pathname?.startsWith("/finance") ||
    isAccountantExecutive
  const isEmployeeLike = isEmployee || isFinance
  const basePath = isAccountantExecutive
    ? "/accountantexecutive/attendance"
    : pathname?.startsWith("/financeexecutive")
    ? "/financeexecutive/attendance"
    : pathname?.startsWith("/financemanager")
    ? "/financemanager/attendance"
    : pathname?.startsWith("/finance")
    ? "/financemanager/attendance"
    : pathname?.startsWith("/manager")
    ? "/manager/attendance"
    : isEmployee
    ? "/employee/attendance"
    : "/teamlead/attendance"
  const searchParams = useSearchParams()
  const subParam = searchParams.get("sub") as ExceptionSubTab | null
  const memberIdParam = searchParams.get("memberId")

  const activeSubTab: ExceptionSubTab = isEmployeeLike ? "me" : subParam === "team" ? "team" : "me"

  const selectedMember = useMemo(() => {
    if (isEmployeeLike || !memberIdParam) return null
    return teamMembersExceptions.find((m) => m.id === memberIdParam) || teamMembersExceptions[0]
  }, [memberIdParam, isEmployeeLike])

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
          isEmployeeLike
            ? "My Exception Details"
            : selectedMember
            ? "Employee Exception History"
            : activeSubTab === "team"
            ? "Team Exception Records"
            : "Exception Details"
        }
        subtitle={
          isEmployeeLike
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
        {!selectedMember && !isEmployeeLike && (
          <ExceptionHistorySubTabs
            activeSubTab={activeSubTab}
            onSubTabChange={handleSubTabChange}
          />
        )}

        {selectedMember && !isEmployeeLike ? (
          <EmployeeExceptionHistorySection
            member={selectedMember}
            onBack={handleBackToTeam}
          />
        ) : activeSubTab === "team" && !isEmployeeLike ? (
          <TeamMembersExceptionSection onSelectMember={handleSelectMember} />
        ) : (
          <MyExceptionDetailsSection />
        )}
      </div>
    </div>
  )
}
