"use client"

import { Briefcase, CalendarCheck } from "phosphor-react"
import { UserProfileData } from "./types"
import ReusableAvatar from "../ReusableAvatar"

interface ProfileWorkAndLeaveSectionsProps {
  profile: UserProfileData
}

export default function ProfileWorkAndLeaveSections({
  profile,
}: ProfileWorkAndLeaveSectionsProps) {
  const { workHierarchy, leaveQuotas } = profile

  return (
    <div className="flex flex-col gap-3.5">
      <div className="bg-white rounded-2xl border border-gray-100 p-3.5 sm:p-4 flex flex-col gap-3 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-800 uppercase tracking-wider">
          <div className="w-6 h-6 rounded-lg bg-[#EEF2FF] text-[#5B50EC] flex items-center justify-center shrink-0">
            <Briefcase size={14} weight="bold" />
          </div>
          <span>Work & Hierarchy</span>
        </div>

        <div className="grid grid-cols-1 min-[340px]:grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-[11px] text-gray-400 block font-medium">Department</span>
            <span className="font-semibold text-gray-800 block mt-0.5">{workHierarchy.department}</span>
          </div>

          <div>
            <span className="text-[11px] text-gray-400 block font-medium">Active Project</span>
            <span className="font-semibold text-gray-800 block mt-0.5">{workHierarchy.activeProject}</span>
          </div>

          <div>
            <span className="text-[11px] text-gray-400 block font-medium">Manager</span>
            <div className="flex items-center gap-1.5 mt-1">
              <ReusableAvatar
                src={workHierarchy.manager.avatar}
                name={workHierarchy.manager.name}
                size={20}
                fallbackType="icon"
                className="w-5 h-5 text-[9px]"
              />
              <span className="font-semibold text-gray-800 text-xs">{workHierarchy.manager.name}</span>
            </div>
          </div>

          <div>
            <span className="text-[11px] text-gray-400 block font-medium">Employment Type</span>
            <span className="font-semibold text-gray-800 block mt-0.5">{workHierarchy.employmentType}</span>
          </div>

          <div className="min-[340px]:col-span-2 pt-1 border-t border-gray-50">
            <span className="text-[11px] text-gray-400 block font-medium">Joining Date</span>
            <span className="font-semibold text-gray-800 block mt-0.5">
              {workHierarchy.joiningDate} <span className="text-gray-400 font-normal">({workHierarchy.tenure})</span>
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-3.5 sm:p-4 flex flex-col gap-3 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-800 uppercase tracking-wider">
          <div className="w-6 h-6 rounded-lg bg-[#FAF5FF] text-[#7E22CE] flex items-center justify-center shrink-0">
            <CalendarCheck size={14} weight="bold" />
          </div>
          <span>Leave Quotas</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="bg-gray-50/80 rounded-xl p-2.5 text-center flex flex-col justify-center border border-gray-100/80">
            <span className="text-base sm:text-lg font-extrabold text-gray-900 leading-none">
              {String(leaveQuotas.paidLeavesLeft).padStart(2, "0")}
            </span>
            <span className="text-[10px] text-gray-500 font-medium mt-1 leading-tight">
              Paid Leaves Left
            </span>
          </div>

          <div className="bg-gray-50/80 rounded-xl p-2.5 text-center flex flex-col justify-center border border-gray-100/80">
            <span className="text-base sm:text-lg font-extrabold text-gray-900 leading-none">
              {String(leaveQuotas.sickLeavesLeft).padStart(2, "0")}
            </span>
            <span className="text-[10px] text-gray-500 font-medium mt-1 leading-tight">
              Sick / Medical
            </span>
          </div>

          <div className="bg-emerald-50/60 rounded-xl p-2.5 text-center flex flex-col justify-center border border-emerald-100">
            <span className="text-base sm:text-lg font-extrabold text-emerald-600 leading-none">
              {String(leaveQuotas.compOffsAvail).padStart(2, "0")}
            </span>
            <span className="text-[10px] text-emerald-700 font-medium mt-1 leading-tight">
              Comp Offs Avail
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

