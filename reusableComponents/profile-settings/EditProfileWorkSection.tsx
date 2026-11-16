"use client"

import { Briefcase, Lock } from "phosphor-react"
import { UserProfileData } from "./types"

interface EditProfileWorkSectionProps {
  profile: UserProfileData
}

export default function EditProfileWorkSection({
  profile,
}: EditProfileWorkSectionProps) {
  const { workHierarchy } = profile

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-3.5 sm:p-4 flex flex-col gap-3 shadow-2xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-800 uppercase tracking-wider">
          <div className="w-6 h-6 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center shrink-0">
            <Briefcase size={14} weight="bold" />
          </div>
          <span>Work Information</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
          <Lock size={11} weight="bold" />
          <span>Locked</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div className="bg-gray-50/70 p-2.5 rounded-xl border border-gray-100">
          <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Department</span>
          <span className="text-xs font-bold text-gray-900 block mt-0.5">{workHierarchy.department}</span>
        </div>

        <div className="bg-gray-50/70 p-2.5 rounded-xl border border-gray-100">
          <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Designation</span>
          <span className="text-xs font-bold text-gray-900 block mt-0.5">{profile.role}</span>
        </div>

        <div className="bg-gray-50/70 p-2.5 rounded-xl border border-gray-100">
          <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Reporting Manager</span>
          <span className="text-xs font-bold text-gray-900 block mt-0.5">{workHierarchy.manager.name}</span>
        </div>

        <div className="bg-gray-50/70 p-2.5 rounded-xl border border-gray-100">
          <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Active Project</span>
          <span className="text-xs font-bold text-gray-900 block mt-0.5">{workHierarchy.activeProject}</span>
        </div>

        <div className="bg-gray-50/70 p-2.5 rounded-xl border border-gray-100">
          <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Employment Type</span>
          <span className="text-xs font-bold text-gray-900 block mt-0.5">{workHierarchy.employmentType}</span>
        </div>

        <div className="bg-gray-50/70 p-2.5 rounded-xl border border-gray-100">
          <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Joining Date</span>
          <span className="text-xs font-bold text-gray-900 block mt-0.5">
            {workHierarchy.joiningDate} <span className="text-gray-400 font-normal">({workHierarchy.tenure})</span>
          </span>
        </div>
      </div>
    </div>
  )
}

