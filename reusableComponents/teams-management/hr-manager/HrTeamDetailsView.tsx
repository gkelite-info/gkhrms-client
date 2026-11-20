"use client"

import React from "react"
import { ArrowLeft, ArrowRight, ChartBar, Users, House, CalendarBlank, Barbell } from "phosphor-react"
import ReusableAvatar from "../../ReusableAvatar"
import HrTeamMembersTable from "./HrTeamMembersTable"
import { HrTeamItem, HrTeamMember } from "./types"

interface HrTeamDetailsViewProps {
  team: HrTeamItem
  members: HrTeamMember[]
  onBack: () => void
  onManageMembers: () => void
}

export default function HrTeamDetailsView({
  team,
  members,
  onBack,
  onManageMembers,
}: HrTeamDetailsViewProps) {
  const { reportingStructure, snapshot } = team

  return (
    <div className="w-full flex flex-col gap-4 sm:gap-5 select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-3xl border border-gray-100/90 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="p-2 rounded-xl text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors cursor-pointer shrink-0"
            title="Back to Teams List"
          >
            <ArrowLeft size={18} weight="bold" />
          </button>
          <div className="w-10 h-10 rounded-2xl bg-[#EEF2FF] flex items-center justify-center text-[#5B50EC] shrink-0">
            <Users size={20} weight="bold" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">Team Details</h2>
            <p className="text-xs text-gray-500 mt-0.5">View team information, reporting structure, and assigned members.</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onManageMembers}
          className="px-4.5 py-2.5 rounded-xl bg-[#5B50EC] hover:bg-[#4E44D6] text-white text-xs sm:text-sm font-bold shadow-sm shadow-[#5B50EC]/20 transition-all cursor-pointer active:scale-98 self-start sm:self-auto shrink-0"
        >
          Manage Members
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 min-w-0">
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100/90 shadow-xs p-5 sm:p-6 flex flex-col gap-5 min-w-0">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F0EEFE] flex items-center justify-center text-[#5B50EC] shrink-0">
              <Barbell size={24} weight="bold" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">TEAM NAME</span>
              <h3 className="text-base sm:text-lg font-bold text-gray-900">{team.name}</h3>
              <span className="text-[11px] text-gray-500 font-medium">Team Code: {team.code}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-gray-100 text-xs">
            <div>
              <span className="text-[10px] font-bold text-gray-400 block uppercase">Department / Function</span>
              <span className="font-bold text-gray-900 mt-0.5 block">{team.department}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-gray-400 block uppercase">Project / Initiative</span>
              <span className="font-bold text-gray-900 mt-0.5 block">{team.project}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-gray-400 block uppercase">Status</span>
              <span className="inline-flex items-center gap-1.5 font-bold text-emerald-600 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                {team.status}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-gray-400 block uppercase">Total Members</span>
              <span className="font-bold text-gray-900 mt-0.5 block">{team.membersCount}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Reporting Structure</span>
            <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto custom-scrollbar pb-1">
              <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200/70 flex items-center gap-3 shrink-0 min-w-[170px]">
                <ReusableAvatar name={reportingStructure.manager.name} avatar={reportingStructure.manager.avatar} size="sm" />
                <div>
                  <h4 className="text-xs font-bold text-gray-900 leading-tight">{reportingStructure.manager.name}</h4>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#EEF2FF] text-[#5B50EC] inline-block mt-1">
                    {reportingStructure.manager.role}
                  </span>
                </div>
              </div>

              {reportingStructure.assistantManager && (
                <>
                  <ArrowRight size={16} className="text-gray-400 shrink-0" weight="bold" />
                  <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200/70 flex items-center gap-3 shrink-0 min-w-[170px]">
                    <ReusableAvatar name={reportingStructure.assistantManager.name} avatar={reportingStructure.assistantManager.avatar} size="sm" />
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 leading-tight">{reportingStructure.assistantManager.name}</h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-50 text-purple-700 inline-block mt-1">
                        {reportingStructure.assistantManager.role}
                      </span>
                    </div>
                  </div>
                </>
              )}

              {reportingStructure.teamLead && (
                <>
                  <ArrowRight size={16} className="text-gray-400 shrink-0" weight="bold" />
                  <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200/70 flex items-center gap-3 shrink-0 min-w-[170px]">
                    <ReusableAvatar name={reportingStructure.teamLead.name} avatar={reportingStructure.teamLead.avatar} size="sm" />
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 leading-tight">{reportingStructure.teamLead.name}</h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 inline-block mt-1">
                        {reportingStructure.teamLead.role}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100/90 shadow-xs p-5 sm:p-6 flex flex-col justify-between gap-4 min-w-0">
          <div>
            <div className="flex items-center gap-2 text-gray-900 font-bold text-sm sm:text-base">
              <ChartBar size={18} className="text-[#5B50EC]" weight="bold" />
              <span>Team Snapshot</span>
            </div>
            <div className="flex flex-col gap-3 mt-4">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF9FF] border border-gray-100">
                <div className="flex items-center gap-2.5 text-xs text-gray-600 font-medium">
                  <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] text-[#5B50EC] flex items-center justify-center">
                    <Users size={14} weight="bold" />
                  </div>
                  <span>Active Members</span>
                </div>
                <span className="text-sm font-bold text-gray-900">{snapshot.activeMembers}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-blue-50/40 border border-blue-100/60">
                <div className="flex items-center gap-2.5 text-xs text-gray-600 font-medium">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                    <House size={14} weight="bold" />
                  </div>
                  <span>Work From Home</span>
                </div>
                <span className="text-sm font-bold text-gray-900">{snapshot.wfh}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-50/40 border border-amber-100/60">
                <div className="flex items-center gap-2.5 text-xs text-gray-600 font-medium">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                    <CalendarBlank size={14} weight="bold" />
                  </div>
                  <span>On Leave</span>
                </div>
                <span className="text-sm font-bold text-gray-900">{snapshot.onLeave}</span>
              </div>
            </div>
          </div>
          <span className="text-[11px] text-gray-400 block pt-3 border-t border-gray-100">{snapshot.updatedAt}</span>
        </div>
      </div>

      <HrTeamMembersTable members={members} />
    </div>
  )
}
