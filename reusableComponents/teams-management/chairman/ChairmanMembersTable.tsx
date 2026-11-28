"use client"

import React, { useState } from "react"
import { Eye, ArrowsDownUp } from "phosphor-react"
import ReusableAvatar from "../../ReusableAvatar"
import ReusablePagination from "../../ReusablePagination"
import { ChairmanMemberItem } from "./types"
import MemberDetailModal from "./MemberDetailModal"

interface ChairmanMembersTableProps {
  members: ChairmanMemberItem[]
  currentPage: number
  pageSize: number
  totalItems: number
  onPageChange: (page: number) => void
  showDepartmentColumn?: boolean
  departmentHeaderLabel?: string
  itemLabel?: string
}

export default function ChairmanMembersTable({
  members,
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
  showDepartmentColumn = true,
  departmentHeaderLabel = "Department / Function",
  itemLabel,
}: ChairmanMembersTableProps) {
  const [selectedMember, setSelectedMember] = useState<ChairmanMemberItem | null>(null)

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))

  const getDesignationBadgeClass = (designation: string) => {
    const lower = designation.toLowerCase()
    if (lower.includes("accountant")) {
      return "bg-[#EEF2FF] text-[#5046E5]"
    }
    if (lower.includes("product")) {
      return "bg-[#EEF2FF] text-[#5046E5]"
    }
    if (lower === "hr" || lower.includes("hr manager")) {
      return "bg-[#EEF2FF] text-[#5046E5]"
    }
    if (lower.includes("tech admin") || lower.includes("tech")) {
      return "bg-[#EEF2FF] text-[#5046E5]"
    }
    if (lower.includes("lead")) {
      return "bg-[#EEF2FF] text-[#5046E5]"
    }
    if (lower.includes("manager") && !lower.includes("assistant")) {
      return "bg-[#F3E8FF] text-[#9333EA]"
    }
    if (lower.includes("assistant") || lower.includes("executive")) {
      return "bg-[#E0F2FE] text-[#0284C7]"
    }
    return "bg-indigo-50 text-[#5046E5]"
  }

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-100/80 shadow-2xs overflow-hidden flex flex-col">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[950px]">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/40">
                <th className="py-4 px-5 text-xs font-bold text-gray-500 tracking-wider whitespace-nowrap">
                  <div className="inline-flex items-center gap-1">
                    <span>Name</span>
                    <ArrowsDownUp size={12} className="text-gray-400" />
                  </div>
                </th>
                <th className="py-4 px-5 text-xs font-bold text-gray-500 tracking-wider whitespace-nowrap">
                  Employee ID
                </th>
                <th className="py-4 px-5 text-xs font-bold text-gray-500 tracking-wider whitespace-nowrap">
                  Designation
                </th>
                {showDepartmentColumn && (
                  <th className="py-4 px-5 text-xs font-bold text-gray-500 tracking-wider whitespace-nowrap">
                    {departmentHeaderLabel}
                  </th>
                )}
                <th className="py-4 px-5 text-xs font-bold text-gray-500 tracking-wider whitespace-nowrap">
                  Reporting To
                </th>
                <th className="py-4 px-5 text-xs font-bold text-gray-500 tracking-wider whitespace-nowrap">
                  Status
                </th>
                <th className="py-4 px-5 text-xs font-bold text-gray-500 tracking-wider text-right whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
              {members.length === 0 ? (
                <tr>
                  <td
                    colSpan={showDepartmentColumn ? 7 : 6}
                    className="py-12 text-center text-gray-400 whitespace-nowrap"
                  >
                    No team members found matching the criteria.
                  </td>
                </tr>
              ) : (
                members.map((member) => (
                  <tr
                    key={member.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-3.5 px-5 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <ReusableAvatar
                          src={member.avatar}
                          name={member.name}
                          size={40}
                          fallbackType="initials"
                          shape="circle"
                        />
                        <div className="min-w-0">
                          <div className="font-semibold text-gray-900 text-sm whitespace-nowrap">
                            {member.name}
                          </div>
                          <div className="text-xs text-gray-400 font-normal whitespace-nowrap mt-0.5">
                            {member.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-5 whitespace-nowrap">
                      <span className="inline-block px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-semibold whitespace-nowrap">
                        {member.employeeId}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 whitespace-nowrap">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getDesignationBadgeClass(
                          member.designation
                        )}`}
                      >
                        {member.designation}
                      </span>
                    </td>
                    {showDepartmentColumn && (
                      <td className="py-3.5 px-5 text-xs sm:text-sm text-gray-600 font-medium whitespace-nowrap">
                        {member.department}
                      </td>
                    )}
                    <td className="py-3.5 px-5 text-xs sm:text-sm text-gray-800 font-medium whitespace-nowrap">
                      {member.reportingTo}
                    </td>
                    <td className="py-3.5 px-5 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 whitespace-nowrap">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                        {member.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => setSelectedMember(member)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <Eye size={14} className="shrink-0" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 border-t border-gray-100 bg-white">
          <ReusablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={onPageChange}
            showPageSize={false}
            showJumpToPage={false}
            itemLabel={itemLabel}
          />
        </div>
      </div>

      <MemberDetailModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </>
  )
}
