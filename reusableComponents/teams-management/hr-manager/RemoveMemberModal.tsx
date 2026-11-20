"use client"

import { Trash, X } from "phosphor-react"
import ReusableAvatar from "../../ReusableAvatar"
import { HrTeamMember } from "./types"

interface RemoveMemberModalProps {
  isOpen: boolean
  member: HrTeamMember | null
  teamName: string
  onClose: () => void
  onConfirm: (memberId: string) => void
}

export default function RemoveMemberModal({
  isOpen,
  member,
  teamName,
  onClose,
  onConfirm,
}: RemoveMemberModalProps) {
  if (!isOpen || !member) return null

  return (
    <div className="fixed inset-0 z-[1300] flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xs">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-start justify-between gap-3">
          <div className="w-11 h-11 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0 shadow-xs">
            <Trash size={22} weight="bold" />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
            Remove Member
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Are you sure you want to remove this member from the team?
          </p>
        </div>

        <div className="p-3.5 sm:p-4 rounded-2xl bg-gray-50 border border-gray-200/60 flex items-center gap-3.5">
          <ReusableAvatar
            src={member.avatar}
            name={member.name}
            size={48}
            shape="rounded"
            fallbackType="initials"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-bold text-gray-900 truncate">{member.name}</h4>
            <div className="flex flex-col text-[11px] text-gray-500 mt-0.5 gap-0.5">
              <span>Employee ID: <strong className="text-gray-800">{member.employeeId}</strong></span>
              <span>Designation: <strong className="text-gray-800">{member.designation}</strong></span>
              <span>Current Team: <strong className="text-gray-800">{teamName}</strong></span>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-100 text-[11px] sm:text-xs text-purple-900 font-medium">
          This action will remove the member from the current team only.
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(member.id)}
            className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-bold transition-all shadow-sm shadow-rose-600/30 cursor-pointer active:scale-98"
          >
            <Trash size={16} weight="bold" />
            <span>Remove Member</span>
          </button>
        </div>
      </div>
    </div>
  )
}
