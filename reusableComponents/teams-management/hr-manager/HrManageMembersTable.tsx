"use client"

import React from "react"
import { ArrowsLeftRight, PencilSimple, Trash } from "phosphor-react"
import ReusableAvatar from "../../ReusableAvatar"
import ReusablePagination from "../../ReusablePagination"
import { HrTeamMember } from "./types"

export interface HrManageMembersTableProps {
  members: HrTeamMember[]
  currentPage: number
  pageSize: number
  totalPages: number
  totalItems: number
  onPageChange: (page: number) => void
  onSelectMember: (id: string) => void
  onRemoveMember: (member: HrTeamMember) => void
}

export default function HrManageMembersTable({
  members,
  currentPage,
  pageSize,
  totalPages,
  totalItems,
  onPageChange,
  onSelectMember,
  onRemoveMember,
}: HrManageMembersTableProps) {
  return (
    <>
      <div className="overflow-x-auto custom-scrollbar w-full min-w-0">
        <table className="w-full text-left border-collapse min-w-[760px]">
          <thead>
            <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              <th className="py-3 px-3 whitespace-nowrap">#</th>
              <th className="py-3 px-3 whitespace-nowrap">Employee</th>
              <th className="py-3 px-3 whitespace-nowrap">Employee ID</th>
              <th className="py-3 px-3 whitespace-nowrap">Designation</th>
              <th className="py-3 px-3 whitespace-nowrap">Team Role</th>
              <th className="py-3 px-3 whitespace-nowrap">Department</th>
              <th className="py-3 px-3 whitespace-nowrap">Reporting To</th>
              <th className="py-3 px-3 whitespace-nowrap">Status</th>
              <th className="py-3 px-3 text-right whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-xs">
            {members.map((m, idx) => (
              <tr key={m.id} className="hover:bg-gray-50/80 transition-colors">
                <td className="py-3 px-3 text-gray-400 whitespace-nowrap">{(currentPage - 1) * pageSize + idx + 1}</td>
                <td className="py-3 px-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <ReusableAvatar src={m.avatar} name={m.name} size={30} shape="circle" />
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
                <td className="py-3 px-3 text-gray-600 whitespace-nowrap">{m.department}</td>
                <td className="py-3 px-3 text-gray-600 whitespace-nowrap">{m.reportingTo}</td>
                <td className="py-3 px-3 whitespace-nowrap">
                  <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold ${m.status === "Active" ? "text-emerald-600" : "text-amber-600"}`}>
                    <span className={`w-2 h-2 rounded-full ${m.status === "Active" ? "bg-emerald-500" : "bg-amber-500"}`} />
                    {m.status}
                  </span>
                </td>
                <td className="py-3 px-3 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1.5">
                    <button type="button" onClick={() => onSelectMember(m.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-[#5B50EC] hover:bg-gray-100 transition-colors cursor-pointer" title="Reassign">
                      <ArrowsLeftRight size={15} weight="bold" />
                    </button>
                    <button type="button" className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer" title="Edit">
                      <PencilSimple size={15} weight="bold" />
                    </button>
                    <button type="button" onClick={() => onRemoveMember(m)} className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer" title="Remove">
                      <Trash size={15} weight="bold" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pt-2 border-t border-gray-100">
        <ReusablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          totalItems={totalItems}
          pageSize={pageSize}
        />
      </div>
    </>
  )
}
