"use client"

import React, { useState, useMemo } from "react"
import { DotsThreeVertical } from "phosphor-react"
import ReusableAvatar from "../../ReusableAvatar"
import ReusablePagination from "../../ReusablePagination"
import { HrTeamMember } from "./types"

export interface HrTeamMembersTableProps {
  members: HrTeamMember[]
}

export default function HrTeamMembersTable({ members }: HrTeamMembersTableProps) {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)

  const totalPages = Math.ceil(members.length / pageSize) || 1
  const paginatedMembers = useMemo(() => {
    const start = (page - 1) * pageSize
    return members.slice(start, start + pageSize)
  }, [members, page, pageSize])

  return (
    <div className="bg-white rounded-3xl border border-gray-100/90 shadow-xs p-4 sm:p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm sm:text-base font-bold text-gray-900">Team Members ({members.length})</h3>
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              <th className="py-3 px-3 whitespace-nowrap">#</th>
              <th className="py-3 px-3 whitespace-nowrap">Member</th>
              <th className="py-3 px-3 whitespace-nowrap">Employee ID</th>
              <th className="py-3 px-3 whitespace-nowrap">Designation</th>
              <th className="py-3 px-3 whitespace-nowrap">Role</th>
              <th className="py-3 px-3 whitespace-nowrap">Status</th>
              <th className="py-3 px-3 text-right whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-xs">
            {paginatedMembers.map((m, index) => (
              <tr key={m.id} className="hover:bg-gray-50/80 transition-colors">
                <td className="py-3 px-3 text-gray-400 font-medium whitespace-nowrap">
                  {(page - 1) * pageSize + index + 1}
                </td>
                <td className="py-3 px-3 whitespace-nowrap">
                  <div className="flex items-center gap-2.5">
                    <ReusableAvatar name={m.name} avatar={m.avatar} size="sm" />
                    <span className="font-bold text-gray-900 truncate">{m.name}</span>
                  </div>
                </td>
                <td className="py-3 px-3 text-gray-500 font-mono text-[11px] whitespace-nowrap">{m.employeeId}</td>
                <td className="py-3 px-3 text-gray-700 font-medium whitespace-nowrap">{m.designation}</td>
                <td className="py-3 px-3 whitespace-nowrap">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#EEF2FF] text-[#5B50EC]">
                    {m.teamRole}
                  </span>
                </td>
                <td className="py-3 px-3 whitespace-nowrap">
                  <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold ${m.status === "Active" ? "text-emerald-600" : "text-amber-600"}`}>
                    <span className={`w-2 h-2 rounded-full ${m.status === "Active" ? "bg-emerald-500" : "bg-amber-500"}`} />
                    {m.status}
                  </span>
                </td>
                <td className="py-3 px-3 text-right whitespace-nowrap">
                  <button type="button" className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
                    <DotsThreeVertical size={16} weight="bold" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pt-2 border-t border-gray-100">
        <ReusablePagination
          currentPage={page}
          totalPages={totalPages}
          totalItems={members.length}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={(sz) => { setPageSize(sz); setPage(1) }}
        />
      </div>
    </div>
  )
}
