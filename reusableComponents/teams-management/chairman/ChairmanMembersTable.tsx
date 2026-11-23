"use client"

import React from "react"
import ReusableAvatar from "../../ReusableAvatar"
import ReusablePagination from "../../ReusablePagination"
import { ChairmanMemberItem } from "./types"

interface ChairmanMembersTableProps {
  members: ChairmanMemberItem[]
  currentPage: number
  pageSize: number
  totalItems: number
  onPageChange: (page: number) => void
}

export default function ChairmanMembersTable({
  members,
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
}: ChairmanMembersTableProps) {
  const totalPages = Math.ceil(totalItems / pageSize)

  const getDesignationBadgeClass = (designation: string) => {
    const lower = designation.toLowerCase()
    if (lower === "manager") {
      return "bg-purple-50 text-purple-600"
    }
    if (lower.includes("assistant")) {
      return "bg-sky-50 text-sky-600"
    }
    if (lower.includes("lead")) {
      return "bg-amber-50 text-amber-700"
    }
    return "bg-indigo-50 text-[#5B50EC]"
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-2xs overflow-hidden flex flex-col">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="py-3.5 px-4 text-xs font-bold text-gray-700 tracking-wider uppercase">
                NAME
              </th>
              <th className="py-3.5 px-4 text-xs font-bold text-gray-700 tracking-wider uppercase">
                EMPLOYEE ID
              </th>
              <th className="py-3.5 px-4 text-xs font-bold text-gray-700 tracking-wider uppercase">
                DESIGNATION
              </th>
              <th className="py-3.5 px-4 text-xs font-bold text-gray-700 tracking-wider uppercase">
                DEPARTMENT / FUNCTION
              </th>
              <th className="py-3.5 px-4 text-xs font-bold text-gray-700 tracking-wider uppercase">
                REPORTING TO
              </th>
              <th className="py-3.5 px-4 text-xs font-bold text-gray-700 tracking-wider uppercase">
                STATUS
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
            {members.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-gray-400">
                  No team members found matching the criteria.
                </td>
              </tr>
            ) : (
              members.map((member) => (
                <tr
                  key={member.id}
                  className="hover:bg-gray-50/60 transition-colors"
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <ReusableAvatar
                        src={member.avatar}
                        name={member.name}
                        size={38}
                        fallbackType="initials"
                        shape="circle"
                      />
                      <div className="min-w-0">
                        <div className="font-semibold text-gray-900 text-sm truncate">
                          {member.name}
                        </div>
                        <div className="text-xs text-gray-400 font-normal truncate">
                          {member.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-xs font-semibold text-gray-700">
                    {member.employeeId}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getDesignationBadgeClass(
                        member.designation
                      )}`}
                    >
                      {member.designation}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-gray-700 font-medium">
                    {member.department}
                  </td>
                  <td className="py-3.5 px-4 text-xs text-gray-800 font-medium">
                    {member.reportingTo}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {member.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-3 border-t border-gray-100">
        <ReusablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={onPageChange}
          showPageSize={false}
          showJumpToPage={false}
        />
      </div>
    </div>
  )
}
