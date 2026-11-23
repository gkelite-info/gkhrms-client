"use client"

import React from "react"
import { UsersThree, Eye, PencilSimple, Trash, Users } from "phosphor-react"
import ReusableAvatar from "../../ReusableAvatar"
import { HrTeamItem } from "./types"

export interface HrTeamsTableProps {
  teams: HrTeamItem[]
  page: number
  pageSize: number
  onViewTeam: (team: HrTeamItem) => void
  onEditTeam: (team: HrTeamItem) => void
  onDeleteTeam: (team: HrTeamItem) => void
}

const DEPT_BADGE_STYLES: Record<string, string> = {
  Technology: "bg-indigo-50 text-indigo-600 border-indigo-100",
  Product: "bg-pink-50 text-pink-600 border-pink-100",
  Finance: "bg-blue-50 text-blue-600 border-blue-100",
  "Human Resources": "bg-purple-50 text-purple-600 border-purple-100",
  Operations: "bg-amber-50 text-amber-600 border-amber-100",
}

export default function HrTeamsTable({
  teams,
  page,
  pageSize,
  onViewTeam,
  onEditTeam,
  onDeleteTeam,
}: HrTeamsTableProps) {
  return (
    <div className="w-full overflow-x-auto custom-scrollbar border border-gray-100 rounded-xl">
      <table className="w-full text-left text-xs text-gray-700 min-w-[760px]">
        <thead className="bg-gray-50/70 border-b border-gray-100 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
          <tr>
            <th className="py-2.5 px-3 w-10 whitespace-nowrap">#</th>
            <th className="py-2.5 px-3 whitespace-nowrap">Team Name</th>
            <th className="py-2.5 px-3 whitespace-nowrap">Department / Function</th>
            <th className="py-2.5 px-3 whitespace-nowrap">Manager</th>
            <th className="py-2.5 px-3 whitespace-nowrap">Project</th>
            <th className="py-2.5 px-3 whitespace-nowrap">Members</th>
            <th className="py-2.5 px-3 whitespace-nowrap">Status</th>
            <th className="py-2.5 px-3 whitespace-nowrap">Created On</th>
            <th className="py-2.5 px-3 text-right whitespace-nowrap">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {teams.map((team, idx) => (
            <tr key={team.id} className="hover:bg-gray-50/60 transition-colors">
              <td className="py-3 px-3 text-gray-400 font-medium whitespace-nowrap">
                {(page - 1) * pageSize + idx + 1}
              </td>
              <td className="py-3 px-3 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <UsersThree size={14} weight="duotone" />
                  </div>
                  <span className="font-semibold text-gray-900">{team.name}</span>
                </div>
              </td>
              <td className="py-3 px-3 whitespace-nowrap">
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${DEPT_BADGE_STYLES[team.department] || "bg-gray-50 text-gray-600 border-gray-200"}`}>
                  {team.department}
                </span>
              </td>
              <td className="py-3 px-3 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <ReusableAvatar name={team.managerName} src={team.managerAvatar} size="sm" />
                  <span className="font-medium text-gray-900">{team.managerName}</span>
                </div>
              </td>
              <td className="py-3 px-3 text-gray-600 whitespace-nowrap">{team.project}</td>
              <td className="py-3 px-3 whitespace-nowrap">
                <div className="flex items-center gap-1 text-gray-600">
                  <Users size={13} className="text-gray-400" />
                  <span>{team.membersCount}</span>
                </div>
              </td>
              <td className="py-3 px-3 whitespace-nowrap">
                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium ${team.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-600"}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${team.status === "Active" ? "bg-emerald-500" : "bg-gray-400"}`} />
                  {team.status}
                </span>
              </td>
              <td className="py-3 px-3 text-gray-500 whitespace-nowrap">{team.createdOn}</td>
              <td className="py-3 px-3 text-right whitespace-nowrap">
                <div className="inline-flex items-center gap-1 justify-end">
                  <button
                    type="button"
                    onClick={() => onViewTeam(team)}
                    className="p-1 text-gray-400 hover:text-[#5B50EC] rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                    title="View Team"
                  >
                    <Eye size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onEditTeam(team)}
                    className="p-1 text-gray-400 hover:text-amber-600 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                    title="Edit Team"
                  >
                    <PencilSimple size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteTeam(team)}
                    className="p-1 text-gray-400 hover:text-rose-600 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                    title="Delete Team"
                  >
                    <Trash size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
