"use client"

import React from "react"
import {
  FolderSimple,
  UsersThree,
  User,
  BookmarkSimple,
  House,
  ArrowUp,
  ArrowDown,
} from "phosphor-react"
import { ProjectsOverallStats } from "../../data/projectsAttendanceData"

interface ProjectAttendanceStatsProps {
  stats: ProjectsOverallStats
}

export default function ProjectAttendanceStats({ stats }: ProjectAttendanceStatsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 min-w-0">
      <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-gray-100 shadow-xs flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left gap-2 sm:gap-3.5 min-w-0">
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#EEF2FF] flex items-center justify-center text-[#5B50EC] shrink-0">
          <FolderSimple size={20} weight="fill" />
        </div>
        <div className="flex flex-col items-center sm:items-start min-w-0">
          <span className="text-[11px] text-gray-400 font-medium leading-none">
            Total Projects
          </span>
          <span className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight mt-1">
            {stats.totalProjects}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-gray-100 shadow-xs flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left gap-2 sm:gap-3.5 min-w-0">
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#EEF2FF] flex items-center justify-center text-[#5B50EC] shrink-0">
          <UsersThree size={20} weight="fill" />
        </div>
        <div className="flex flex-col items-center sm:items-start min-w-0">
          <span className="text-[11px] text-gray-400 font-medium leading-none">
            Total Members
          </span>
          <span className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight mt-1">
            {stats.totalMembers}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-gray-100 shadow-xs flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left gap-2 sm:gap-3.5 min-w-0">
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#ECFDF5] flex items-center justify-center text-emerald-600 shrink-0">
          <User size={20} weight="bold" />
        </div>
        <div className="flex flex-col items-center sm:items-start min-w-0">
          <span className="text-[11px] text-gray-400 font-medium leading-none">
            Present Today
          </span>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
              {stats.presentToday}
            </span>
            <span className="inline-flex items-center text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded">
              <ArrowUp size={10} weight="bold" />
              {stats.presentPercentage}%
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-gray-100 shadow-xs flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left gap-2 sm:gap-3.5 min-w-0">
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#FEF2F2] flex items-center justify-center text-rose-500 shrink-0">
          <User size={20} weight="bold" />
        </div>
        <div className="flex flex-col items-center sm:items-start min-w-0">
          <span className="text-[11px] text-gray-400 font-medium leading-none">
            Absent
          </span>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
              {stats.absentToday}
            </span>
            <span className="inline-flex items-center text-[10px] font-bold text-rose-500 bg-rose-50 px-1 py-0.5 rounded">
              <ArrowDown size={10} weight="bold" />
              {stats.absentPercentage}%
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-gray-100 shadow-xs flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left gap-2 sm:gap-3.5 min-w-0">
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#FFFBEB] flex items-center justify-center text-amber-500 shrink-0">
          <BookmarkSimple size={20} weight="fill" />
        </div>
        <div className="flex flex-col items-center sm:items-start min-w-0">
          <span className="text-[11px] text-gray-400 font-medium leading-none">
            On Leave
          </span>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
              {stats.onLeaveToday}
            </span>
            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1 py-0.5 rounded">
              {stats.onLeavePercentage}%
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-gray-100 shadow-xs flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left gap-2 sm:gap-3.5 min-w-0">
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#EFF6FF] flex items-center justify-center text-blue-500 shrink-0">
          <House size={20} weight="fill" />
        </div>
        <div className="flex flex-col items-center sm:items-start min-w-0">
          <span className="text-[11px] text-gray-400 font-medium leading-none">
            Work From Home
          </span>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
              {stats.wfhToday}
            </span>
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1 py-0.5 rounded">
              {stats.wfhPercentage}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

