"use client"

import { Warning, X, Info, Trash } from "phosphor-react"
import { TeamItem } from "./types"

interface DeleteTeamModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  team: TeamItem | null
}

export default function DeleteTeamModal({
  isOpen,
  onClose,
  onConfirm,
  team,
}: DeleteTeamModalProps) {
  if (!isOpen || !team) return null

  return (
    <div className="fixed inset-0 z-[1250] flex items-center justify-center p-3 sm:p-4 select-none">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 p-5 sm:p-6 flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 shadow-2xs">
            <Warning size={24} weight="bold" />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        <div className="flex flex-col gap-1.5">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
            Delete Team
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Are you sure you want to delete the <span className="font-semibold text-gray-800">{team.name}</span>? This action cannot be undone and may affect employees currently assigned to this team.
          </p>
        </div>

        <div className="bg-[#F8F7FF] rounded-2xl p-3.5 border border-purple-100/70 flex items-start gap-2.5">
          <Info size={18} weight="fill" className="text-[#5B50EC] shrink-0 mt-0.5" />
          <p className="text-[11px] text-gray-600 leading-relaxed">
            <span className="font-bold text-gray-800">{team.membersCount} employees</span> are currently assigned to this team. Please reassign them to another team before deleting.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-gray-600 bg-white hover:bg-gray-50 border border-gray-200 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-sm shadow-rose-600/20 transition-all cursor-pointer"
          >
            <Trash size={15} weight="bold" />
            <span>Delete Team</span>
          </button>
        </div>
      </div>
    </div>
  )
}
