"use client"

import React from "react"
import { ArrowLeft, Barbell } from "phosphor-react"
import { HrTeamItem } from "./types"

export interface HrTeamSummaryCardProps {
  team: HrTeamItem
  membersCount: number
  onBack: () => void
}

export default function HrTeamSummaryCard({ team, membersCount, onBack }: HrTeamSummaryCardProps) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100/90 shadow-xs p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 min-w-0">
      <div className="flex items-center gap-3 shrink-0">
        <button
          type="button"
          onClick={onBack}
          className="p-2 rounded-xl text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors cursor-pointer shrink-0"
          title="Back to Team Details"
        >
          <ArrowLeft size={18} weight="bold" />
        </button>
        <div className="w-10 h-10 rounded-2xl bg-[#F0EEFE] flex items-center justify-center text-[#5B50EC] shrink-0">
          <Barbell size={20} weight="bold" />
        </div>
        <div className="min-w-0">
          <span className="text-[10px] font-bold text-gray-400 uppercase">Team Name</span>
          <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-tight truncate">{team.name}</h2>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:items-center gap-3 sm:gap-6 text-xs border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100 min-w-0">
        <div>
          <span className="text-[10px] font-bold text-gray-400 block uppercase">Department / Function</span>
          <span className="font-bold text-gray-800 block mt-0.5">{team.department}</span>
        </div>
        <div>
          <span className="text-[10px] font-bold text-gray-400 block uppercase">Manager</span>
          <span className="font-bold text-gray-800 block mt-0.5">{team.reportingStructure.manager.name}</span>
        </div>
        {team.reportingStructure.assistantManager && (
          <div>
            <span className="text-[10px] font-bold text-gray-400 block uppercase">Assistant Manager</span>
            <span className="font-bold text-gray-800 block mt-0.5">{team.reportingStructure.assistantManager.name}</span>
          </div>
        )}
        {team.reportingStructure.teamLead && (
          <div>
            <span className="text-[10px] font-bold text-gray-400 block uppercase">Team Lead</span>
            <span className="font-bold text-gray-800 block mt-0.5">{team.reportingStructure.teamLead.name}</span>
          </div>
        )}
        <div>
          <span className="text-[10px] font-bold text-gray-400 block uppercase">Members</span>
          <span className="font-bold text-gray-800 block mt-0.5">{membersCount}</span>
        </div>
      </div>
    </div>
  )
}
