"use client"

import React from "react"
import { UsersThree, CheckCircle, UserPlus } from "phosphor-react"
import { HrTeamItem } from "./types"

export interface HrTeamsStatsCardsProps {
  teams: HrTeamItem[]
}

export default function HrTeamsStatsCards({ teams }: HrTeamsStatsCardsProps) {
  const activeTeamsCount = teams.filter((t) => t.status === "Active").length
  const totalMembersCount = teams.reduce((acc, t) => acc + t.membersCount, 0)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
      <div className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center justify-between shadow-xs">
        <div className="flex flex-col">
          <span className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">Total Teams</span>
          <span className="text-2xl font-bold text-gray-900 mt-1">{teams.length}</span>
        </div>
        <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
          <UsersThree size={22} weight="duotone" />
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center justify-between shadow-xs">
        <div className="flex flex-col">
          <span className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">Active Teams</span>
          <span className="text-2xl font-bold text-gray-900 mt-1">{activeTeamsCount}</span>
        </div>
        <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <CheckCircle size={22} weight="duotone" />
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center justify-between shadow-xs">
        <div className="flex flex-col">
          <span className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">Total Members</span>
          <span className="text-2xl font-bold text-gray-900 mt-1">{totalMembersCount}</span>
        </div>
        <div className="w-11 h-11 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center">
          <UserPlus size={22} weight="duotone" />
        </div>
      </div>
    </div>
  )
}
